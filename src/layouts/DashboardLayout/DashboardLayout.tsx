import { Outlet } from "@tanstack/react-router";

import Sidebar from "../../components/organisms/Sidebar";
import Navbar from "../../components/organisms/Navbar";

export default function DashboardLayout() {
  return (
    <div className="flex min-h-screen">
      <Sidebar />

      <div className="flex-1 flex flex-col">
        <Navbar />

        <main className="p-6 bg-base-100 flex-1">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
