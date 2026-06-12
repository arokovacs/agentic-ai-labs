# Lab 9 · Garde-fous & checklist de mise en prod (~6 min)

**Niveau du spectre :** transverse · **Slide :** 16 · **Construire par le prompt** · **Référence :** `src/lab9-guards/`

> **Part de :** tout ce qui a été construit jusqu'ici. On le durcit — on ne le réécrit pas.

## Contexte à donner à l'agent

Lis `CLAUDE.md`, `src/lab5-tools-mcp/tools.ts`, `src/shared/redact.ts`.

## Prompt

```
Rendons tout ça prêt pour la production, sans tout réécrire. Crée des garde-fous : des limites (récursion, tokens), une fonction qui valide les entrées des outils et refuse ce qui est invalide, et une étape de validation humaine avant toute action irréversible (par exemple créer un ticket important). Montre tout ça dans un petit script : une entrée refusée, une action bloquée puis approuvée, des données perso masquées, et la checklist de mise en production. Propose-moi d'abord ton plan.
```

## Relecture du diff — vérifier que

- [ ] La validation **lève** sur entrée invalide (rejeter, pas convertir) ; elle réutilise le `TicketSchema` du Lab 5 (un seul contrat).
- [ ] `ApprovalGate` est une interface (Strategy) avec des implémentations de démo.
- [ ] Les caps sont des constantes nommées ; la PII est rédigée avant tout trace/log.

## Lancer & observer

```
npm run lab9
```

Une entrée rejetée, une action high bloquée-puis-approuvée, de la PII rédigée, et la checklist d'envoi.

## ✅ Critère de fin de lab

Vous savez démontrer une action irréversible bloquée et un payload rédigé.

## Comparer avec la référence

`src/lab9-guards/guards.ts`, `run.ts`.

---

⬅️ [Lab 8](./lab8-eval.md) · 🏁 Fin du code-along — retour au deck pour les 5 choses à retenir.
