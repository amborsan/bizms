# BizMS Classroom Presentation

## Slide 1: Title

**BizMS: Business Management System**

Team members:
- Ali
- Firas
- I-Che

One-line pitch:
BizMS is a web app that helps small teams manage tasks, customers, and employees from one place.

---

## Slide 2: Problem Statement

Many small teams manage operations using scattered tools:
- Spreadsheets for tasks
- Separate notes for customers
- Unstructured employee records

This causes:
- Lost time
- Data inconsistency
- Difficult tracking of daily work

BizMS solves this by centralizing core operational data in one interface.

---

## Slide 3: Project Goals

Our goals were to:
- Build a clear, easy-to-use dashboard
- Support CRUD workflows for key resources
- Implement smooth routing between list/detail/edit pages
- Keep the codebase modular and team-friendly

---

## Slide 4: Main Features

### Tasks
- Task listing with search, filters, sorting, and pagination
- Task details and edit flow
- Admin actions for create/edit/delete

### Customers
- Customer cards and details pages
- Edit and create customer workflows

### Employees
- Employee listing and details
- Edit and create employee workflows

---

## Slide 5: Tech Stack (Brief)

- **React + TypeScript**: UI development with type safety
- **Vite**: Fast development and build process
- **TanStack Router**: File-based routing with nested routes
- **TanStack Query**: Cached API queries and mutation handling
- **Axios**: API requests
- **Clerk**: Authentication and user role context
- **Tailwind CSS + DaisyUI**: Styling and reusable UI patterns
- **JSON Server**: Mock backend for local data

---

## Slide 6: Architecture Overview

High-level flow:
1. User action in UI component
2. Page triggers query/mutation via TanStack Query
3. Axios sends request to JSON Server
4. Cache updates and UI rerenders

Folder organization:
- `src/pages` for feature pages
- `src/routes` for route config
- `src/components` for shared UI
- `src/services/api` for API setup

---

## Slide 7: What We Learned

- How to split work as a team in a React project
- How to structure routes and nested pages cleanly
- How query caching improves data consistency and UX
- How reusable components speed up development

---

## Slide 8: Team Contribution Plan (Presenter Roles)

### Ali
- Introduce problem statement and project goals
- Explain tasks workflow and key UI interactions

### Firas
- Explain routing, page structure, and data flow
- Demo customer and employee sections

### I-Che
- Present tech stack and engineering decisions
- Summarize lessons learned and future improvements

---

## Slide 9: Live Demo Script

1. Open dashboard/home
2. Go to Tasks page
3. Use search/filter/sort controls
4. Open a task details page and return back
5. Open Customers and show detail/edit flow
6. Open Employees and show detail/edit flow
7. Mention role-based actions for admin users

---

## Slide 10: Challenges and Fixes

Example challenge:
- We encountered a routing UI update issue in task detail navigation where URL changed but view did not update until refresh.

How we fixed it:
- Improved route-state-driven rendering in task pages so navigation updates the UI immediately.

Result:
- Smoother UX when opening task details and returning to the list.

---

## Slide 11: Future Improvements

- Replace JSON Server with a real backend and database
- Add stronger validation and error boundaries
- Add automated tests for key workflows
- Add analytics and reporting modules
- Improve accessibility and responsive behavior further

---

## Slide 12: Closing

BizMS demonstrates how a modern React stack can deliver a practical business tool with clear architecture and maintainable code.

Thank you.
Questions?
