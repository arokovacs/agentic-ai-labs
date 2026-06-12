# Lab 5 · Outils & MCP (~15 min)

**Niveau du spectre :** agent outillé · **Slide :** 12 · **Construire par le prompt** · **Référence :** `src/lab5-tools-mcp/`

> **Part de :** le graphe du Lab 4. On ajoute des outils — dont le retriever, désormais exposé comme outil.

Deux temps : un outil maison typé (Zod) et un serveur **MCP** externe.

## Contexte à donner à l'agent

Lis `CLAUDE.md` et `src/lab2-rag/retriever.ts`.

## Prompt

```
Donnons des « outils » à l'agent. Crée un outil « créer un ticket » avec un schéma Zod qui valide les entrées (titre d'au moins 3 caractères, priorité low ou high) et refuse ce qui est invalide ; sa description doit indiquer quand l'utiliser ET quand ne pas l'utiliser. Expose aussi le retriever du Lab 2 comme un outil de recherche. Enfin, branche un serveur MCP « filesystem » en lecture seule sur data/corpus, et s'il ne démarre pas, continue sans planter. Propose-moi d'abord ton plan.
```

## Relecture du diff — vérifier que

- [ ] La **description** de l'outil dit au modèle quand NE PAS l'utiliser.
- [ ] Zod **rejette** les mauvais arguments (ne les convertit pas).
- [ ] Le serveur MCP est en lecture seule et limité à `data/corpus` ; l'échec dégrade proprement.

## Lancer & observer

```
npm run lab5
```

Vous voyez un appel valide, un rejet Zod, et les outils MCP découverts.

## ✅ Critère de fin de lab

Un mauvais appel d'outil est rejeté ; les outils recherche + ticket sont prêts pour un agent.

## Comparer avec la référence

`src/lab5-tools-mcp/tools.ts`, `mcp.ts`, `run.ts`.

---

⬅️ [Lab 4](./lab4-agentic-rag.md) · ➡️ [Lab 6 · Agent ReAct](./lab6-react-agent.md)
