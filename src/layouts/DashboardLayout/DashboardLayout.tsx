import { Outlet } from "@tanstack/react-router";

export default function DashboardLayout() {
  return (
    <div className="min-h-full max-w-7xl mx-auto   ">
      <Outlet />
    </div>
  );
}
