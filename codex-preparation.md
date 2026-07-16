# Codex Preparation: Initial Repository Orientation

## Project type

BizMS is a single-page business-management frontend built with React 19, TypeScript, and Vite. It uses TanStack Router for file-based routing, TanStack Query and Axios for server data, Clerk for authentication, and Tailwind CSS/DaisyUI for styling. A local JSON Server backed by `db.json` serves as the development API.

## Top-level files and folders

- `.git/` — Git repository metadata.
- `src/` — Application source code. Its main areas are `components/`, `context/`, `layouts/`, `pages/`, `routes/`, and `services/`.
- `Public/` — Static assets (`favicon.svg` and `logo.svg`). The capitalized folder name is intentional and configured through Vite's `publicDir` option.
- `dist/` — Generated production-build output.
- `node_modules/` — Installed npm dependencies.
- `package.json` — Project metadata, dependencies, and npm scripts for Vite development, JSON Server, production builds, linting, and previewing.
- `package-lock.json` — Locked npm dependency versions.
- `index.html` — Vite HTML entry point. It provides the `#root` mount element and loads `src/main.tsx`.
- `README.md` — Project summary, technology list, high-level structure, and local-development instructions.
- `vite.config.ts` — Vite/Vitest configuration for React, the React compiler, Tailwind CSS, TanStack Router, the `Public` directory, and jsdom tests.
- `eslint.config.js` — ESLint flat configuration for TypeScript, React hooks, and Vite React Refresh.
- `tsconfig.json`, `tsconfig.app.json`, `tsconfig.node.json` — TypeScript project-reference and browser/Node configuration files.
- `.env.local` — Local environment configuration; the app expects a Clerk publishable key. Its value was not copied into this note.
- `.gitignore` — Git ignore rules.
- `db.json` — Local mock database used by JSON Server on port 3001.
- `CLASS_PRESENTATION.md` — Additional project presentation/documentation.

## Source and entry-point observations

- `src/main.tsx` is the actual application bootstrap. It mounts React in strict mode and composes Clerk, theme, toast, TanStack Query, and TanStack Router providers.
- `src/App.tsx` currently returns an empty fragment and is not the primary routing entry point.
- `src/routes/` contains public and protected file-based routes; `src/routeTree.gen.ts` is the generated route tree.
- `src/pages/` contains business features for tasks, customers, employees, dashboard, reports, authentication, home, about, and not-found views.
- `src/components/` follows an atoms/molecules/organisms organization, with an additional backgrounds area.
- `src/services/api/axios.ts` is the API-client setup, while `src/queryClient.tsx` configures query caching.

## Tests

There is no separate top-level test folder. Tests are colocated with source code and currently include:

- `src/pages/dashboard/Dashboard.test.tsx`
- `src/components/organisms/sidebar/Sidebar.test.tsx`
- `src/components/atoms/button/Button.test.tsx`
- `src/components/atoms/input/Input.test.tsx`

Vitest is configured in `vite.config.ts` with a jsdom environment and `src/setupTests.ts`. Although the test dependencies and configuration are present, `package.json` does not currently define a `test` script.

