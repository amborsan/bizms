import { createRootRoute, Outlet } from "@tanstack/react-router";
import Sidebar from "../components/organisms/sidebar";
import Footer from "../components/organisms/footer/Footer";

export const Route = createRootRoute({
  component: RootLayout,
});

function RootLayout() {
  return (
    <div className="flex min-h-screen bg-base-200 text-base-content">
      <Sidebar />

      <main className="flex flex-col min-h-fitflex-1 p-6  ">
        <div>
          <Outlet />
        </div>
        <Footer />
      </main>
    </div>
  );
}
