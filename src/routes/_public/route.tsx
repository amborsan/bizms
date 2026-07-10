import { createFileRoute, Outlet, redirect } from "@tanstack/react-router";

export const Route = createFileRoute("/_public")({
  beforeLoad: ({ context }) => {},
  component: PublicLayout,
});

function PublicLayout() {
  return (
    <main className="min-h-screen flex items-center justify-center bg-base-100 p-6">
      <Outlet />
    </main>
  );
}
