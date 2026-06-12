# Lab 2 · RAG de base avec LangChain (~18 min)

**Niveau du spectre :** RAG · **Slide :** 9 · **Construire par le prompt** · **Référence :** `src/lab2-rag/`, `src/shared/corpus.ts`

> **Part de :** le wrapper modèle du Lab 1. Même projet — on construit le pipeline RAG autour.

Le cœur du code-along. Pipeline : **embed → retrieve → stuff → generate**, injecté proprement (DIP) et citant les sources. Vous le construisez avec un seul prompt en 3 étapes, en relisant chaque diff.

## Contexte à donner à l'agent

Lis `CLAUDE.md`, `src/shared/llm.ts` et `data/corpus/`.

## Prompt

```
Aide-moi à construire un RAG simple, en 3 étapes, en relisant le code à chaque étape.
1. Un module qui lit tous les fichiers de data/corpus et les découpe en morceaux d'environ 700 caractères.
2. Un « retriever » qui retrouve les morceaux les plus utiles pour une question — mets-le derrière une interface pour pouvoir changer de base de données plus tard.
3. Un service RagService qui prend une question, récupère le bon contexte et demande au modèle de répondre uniquement à partir de ce contexte, en citant ses sources.
Injecte le modèle et le retriever plutôt que de les créer à l'intérieur. Propose-moi d'abord ton plan.
```

## Relecture du diff — vérifier que

- [ ] `RagService` dépend de `IRetriever` et `BaseChatModel`, tous deux **injectés**.
- [ ] `askQuestion` se lit comme une phrase ; le prompt est un template, pas une soupe de chaînes en ligne.
- [ ] La réponse cite ses sources ; `run.ts` est le seul endroit connaissant les types concrets.

## Lancer & observer

```
npm run lab2
```

La question privée est désormais répondue correctement **avec citation** (`hr-policy.md`).

## ✅ Critère de fin de lab

Réponse correcte, sourcée et citée à la question qui échouait au Lab 1.

## Comparer avec la référence

`src/lab2-rag/retriever.ts`, `rag.service.ts`, `run.ts`, `src/shared/corpus.ts`.

---

⬅️ [Lab 1](./lab1-baseline.md) · ➡️ [Lab 3 · Observabilité](./lab3-observability.md)
