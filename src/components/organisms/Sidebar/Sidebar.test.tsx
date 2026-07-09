import { createRootRoute, createRouter, RouterProvider } from "@tanstack/react-router";
import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import Sidebar from "./Sidebar";

describe("Sidebar", () => {
  it("renders navigation links", async () => {
    const rootRoute = createRootRoute({
      component: Sidebar,
    });
    const router = createRouter({
      routeTree: rootRoute,
    });

    render(<RouterProvider router={router} />);

    expect(
      await screen.findByRole("link", { name: /dashboard/i }),
    ).toBeInTheDocument();
    expect(screen.getByRole("link", { name: /employees/i })).toBeInTheDocument();
    expect(screen.getByRole("link", { name: /products/i })).toBeInTheDocument();
    expect(screen.getByRole("link", { name: /sales/i })).toBeInTheDocument();
    expect(screen.getByRole("link", { name: /reports/i })).toBeInTheDocument();
  });
});
