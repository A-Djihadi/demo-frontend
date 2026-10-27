# Conventions du projet demo-frontend (lu par Claude Code ET par les agents DeepSeek)

Micro-frontend de démonstration de DevStation. Plan : `docs/superpowers/plans/2026-10-27-devstation.md`
du dépôt `A-Djihadi/devstation` (tâches F1 à F3).

## Stack
- Angular 22 (composants standalone, sans routing), Native Federation 22 en **remote** sur le port 4201
  (`federation.config.mjs`), tests Vitest + jsdom
- Appelle le backend `demo-backend` via `/api` (port 8081 en dev)

## Commandes
- Tests (sandbox hors-ligne) : `ng test --watch=false && ng build`
- Aucune nouvelle dépendance npm possible : le sandbox n'a pas de réseau

## Règles
- Composants standalone, `HttpClient` via `provideHttpClient()`, tests avec `HttpTestingController`
- Textes affichés en français
- Modifications minimales : ne pas reformater du code non concerné
- Un commit = une tâche ; message au format `agent: <titre de la tâche>`
