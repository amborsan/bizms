// import { createRootRouteWithContext, Outlet } from "@tanstack/react-router";

// import type { RouterContext } from "../app/routes";
// import NotFound from "../pages/NotFound";

// export const Route = createRootRouteWithContext<RouterContext>()({
//   component: () => <Outlet />,
//   notFoundComponent: NotFound,
// });
import { createRootRoute, Link, Outlet } from "@tanstack/react-router";

export const Route = createRootRoute({
  component: RootLayout,
});

function RootLayout() {
  return (
    <div className="min-h-screen bg-slate-100 text-slate-900">
      <header className="border-b bg-white p-4">
        <nav className="mx-auto flex max-w-7xl flex-wrap gap-4">
          <Link to="/">Home</Link>
          <Link to="/tasks">Tasks</Link>
          <Link to="/create-task">Create task</Link>
          <Link to="/dashboard">Dashboard</Link>
          <Link to="/employees">Employees</Link>
          <Link to="/customers">Customers</Link>
          <Link to="/create-customer">Add Customer</Link>
          <Link to="/sales">Sales</Link>
          <Link to="/reports">Reports</Link>
          <Link to="/signup"> Signup</Link>
          <Link to="/signin"> Signin</Link>
        </nav>
      </header>

      <main className="mx-auto max-w-7xl p-4">
        <Outlet />
      </main>
    </div>
  );
}
