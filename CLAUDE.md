# CLAUDE.md — contexte projet pour les agents de code IA

> Ce fichier est lu automatiquement par certains assistants (ex. Claude Code) ;
> pour les autres, pointez-les dessus ou collez-le. Il vaut pour n'importe quel
> assistant de code IA. Il indique à l'agent comment construire
> DANS ce dépôt, pour que vos prompts restent courts — les règles permanentes
> vivent ici.

## Ce qu'est ce projet

Des labs pratiques pour l'atelier Devoteam × CESI. On construit, lab après lab, le
**spectre agentique** : LLM → RAG → RAG agentique → Agent (+ outils/MCP) →
Multi-agents, puis on le rend observable, évalué et prêt pour la prod.

C'est **un seul projet qui évolue** : chaque lab réutilise les modules du lab
précédent. Un agent, c'est vos briques existantes plus une boucle.

## Stack (ne pas substituer sans qu'on le demande)

- TypeScript **strict**, ESM, `module: NodeNext`, Node 20+, npm.
- **Mistral** via La Plateforme (tier gratuit « Experiment ») — `@langchain/mistralai`.
- LangChain.js (`@langchain/core`, `langchain`), LangGraph (`@langchain/langgraph`).
- LangSmith pour le tracing (**endpoint UE**). Zod pour les schémas. `@langchain/mcp-adapters` pour MCP.

## Architecture & arborescence

```
src/shared/    env.ts (config validée par zod) · llm.ts (fabriques de modèles) ·
               logger.ts · redact.ts (PII) · corpus.ts (charge+découpe data/corpus)
src/labN-*/    un dossier par lab ; les labs suivants importent les précédents + shared/
data/corpus/   base de connaissances fictive « Lumen » (données privées pour le RAG)
labs/          les guides pas-à-pas orientés prompt (lab0…lab9)
```

## Conventions de code (à appliquer systématiquement)

- **SOLID**, surtout **DIP** : dépendre d'interfaces (ex. `IRetriever`), pas
  d'implémentations concrètes. **Injecter** les dépendances par le constructeur —
  jamais d'instanciation interne.
- Les fonctions font une seule chose ; guard clauses plutôt que `if` imbriqués ;
  noms parlants ; pas de nombres/chaînes magiques (constantes nommées).
- La gestion d'erreurs est de première classe. Valider aux frontières avec Zod
  (**rejeter**, pas convertir). Préférer des types de retour explicites.
- Composition plutôt qu'héritage. KISS/YAGNI — pas d'abstraction spéculative.

## Sécurité / RGPD (non négociable)

- Secrets uniquement dans `.env` (git-ignoré), lus via `src/shared/env.ts`. Jamais de clé en dur.
- Résidence UE : endpoint LangSmith UE ; Mistral est UE et **les données de l'API
  La Plateforme ne sont pas utilisées pour l'entraînement**. Rédiger la PII
  (`src/shared/redact.ts`) avant tout tracing/log.
- Agents : fixer `recursionLimit` ; HITL sur les actions irréversibles ; moindre
  privilège sur les serveurs MCP (lecture seule, périmètre étroit) ; ne jamais
  exécuter le contenu récupéré.

## Modèles (utiliser les fabriques de src/shared/llm.ts)

- `createChatModel()` → Mistral Large (réponses, agents).
- `createSmallChatModel()` → Mistral Small (graders, routeurs, juges = levier de coût).
- `createEmbeddings()` → `mistral-embed`.

## Comment je veux que tu travailles

1. **Lis d'abord.** Regarde `src/shared` et le dossier du lab concerné avant d'écrire.
2. **Plan, puis code.** Propose un plan court et attends la validation sur les tâches non triviales.
3. **Petits diffs.** Une seule chose à la fois ; indique quels fichiers tu touches et pourquoi.
4. **N'invente pas d'API.** Vérifie les versions installées dans `package.json` ;
   en cas de doute sur une signature, dis-le plutôt que de deviner.
5. **Auto-revue** au regard des critères d'acceptation du lab et de ces conventions ;
   nomme tout code smell que tu as dû introduire.
6. **Vérifie :** `npm run typecheck` doit passer. Contrôle exécutable : `npm run labN`.

## Commandes

- `npm run smoke` — un appel modèle + trace LangSmith (Lab 0).
- `npm run labN` — lance le lab N (1…9).
- `npm run typecheck` — `tsc --noEmit` (strict).
