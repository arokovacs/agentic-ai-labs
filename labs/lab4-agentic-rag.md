# Lab 4 · RAG agentique avec LangGraph (~15 min)

**Niveau du spectre :** RAG agentique · **Slide :** 11 · **Construire par le prompt** · **Référence :** `src/lab4-agentic-rag/`

> **Part de :** le RAG observable du Lab 3. Réutilise le même retriever et le même modèle.

La récupération devient une **décision conditionnelle** : un grader note les chunks ; une arête conditionnelle répond ou reformule et re-récupère — borné.

## Contexte à donner à l'agent

Lis `CLAUDE.md` et `src/lab2-rag/retriever.ts`.

## Prompt

```
Transformons le RAG en un petit agent qui décide tout seul. Construis un graphe (LangGraph) qui : récupère du contexte, fait noter par le modèle si ce contexte est assez bon, puis soit répond, soit reformule la question et réessaie — au maximum 2 fois pour éviter les boucles infinies. Fais répondre le gros modèle, mais fais noter par le petit modèle (moins cher). Mets le seuil et le nombre d'essais dans des constantes nommées. Astuce : ne donne pas à un nœud le même nom qu'un champ de l'état (par ex. nomme le nœud final « generate », pas « answer ») — sinon LangGraph refuse de compiler. Propose-moi d'abord ton plan, puis relis le diff.
```

## Relecture du diff — vérifier que

- [ ] Le seuil et le max-attempts sont des **constantes nommées**, pas des nombres magiques.
- [ ] La boucle de reformulation est bornée (pas de récursion infinie).
- [ ] Le grader utilise le petit modèle (levier de coût) ; la réponse utilise le gros.
- [ ] Aucun nœud ne porte le même nom qu'un champ d'état (ex. nœud `generate`, champ `answer`).

## Lancer & observer

```
npm run lab4
```

Dans LangSmith, comparez une réponse au premier passage vs une re-récupération, et les deux vs le Lab 2 figé (le multiplicateur ~4×).

## ✅ Critère de fin de lab

Vous pointez une trace où une note basse a rebouclé vers `retrieve`.

## Comparer avec la référence

`src/lab4-agentic-rag/graph.ts`, `run.ts`.

---

⬅️ [Lab 3](./lab3-observability.md) · ➡️ [Lab 5 · Outils & MCP](./lab5-tools-mcp.md)
