# Lab 3 · Observabilité avec LangSmith (~7 min)

**Niveau du spectre :** RAG instrumenté · **Slide :** 10 · **Construire par le prompt** · **Référence :** `src/lab3-observability/run.ts`, `src/shared/redact.ts`

> **Part de :** le `RagService` du Lab 2 — il doit rester **inchangé**.

Le « aha » : rendre le RAG observable **sans toucher à la logique métier**. LangSmith trace automatiquement via les variables d'env ; vous ne faites qu'enrichir les runs — et rédiger la PII d'abord.

## Contexte à donner à l'agent

Lis `CLAUDE.md`, `src/lab2-rag/rag.service.ts` (note son argument `config`).

## Prompt

```
Je veux voir ce qui se passe dans mon RAG sans changer sa logique. D'abord, crée un petit utilitaire qui masque les données personnelles (emails, téléphones, IBAN…) dans un texte. Ensuite, écris un script qui réutilise tel quel le RagService du Lab 2, mais en lui passant des informations de contexte (nom du run, tags, métadonnées) pour que tout apparaisse dans LangSmith — en masquant les données perso avant de les envoyer. Surtout, ne modifie pas rag.service.ts. Propose-moi d'abord ton plan.
```

## Relecture du diff — vérifier que

- [ ] `rag.service.ts` est intact (l'instrumentation vit à la frontière).
- [ ] La rédaction PII tourne avant toute attache de metadata.
- [ ] La metadata de trace inclut le contexte métier (userId/session), rédigé.

## Lancer & observer

```
npm run lab3
```

Dans LangSmith (UE) : prompt complet, contexte récupéré, tokens & coût, cascade de latence ; l'email en metadata apparaît `[email]`.

## ✅ Critère de fin de lab

Ouvrir une trace, lire le contexte récupéré + le coût, confirmer la PII rédigée.

## Comparer avec la référence

`src/lab3-observability/run.ts`, `src/shared/redact.ts`.

---

⬅️ [Lab 2](./lab2-rag.md) · ➡️ [Lab 4 · RAG agentique](./lab4-agentic-rag.md)
