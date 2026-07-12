import { createFileRoute, Outlet } from "@tanstack/react-router";

export const Route = createFileRoute("/_public")({
  beforeLoad: () => {},
  component: PublicLayout,
});

function PublicLayout() {
  return (
    <div className="min-h-full max-w-7xl mx-auto ">
      <Outlet />
    </div>
  );
}
