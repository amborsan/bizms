# BizMS

BizMS is a small business management web application built with React and TypeScript. It helps users manage key business resources from one dashboard, including tasks, customers, and employees.

## Project Summary

The app focuses on clean navigation and practical workflows for day-to-day operations:

- View and manage tasks with filters, sorting, and pagination
- Track customers and customer details
- Manage employee records
- Navigate between list views and detail views with a file-based routing setup
- Protect selected pages with role-based access checks

## Technologies Used

- React 19: Component-based user interface
- TypeScript: Static typing and safer refactoring
- Vite: Fast development server and build tool
- TanStack Router: File-based routing and nested route handling
- TanStack Query: Data fetching, caching, and invalidation
- Axios: HTTP client for API calls
- Clerk: Authentication and user context
- Tailwind CSS + DaisyUI: Utility-first styling and UI primitives
- JSON Server: Local mock backend via db.json
- ESLint + Prettier: Code quality and formatting

## Project Structure (High Level)

- src/pages: Feature pages (tasks, customers, employees, auth, dashboard)
- src/routes: Route definitions and nested route hierarchy
- src/components: Shared UI components (atoms, molecules, organisms)
- src/context: Shared contexts (theme, toast)
- src/features: Domain-specific state logic
- src/services/api: API layer and Axios setup

## Local Development

1. Install dependencies:

```bash
npm install
```

2. Start mock API server (port 3001):

```bash
npm run server
```

3. Start the frontend app:

```bash
npm run dev
```

4. Open the app in your browser at the local Vite URL shown in terminal.

## Available Scripts

- npm run dev: Run Vite development server
- npm run server: Run JSON Server with db.json
- npm run build: Type-check and build for production
- npm run lint: Run ESLint checks
- npm run preview: Preview production build

## Notes

- The app currently uses a local mock backend for development.
- Data is stored in db.json during local runs.
