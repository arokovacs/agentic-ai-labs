# Lab 7 · Superviseur multi-agents (~10 min · STRETCH)

**Niveau du spectre :** multi-agents · **Slide :** 14 · **Construire par le prompt** · **Référence :** `src/lab7-supervisor/`

> **Part de :** le pattern d'agent du Lab 6 — les spécialistes sont eux-mêmes des agents ReAct.

Un superviseur route chaque tour vers un spécialiste, puis reboucle jusqu'à la fin.

## Contexte à donner à l'agent

Lis `CLAUDE.md`, `src/lab6-react-agent/agent.ts`, `src/lab5-tools-mcp/tools.ts`.

## Prompt

```
Allons jusqu'au multi-agents (bonus). Crée un « superviseur » qui, à chaque tour, choisit à qui déléguer : un agent chercheur, un agent qui crée des tickets, ou un rédacteur qui écrit la réponse finale — puis qui se termine quand c'est fini. Chaque spécialiste repasse la main au superviseur. Teste avec une demande qui a besoin à la fois de recherche et d'action. Propose-moi ton plan, puis dis-moi honnêtement si le multi-agents était vraiment nécessaire ici.
```

## Relecture du diff — vérifier que

- [ ] Les spécialistes sont composés (agents ReAct), pas un objet-dieu.
- [ ] Le routage est explicite et termine (FINISH → END) ; `recursionLimit` fixé.

## Lancer & observer

```
npm run lab7
```

Observez le chemin de délégation dans LangSmith (supervisor → researcher → … → writer). Chaque saut = plus d'appels/latence (~14×). N'y allez que quand un agent unique sature.

## ✅ Critère de fin de lab

Vous savez lire le chemin de délégation complet d'une requête.

## Comparer avec la référence

`src/lab7-supervisor/supervisor.ts`, `run.ts`.

---

⬅️ [Lab 6](./lab6-react-agent.md) · ➡️ [Lab 8 · Évaluation](./lab8-eval.md)
