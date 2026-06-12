# Guide de prompting — construire les labs avec un agent de code IA

Dans cet atelier, **vous n'écrivez pas le code à la main**. Vous pilotez un agent
de code IA (Claude Code, Cursor, GitHub Copilot, Windsurf… au choix) et vous **construisez par le prompt**. Vous
restez le senior : vous spécifiez le contrat, vous relisez chaque diff, vous
décidez de ce qui part en prod. L'agent tape ; votre jugement est le livrable.

À lire une fois. Chaque lab vous donne ensuite les prompts spécifiques.

---

## La boucle qu'on répète à chaque lab

```
Contexte  →  Plan  →  Validation  →  Génération  →  Relecture du diff  →  Itération
```

1. **Contexte** — pointez l'agent sur ce qui existe (`CLAUDE.md`, `src/shared`, le
   lab précédent). Ne le laissez pas deviner vos conventions.
2. **Plan** — demandez un plan court *avant* le code. Rediriger un plan coûte peu ;
   rediriger 200 lignes coûte cher.
3. **Validation** — corrigez le plan, puis laissez-le écrire.
4. **Génération** — laissez-le produire un changement petit et ciblé.
5. **Relecture du diff** — lisez chaque ligne. Ce code est le vôtre.
6. **Itération** — donnez un retour précis (« extrais X », « ça viole le DIP »,
   « ajoute une guard clause »), pas une insatisfaction vague.

## Anatomie d'un bon prompt

Un bon prompt de code a cinq parties. Gardez les règles permanentes dans
`CLAUDE.md` pour que chaque prompt ne porte que le spécifique de la tâche.

| Partie | Ce qu'elle répond | Exemple |
|--------|-------------------|---------|
| **Rôle / contexte** | Qui es-tu, qu'existe-t-il ? | « Dans ce dépôt, en réutilisant `src/shared/llm.ts`… » |
| **Tâche** | Quoi construire, concrètement | « Crée `RagService` avec `askQuestion(question)` » |
| **Contrat** | L'interface / la forme | « Constructeur `(model, retriever: IRetriever)` » |
| **Contraintes** | Les règles à respecter | « DIP, guard clauses, citer les sources, pas de secret en dur » |
| **Critères d'acceptation** | Comment on saura que c'est fini | « Répond à la question congés avec une citation `[n]` » |

Plus une **instruction de sortie** pour le non-trivial : *« Propose un plan d'abord ;
attends mon feu vert avant d'écrire. »*

## Bonnes pratiques

- **Spécifiez la couture, pas les frappes.** Donnez l'interface et le comportement ;
  laissez l'agent remplir le corps. (« Dépends de `IRetriever` » vaut mieux que « fais une similarité cosinus puis… »)
- **Travaillez par petites étapes.** Un module ou un comportement par prompt. Un petit diff est un diff relisible.
- **Référencez les patterns existants.** « Suis la structure de `rag.service.ts` » garde le code cohérent (DRY).
- **Faites-le s'auto-relire.** Terminez par : *« Puis relis ton propre diff au regard
  de CLAUDE.md et nomme tout code smell introduit. »*
- **Ancrez la réalité.** « Utilise les versions `@langchain/*` installées dans
  package.json ; en cas de doute sur une signature, dis-le plutôt que de deviner. »
  Coupe court aux API inventées.
- **Gardez `CLAUDE.md` à jour.** C'est la mémoire long terme de l'agent ; mettez-le à jour quand les conventions changent.
- **Vérifiez, ne faites pas confiance.** Lancez `npm run typecheck` et `npm run labN`. Build vert, puis on avance.

## Anti-patterns (et le correctif)

- ❌ « Construis-moi une app RAG. » → ✅ Donnez le contrat + les critères d'acceptation + les fichiers à réutiliser.
- ❌ Accepter un gros diff survolé. → ✅ Lisez chaque ligne ; demandez de découper les gros changements.
- ❌ Le laisser inventer un nom de méthode. → ✅ Demandez-lui de vérifier le package et de citer la source.
- ❌ Coller une vraie clé API pour « l'aider ». → ✅ Les clés vivent dans `.env` ; l'agent n'en a jamais besoin.
- ❌ « C'est faux, corrige. » → ✅ « Le grader renvoie une string ; il doit renvoyer `{score:number}` selon le schéma. »

## Un template de prompt réutilisable

```
On est dans le dépôt agentic-ai-labs. Lis d'abord CLAUDE.md et <fichiers pertinents>.

Tâche : <quoi construire>.
Contrat : <interfaces / signatures / formes de données>.
Contraintes : <SOLID/DIP, gestion d'erreurs, UE/Mistral, pas de secrets — souvent « suis CLAUDE.md »>.
Acceptation : <comment on vérifie que ça marche>.

Propose d'abord un plan court et attends ma validation avant d'écrire du code.
Après écriture, relis ton propre diff au regard de CLAUDE.md et signale tout code smell.
```

---

➡️ Démarrer : [Lab 0 · Setup](./lab0-setup.md)
