# Lab 6 · Agent ReAct + mémoire (~12 min)

**Niveau du spectre :** agent complet · **Slide :** 13 · **Construire par le prompt** · **Référence :** `src/lab6-react-agent/`

> **Part de :** les outils du Lab 5 + le modèle. Mêmes briques — on passe à la boucle ReAct et on ajoute la mémoire.

## Contexte à donner à l'agent

Lis `CLAUDE.md`, `src/lab5-tools-mcp/tools.ts`.

## Prompt

```
Assemblons un vrai agent. Avec createReactAgent, crée un agent qui utilise les outils du Lab 5, avec une mémoire par conversation (thread_id) et une limite anti-boucle (recursionLimit). Écris un petit scénario : d'abord une demande en plusieurs étapes (chercher une information puis ouvrir un ticket), puis une question de suivi dans la même conversation pour montrer qu'il s'en souvient. Propose-moi d'abord ton plan.
```

## Relecture du diff — vérifier que

- [ ] `recursionLimit` est fixé à l'appel (garde-fou anti-boucle).
- [ ] Le même `thread_id` est réutilisé entre les tours (mémoire).
- [ ] Le modèle et les outils sont injectés, pas câblés en dur.

## Lancer & observer

```
npm run lab6
```

Dans LangSmith, observez la boucle : recherche → observation → création ticket → réponse. Une question triviale ne doit appeler aucun outil (multiplicateur ~9×).

## ✅ Critère de fin de lab

Une tâche multi-étapes aboutit et la relance répond depuis la mémoire.

## Comparer avec la référence

`src/lab6-react-agent/agent.ts`, `run.ts`.

---

⬅️ [Lab 5](./lab5-tools-mcp.md) · ➡️ [Lab 7 · Superviseur (stretch)](./lab7-supervisor.md)
