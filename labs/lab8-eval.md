# Lab 8 · Évaluation — datasets + LLM-juge (~9 min)

**Niveau du spectre :** transverse · **Slide :** 15 · **Construire par le prompt** · **Référence :** `src/lab8-eval/run.ts`

> **Part de :** le `RagService` du Lab 2 (et les traces capturées depuis le Lab 3).

Transformer « ça a l'air bien » en un **nombre** : rejouer sur un dataset curé, noter avec des LLM-juges, mettre une porte en CI.

## Contexte à donner à l'agent

Lis `CLAUDE.md`, `src/lab2-rag/run.ts`.

## Prompt

```
Mesurons la qualité au lieu de deviner. Crée un petit jeu de questions avec leurs réponses attendues (avec au moins un cas piège hors-sujet où l'assistant doit refuser). Pour chaque cas, fais répondre le RAG du Lab 2, puis fais noter la réponse par un « juge » (le petit modèle) sur deux critères : est-ce correct, et est-ce bien basé sur les sources. Affiche les scores, et fais échouer le programme si la moyenne passe sous un seuil — comme une porte qualité en CI. Propose-moi d'abord ton plan.
```

## Relecture du diff — vérifier que

- [ ] Le juge tourne sur le **petit** modèle ; le dataset inclut un cas adverse.
- [ ] Le seuil de porte est une **constante nommée** et pilote un code de sortie non-zéro.
- [ ] Un refus compte comme correct quand un refus est attendu.

## Lancer & observer

```
npm run lab8
```

Scores par cas, deux moyennes, et une porte pass/fail claire — comme pour bloquer une PR en CI.

## ✅ Critère de fin de lab

Les scores s'affichent et la porte décide pass/fail.

## Comparer avec la référence

`src/lab8-eval/run.ts`.

---

⬅️ [Lab 7](./lab7-supervisor.md) · ➡️ [Lab 9 · Garde-fous](./lab9-guards.md)
