/**
 * Smoke test du Lab 0 : prouver que l'environnement est bien câblé.
 * Lancer avec : `npm run smoke`
 *
 * Critère de réussite : une réponse du modèle s'affiche ET (si LangSmith est
 * configuré) une trace apparaît dans votre projet LangSmith UE.
 */
import { createChatModel } from "./llm.js";
import { env, tracingEnabled } from "./env.js";
import { log } from "./logger.js";

async function main(): Promise<void> {
  log.banner("Lab 0 · Smoke test");
  log.step(`Mistral model: ${env.MISTRAL_CHAT_MODEL}`);
  log.step(
    tracingEnabled
      ? `LangSmith tracing ON -> project "${env.LANGSMITH_PROJECT}" (${env.LANGSMITH_ENDPOINT})`
      : "LangSmith tracing OFF (set LANGSMITH_TRACING=true and LANGSMITH_API_KEY to enable)",
  );

  const model = createChatModel();
  const res = await model.invoke("In one sentence, what is Retrieval-Augmented Generation?");

  log.banner("Model reply");
  console.log(String(res.content));

  if (tracingEnabled) {
    log.info("Open LangSmith — you should see this call as a trace.");
  }
}

main().catch((err) => {
  log.error("Smoke test failed:", err instanceof Error ? err.message : err);
  process.exitCode = 1;
});
