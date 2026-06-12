# Lab 0 · Setup & environnement (~8 min)

**Niveau du spectre :** — · **Slide :** 7 · **Construire par le prompt** · **Référence :** `src/shared/`

> Nouveau ici ? Lisez d'abord [PROMPTING-GUIDE.md](./PROMPTING-GUIDE.md) — il explique la boucle que vous répéterez à chaque lab.

## Ce que vous allez construire

Un projet TypeScript strict avec une couche de config validée et des fabriques de modèles, plus **un appel modèle qui apparaît dans LangSmith**.

## 0. Partir de zéro — installer les outils

Vous n'avez **rien d'installé** (ni Node, ni npm, ni assistant de code) ? Ces installations se font **une seule fois** — comptez ~15 min, et faites-les **avant l'atelier** si possible.

1. **Node.js (version LTS)** — il fournit aussi `npm` (le gestionnaire de paquets).
   - Téléchargez l'installeur sur **https://nodejs.org** (bouton « LTS »), puis installez-le (Suivant → Suivant).
   - Vérifiez dans un terminal : `node -v` (doit afficher v20 ou plus) puis `npm -v`.
2. **Un éditeur de code** — **VS Code** : https://code.visualstudio.com (téléchargez, installez, ouvrez).
3. **Un assistant de code IA — au choix.** Par ex. **Claude Code**, **Cursor**, **GitHub Copilot**, **Windsurf**… N'importe lequel convient, du moment qu'il peut lire le dépôt et écrire des fichiers.
   - Installez celui que vous préférez via sa doc officielle. *Exemple avec Claude Code :* `npm install -g @anthropic-ai/claude-code`, puis lancez-le avec `claude` (n'utilisez **pas** `sudo` ; un compte chez le fournisseur est requis).
   - Quel que soit l'outil, pointez-le sur `CLAUDE.md` pour qu'il connaisse nos règles.

> Terminal : « Terminal » ou « PowerShell » sur Windows, « Terminal » sur Mac/Linux.

## 1. Récupérer le projet & le configurer

1. **Récupérez le projet** : `git clone <url-du-repo>` (ou téléchargez le ZIP et décompressez-le). Ouvrez le dossier dans VS Code, puis ouvrez un terminal **dans ce dossier**.
2. **Installez les dépendances** : `npm install`.
3. **Configurez vos clés** : `cp .env.example .env` (sur Windows : `copy .env.example .env`), puis renseignez :
   - `MISTRAL_API_KEY` — clé gratuite sur **https://console.mistral.ai** (tier « Experiment » : vérif. téléphone, sans CB).
   - `LANGSMITH_*` — `LANGSMITH_TRACING="true"` + endpoint UE.

## Prompt

```
Lis d'abord CLAUDE.md pour comprendre nos règles. Ensuite, prépare la base commune du projet dans src/shared :
- un fichier qui lit et vérifie la config (.env) et affiche une erreur claire s'il manque une clé Mistral ;
- de petites fonctions pour créer le modèle de chat, un petit modèle économique, et le modèle d'embeddings ;
- un mini logger, et un script « smoke » qui fait un seul appel au modèle pour vérifier que tout fonctionne.
Ne mets jamais de clé en dur. Propose-moi d'abord ton plan, puis lance `npm run typecheck`.
```

## Relecture du diff — vérifier que

- [ ] `env.ts` **rejette** les variables manquantes avec une erreur agrégée claire (pas un crash plus tard).
- [ ] Aucune clé API passée en code — uniquement lue depuis l'environnement.
- [ ] Les fabriques renvoient les types d'interface LangChain, pas les classes concrètes.

## Lancer & observer

```
npm run smoke
```

La réponse s'affiche et — comme `LANGSMITH_TRACING=true` — apparaît en trace dans votre projet LangSmith **UE**.

## ✅ Critère de fin de lab

Tout le monde voit une trace dans LangSmith.

## Comparer avec la référence

`src/shared/env.ts`, `llm.ts`, `smoke.ts` — à regarder seulement après votre tentative.

---

➡️ Suite : [Lab 1 · Baseline](./lab1-baseline.md)
