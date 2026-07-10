import {
  createRootRoute,
  createRouter,
  RouterProvider,
} from "@tanstack/react-router";
import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import Sidebar from "./Sidebar";

let isSignedIn = false;
let user: { publicMetadata?: { role?: string } } | null = null;

vi.mock("@clerk/react", () => ({
  SignInButton: ({ children }: { children: React.ReactNode }) => (
    <>{children}</>
  ),
  UserButton: () => <div>UserButton</div>,
  useAuth: () => ({ isSignedIn }),
  useUser: () => ({ user }),
}));

vi.mock("../../../context/ThemeContext", () => ({
  useTheme: () => ({ theme: "light", toggleTheme: () => {} }),
}));

describe("Sidebar", () => {
  it("renders guest navigation links", async () => {
    isSignedIn = false;
    user = null;

    const rootRoute = createRootRoute({
      component: Sidebar,
    });
    const router = createRouter({
      routeTree: rootRoute,
    });

    render(<RouterProvider router={router} />);

    expect(
      screen.queryByRole("link", { name: /dashboard/i }),
    ).not.toBeInTheDocument();
    expect(screen.getByRole("link", { name: /tasks/i })).toBeInTheDocument();
    expect(
      screen.getByRole("link", { name: /employees/i }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("link", { name: /customers/i }),
    ).toBeInTheDocument();
    expect(screen.getByRole("link", { name: /sign up/i })).toBeInTheDocument();
    expect(screen.getByRole("link", { name: /sign in/i })).toBeInTheDocument();
  });

  it("renders dashboard for signed in admins", () => {
    isSignedIn = true;
    user = { publicMetadata: { role: "admin" } };

    const rootRoute = createRootRoute({
      component: Sidebar,
    });
    const router = createRouter({
      routeTree: rootRoute,
    });

    render(<RouterProvider router={router} />);

    expect(
      screen.getByRole("link", { name: /dashboard/i }),
    ).toBeInTheDocument();
    expect(
      screen.queryByRole("link", { name: /sign in/i }),
    ).not.toBeInTheDocument();
    expect(
      screen.queryByRole("link", { name: /sign up/i }),
    ).not.toBeInTheDocument();
  });
});
