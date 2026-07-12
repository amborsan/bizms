import { createRootRoute, Outlet } from "@tanstack/react-router";
import Sidebar from "../components/organisms/sidebar";

export const Route = createRootRoute({
  component: RootLayout,
});

function RootLayout() {
  return (
    <div className="flex min-h-screen bg-base-200 text-base-content">
      <Sidebar />

      <main className="flex-1 p-6">
        <Outlet />
      </main>
    </div>
  );
}
