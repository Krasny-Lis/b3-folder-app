# TestFolderStructureApp

This project was generated using [Angular CLI](https://github.com/angular/angular-cli) version 19.2.15.

## GitHub Pages deployment

The app runs entirely in the browser. GitHub Pages publishes the compiled app,
not the Angular source files. No Node.js server is required in production.

### One-time setup

1. Open **Settings → Pages → Build and deployment** in this repository.
2. Set **Source** to **GitHub Actions**. Do not configure Jekyll or select a
   source branch/folder; this repository includes its own deployment workflow.
3. Merge the deployment changes into `master`.
4. In **Actions → Build and deploy Angular to GitHub Pages**, wait for `build`
   and `deploy` to succeed.
5. Open <https://krasny-lis.github.io/b3-folder-app/>.

Every push to `master` runs the unit tests, builds the app and publishes it.
Pull requests to `master` run the tests and build without publishing.
To publish manually, open the workflow in **Actions**, choose **Run workflow**,
select `master`, then confirm. If Pages was enabled after a failed deployment,
rerun the failed jobs. No personal access token is needed.

### Local verification

Use Node.js 22 (the version used by CI):

```bash
npm ci
npm test -- --watch=false --browsers=ChromeHeadless
npm run build:pages
```

Unit tests require an installed Chrome/Chromium browser. Cypress end-to-end tests
are separate and are not run by the Pages workflow.

`build:pages` uses the production build with `baseHref: /b3-folder-app/`. The
workflow uploads **only** `dist/b3-folder-app/browser`, which contains the built
`index.html`, JavaScript, CSS and favicon. `npm start` and `npm run build` are
unchanged; no router changes are necessary because the current route list is empty.

After deployment, verify that the tree loads, folders expand, user selection
works, and the page still loads after a refresh. This is a frontend demo: selecting
an application user is not server-side authentication, and file-tree changes are
held in memory rather than saved to a backend.

If the repository name or hosting path changes, update `--base-href` in the
`build:pages` script. For a custom domain serving the app at the root, use `/`.

## Development server

To start a local development server, run:

```bash
ng serve
```

Once the server is running, open your browser and navigate to `http://localhost:4200/`. The application will automatically reload whenever you modify any of the source files.

## Code scaffolding

Angular CLI includes powerful code scaffolding tools. To generate a new component, run:

```bash
ng generate component component-name
```

For a complete list of available schematics (such as `components`, `directives`, or `pipes`), run:

```bash
ng generate --help
```

## Building

To build the project run:

```bash
ng build
```

This will compile your project and store the build artifacts in the `dist/` directory. By default, the production build optimizes your application for performance and speed.

## Running unit tests

To execute unit tests with the [Karma](https://karma-runner.github.io) test runner, use the following command:

```bash
ng test
```

## Running end-to-end tests

For end-to-end (e2e) testing, run:

```bash
ng e2e
```

Angular CLI does not come with an end-to-end testing framework by default. You can choose one that suits your needs.

## Additional Resources

For more information on using the Angular CLI, including detailed command references, visit the [Angular CLI Overview and Command Reference](https://angular.dev/tools/cli) page.
