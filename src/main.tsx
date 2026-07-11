import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { queryClient } from "./queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
// import { Provider } from "react-redux";
import { ClerkProvider } from "@clerk/react";
import { createRouter, RouterProvider } from "@tanstack/react-router";
import { routeTree } from "./routeTree.gen";
import { ThemeProvider } from "./context/ThemeContext";
import { ToastProvider } from "./context/ToastContext";

// import { store } from "./app/store";
import "./index.css";

// Import your Publishable Key
const PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY;

if (!PUBLISHABLE_KEY) {
  throw new Error("Add your Clerk Publishable Key to the .env file");
}

//Router type
declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router;
  }
}
const router = createRouter({
  routeTree,
  context: {
    auth: undefined!,
  },
});

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ClerkProvider publishableKey={PUBLISHABLE_KEY} afterSignOutUrl="/">
      <ThemeProvider>
        <ToastProvider defaultDuration={3000}>
          <QueryClientProvider client={queryClient}>
            <RouterProvider router={router} />
          </QueryClientProvider>
        </ToastProvider>
      </ThemeProvider>
    </ClerkProvider>
  </StrictMode>,
);
