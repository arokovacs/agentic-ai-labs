/**
 * Fabriques de modèles (Abstract Factory, version légère).
 *
 * Pourquoi cette approche :
 *  - Chaque lab a besoin d'un modèle de chat et/ou d'embeddings. Centraliser la
 *    création ici donne un seul endroit pour changer le fournisseur, la température
 *    ou les caps de tokens — le reste du code dépend des *interfaces*
 *    (BaseChatModel / Embeddings), pas de Mistral (Dependency Inversion Principle).
 *  - `createSmallChatModel()` renvoie un modèle moins cher/plus rapide pour les
 *    graders et les juges (Lab 4 / Lab 8). Router un petit modèle pour le
 *    routage/grading et un gros pour la réponse finale est le levier de coût n°1
 *    (cf. slide coûts).
 *
 * Fournisseur : Mistral via La Plateforme. Le tier gratuit « Experiment » couvre
 * tout l'atelier. RGPD : les données de l'API La Plateforme NE sont PAS utilisées
 * pour l'entraînement, et Mistral est une société UE — un défaut solide pour des clients européens.
 */
import { ChatMistralAI, MistralAIEmbeddings } from "@langchain/mistralai";
import type { BaseChatModel } from "@langchain/core/language_models/chat_models";
import type { Embeddings } from "@langchain/core/embeddings";
import { env } from "./env.js";

export interface ChatModelOptions {
  /** 0 = déterministe (défaut pour RAG/agents) ; ne monter que pour des tâches créatives. */
  temperature?: number;
  /** Surcharge le cap de sortie global pour un point d'appel précis. */
  maxTokens?: number;
  /** Surcharge le nom du modèle (défaut MISTRAL_CHAT_MODEL). */
  model?: string;
}

/**
 * Construit un modèle de chat. La clé API est lue depuis MISTRAL_API_KEY par le
 * SDK — jamais passée en code.
 */
export function createChatModel(options: ChatModelOptions = {}): BaseChatModel {
  return new ChatMistralAI({
    model: options.model ?? env.MISTRAL_CHAT_MODEL,
    temperature: options.temperature ?? 0,
    maxTokens: options.maxTokens ?? env.MAX_OUTPUT_TOKENS,
  });
}

/** Un modèle moins cher/plus rapide pour graders, routeurs et juges (levier de coût). */
export function createSmallChatModel(options: ChatModelOptions = {}): BaseChatModel {
  return createChatModel({ ...options, model: options.model ?? env.MISTRAL_SMALL_MODEL });
}

/** Construit le modèle d'embeddings (Mistral `mistral-embed`, 1024 dimensions). */
export function createEmbeddings(): Embeddings {
  return new MistralAIEmbeddings({ model: env.MISTRAL_EMBED_MODEL });
}
