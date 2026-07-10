import { Outlet } from "@tanstack/react-router";

export default function DashboardLayout() {
  return (
    <div className="min-h-full">
      <Outlet />
    </div>
  );
}
