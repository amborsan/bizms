import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import Dashboard from "./Dashboard";

describe("Dashboard", () => {
  it("renders the dashboard heading", () => {
    render(<Dashboard />);

    expect(
      screen.getByRole("heading", {
        name: /dashboard/i,
      }),
    ).toBeInTheDocument();
  });
});
