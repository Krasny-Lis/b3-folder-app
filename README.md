# B3 Folder App

[![Build and deploy Angular to GitHub Pages](https://github.com/Krasny-Lis/b3-folder-app/actions/workflows/deploy-pages.yml/badge.svg)](https://github.com/Krasny-Lis/b3-folder-app/actions/workflows/deploy-pages.yml)

Interactive file-tree application built with Angular 19. It demonstrates recursive data handling, NgRx state management and user-dependent access rules in a browser-only demo.

**Live demo:** https://krasny-lis.github.io/b3-folder-app/

## What this project demonstrates

- recursive rendering and updates of a nested file structure
- immutable state changes with NgRx actions, reducers and selectors
- user-dependent file visibility and modification rules
- standalone Angular components with `OnPush` change detection
- Angular Material tree, dialogs, buttons, icons and notifications
- typed models and reusable recursive reducer functions
- Karma/Jasmine unit tests and Cypress end-to-end tests
- automated build and deployment to GitHub Pages

## Main features

- expand and collapse folders
- add files to selected folders
- reject duplicate names within a folder
- delete files after confirmation
- download generated text files
- switch between `admin`, `user1` and `user2`
- display files owned by the current user or the administrator
- reset the tree to its initial state

## Access model

This is a frontend demonstration, not a production authentication system.

- `admin` can see and modify every file;
- regular users can see administrator files and their own files;
- regular users can modify only their own files;
- the selected user is stored in `localStorage`;
- file-tree changes remain in memory and disappear after a page reload or reset.

## Technology stack

| Area | Technology |
| --- | --- |
| Application | Angular 19, TypeScript, RxJS |
| State | NgRx Store |
| UI | Angular Material, Angular CDK, SCSS |
| Testing | Karma, Jasmine, Cypress |
| Hosting | GitHub Pages |

## Run locally

Node.js 22 is recommended.

```bash
npm ci
npm start
```

Open http://localhost:4200.

## Quality checks

```bash
npm test -- --watch=false --browsers=ChromeHeadless
npm run build:pages
```

Cypress tests are available through:

```bash
npm run e2e
```

The development server must be running for browser tests.

## Deployment

Every pull request to `master` runs the unit tests and GitHub Pages build. A push to `master` also deploys `dist/b3-folder-app/browser`.

The Pages build uses `/b3-folder-app/` as its base path. If the repository name or hosting path changes, update the `build:pages` script.

## Project status

Complete portfolio demo. The current scope intentionally uses local browser state and simulated users rather than a backend.
