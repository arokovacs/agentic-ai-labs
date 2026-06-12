/**
 * Accès centralisé et validé à l'environnement.
 *
 * Pourquoi cette approche :
 *  - Source unique de vérité pour la configuration (pas de `process.env.X`
 *    éparpillé dans le code — ce serait un smell « Shotgun Surgery »).
 *  - Échouer vite avec un message lisible plutôt qu'un crash runtime cryptique
 *    au fond d'un appel SDK du fournisseur. La frontière est validée une fois, ici.
 *  - Zod *rejette* une entrée invalide plutôt que de la convertir silencieusement
 *    (principe de moindre surprise) : une clé manquante est une erreur au démarrage,
 *    pas un 401 dix fichiers plus loin.
 */
import "dotenv/config";
import { z } from "zod";

const EnvSchema = z.object({
  // LangSmith (observabilité) — optionnel pour que les Labs 1-2 tournent avant le tracing.
  LANGSMITH_TRACING: z.enum(["true", "false"]).default("false"),
  LANGSMITH_ENDPOINT: z.string().url().default("https://eu.api.smith.langchain.com"),
  LANGSMITH_API_KEY: z.string().optional(),
  LANGSMITH_PROJECT: z.string().default("agentic-ai-labs"),

  // Mistral La Plateforme — requis pour chaque lab. Tier gratuit « Experiment » :
  // récupérer une clé sur https://console.mistral.ai (vérif. téléphone, sans CB).
  MISTRAL_API_KEY: z.string().min(1, "MISTRAL_API_KEY is required"),
  // Modèle principal pour réponses/agents. Le petit modèle est un levier de coût pour graders/juges.
  MISTRAL_CHAT_MODEL: z.string().min(1).default("mistral-large-latest"),
  MISTRAL_SMALL_MODEL: z.string().min(1).default("mistral-small-latest"),
  MISTRAL_EMBED_MODEL: z.string().min(1).default("mistral-embed"),

  // Knobs des labs (numériques, convertis depuis des chaînes).
  MAX_OUTPUT_TOKENS: z.coerce.number().int().positive().default(800),
  RECURSION_LIMIT: z.coerce.number().int().positive().default(8),
  RETRIEVER_TOP_K: z.coerce.number().int().positive().default(4),
});

export type Env = z.infer<typeof EnvSchema>;

/**
 * Parse une fois, au chargement du module. Lève une seule erreur agrégée listant
 * chaque variable manquante/invalide, pour corriger le `.env` en une passe.
 */
function loadEnv(): Env {
  const parsed = EnvSchema.safeParse(process.env);
  if (!parsed.success) {
    const issues = parsed.error.issues
      .map((i) => `  - ${i.path.join(".")}: ${i.message}`)
      .join("\n");
    throw new Error(
      `Invalid environment configuration. Copy .env.example to .env and fix:\n${issues}`,
    );
  }
  return parsed.data;
}

export const env: Env = loadEnv();

/** Vrai quand le tracing est actif ET qu'une clé est présente — gate le message du Lab 3. */
export const tracingEnabled: boolean =
  env.LANGSMITH_TRACING === "true" && Boolean(env.LANGSMITH_API_KEY);
