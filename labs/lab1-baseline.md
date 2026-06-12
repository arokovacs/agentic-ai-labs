# Lab 1 · Baseline — LLM seul (~5 min)

**Niveau du spectre :** LLM seul · **Slide :** 8 · **Construire par le prompt** · **Référence :** `src/lab1-baseline.ts`

## Ce que vous allez construire

Un wrapper `ask()` unique et testable autour d'un appel modèle — et une démo qui fait **échouer le modèle sur des données privées**, ce qui motive le RAG.

## Contexte à donner à l'agent

Lis `CLAUDE.md` et `src/shared/llm.ts`.

## Prompt

```
Crée le fichier src/lab1-baseline.ts avec une fonction ask(question) qui envoie une question au modèle et renvoie sa réponse. Ajoute un petit programme qui pose deux questions : une question générale, et une question sur des infos internes de Lumen (par exemple les jours de congés). Le but est de montrer que, sans contexte, le modèle invente ou se trompe sur les données privées. Propose-moi d'abord ton plan, et garde la fonction toute simple (une seule responsabilité).
```

## Relecture du diff — vérifier que

- [ ] `ask` fait exactement une chose et garde l'entrée vide.
- [ ] `main()` est derrière le check « exécution directe » pour que `ask` reste importable.

## Lancer & observer

```
npm run lab1
```

La réponse sur données privées est fausse ou évasive — le modèle n'a pas nos données, pas un manque d'intelligence. C'est l'écart que comble le Lab 2.

## ✅ Critère de fin de lab

Vous savez expliquer *pourquoi* la question privée échoue, et vous voyez l'appel unique dans LangSmith.

## Comparer avec la référence

`src/lab1-baseline.ts`.

---

⬅️ [Lab 0](./lab0-setup.md) · ➡️ [Lab 2 · RAG de base](./lab2-rag.md)
