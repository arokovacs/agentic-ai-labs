# Labs IA Agentique — code-along TypeScript (construire par le prompt)

Code compagnon de l'atelier **Devoteam × CESI**, Partie 2 (le code-along de 2 h).
Vous gravissez le spectre **LLM → RAG → RAG agentique → Agent (+ outils/MCP) →
Multi-agents**, puis vous le rendez observable, évalué et prêt pour la prod.

**Vous n'écrivez pas le code à la main.** Vous construisez chaque brique en
**pilotant un assistant de code IA** (Claude Code, Cursor, Copilot… au choix), en restant le senior
qui spécifie le contrat et relit chaque diff. Ce dépôt est votre **solution de
référence + recueil de prompts**.

**Stack :** TypeScript (strict) · LangChain.js · LangGraph · LangSmith · **Mistral (La Plateforme, tier gratuit)** · MCP · Zod

---

## Méthode de travail (à lire en premier)

1. **[labs/PROMPTING-GUIDE.md](./labs/PROMPTING-GUIDE.md)** — la boucle (Contexte → Plan → Validation → Génération → Relecture → Itération), l'anatomie d'un bon prompt, les bonnes pratiques et un template réutilisable.
2. **[CLAUDE.md](./CLAUDE.md)** — le contexte projet permanent que l'agent lit automatiquement (stack, architecture, conventions, garde-fous). Comme les règles vivent ici, vos prompts par lab restent courts.
3. **[labs/](./labs)** — un recueil par lab : quoi construire, le contexte à donner à l'agent, le ou les **prompts exacts**, une checklist de relecture du diff, et comment vérifier.

Vous restez senior : l'agent tape, **vous relisez chaque diff** (SOLID, code smells, gestion d'erreurs, UE/RGPD). Le but n'est pas d'aller le plus à droite possible du spectre — c'est de choisir le pattern le moins cher qui fait le travail et de le livrer proprement.

## Organisation du dépôt

C'est **un seul projet qui évolue** : chaque lab réutilise les modules du précédent. `src/` est la **solution de référence** — essayez le prompt d'abord, puis comparez.

```
agentic-ai-labs/
├─ CLAUDE.md               # contexte permanent pour l'agent de code IA
├─ data/corpus/            # base de connaissances fictive « Lumen » (données privées pour le RAG)
├─ labs/                   # 📖 recueils de prompts : PROMPTING-GUIDE + lab0…lab9
└─ src/                    # solution de référence (à comparer après avoir prompté)
   ├─ shared/              # env (validé par zod), fabriques llm, logger, redact, corpus
   └─ labN-*/              # un dossier par lab ; les suivants importent les précédents + shared/
```

## Setup (Lab 0)

```bash
# Node 20+. npm (yarn ou pnpm marchent aussi).
npm install
cp .env.example .env        # puis renseignez MISTRAL_API_KEY + LangSmith (endpoint UE)
```

> **Jamais installé Node/npm ?** Le **Lab 0** part de zéro (Node.js, éditeur, assistant de code au choix) — voir [`labs/lab0-setup.md`](./labs/lab0-setup.md).

Clé Mistral gratuite sur **https://console.mistral.ai** — le **tier gratuit « Experiment »** (vérification par téléphone, sans CB) couvre tout l'atelier.

**Deux façons de mener l'atelier :**
- **Le construire (recommandé) :** gardez le squelette (`package.json`, `tsconfig`, `data/`, `.env`, `CLAUDE.md`) et générez le `src/` de chaque lab en suivant les prompts de `labs/`. Comparez avec la référence en cas de blocage.
- **Le lire :** lancez la référence directement pour voir chaque étape fonctionner.

**Pourquoi Mistral (RGPD) :** Mistral est une société UE, et **les données de l'API La Plateforme ne sont pas utilisées pour l'entraînement** (contrairement au Chat gratuit). Avec l'endpoint LangSmith UE, tout le pipeline reste résident UE. Pour de vraies données client, passez sur un tier payant zéro-rétention.

## Lancer / vérifier un lab

| Lab | Commande | Niveau du spectre | Slide | ~min |
|----:|----------|-------------------|------:|-----:|
| 0 | `npm run smoke` | setup | 7 | 8 |
| 1 | `npm run lab1` | LLM seul | 8 | 5 |
| 2 | `npm run lab2` | RAG | 9 | 18 |
| 3 | `npm run lab3` | RAG instrumenté | 10 | 7 |
| 4 | `npm run lab4` | RAG agentique | 11 | 15 |
| 5 | `npm run lab5` | agent outillé | 12 | 15 |
| 6 | `npm run lab6` | agent complet | 13 | 12 |
| 7 | `npm run lab7` | multi-agents *(stretch)* | 14 | 10 |
| 8 | `npm run lab8` | évaluation | 15 | 9 |
| 9 | `npm run lab9` | garde-fous | 16 | 6 |

Les numéros de slide renvoient à **`2-Pratique-Code-along-Devoteam-FR.pptx`**. Total ≈ 2 h avec marge ; le Lab 7 est l'objectif stretch. `npm run typecheck` lance `tsc --noEmit` (strict) — votre contrôle d'acceptation après chaque prompt.
