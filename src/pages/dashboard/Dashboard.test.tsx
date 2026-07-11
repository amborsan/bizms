import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import Dashboard from "./Dashboard";

vi.mock("@clerk/react", () => ({
  useUser: () => ({
    user: {
      firstName: "Amina",
      publicMetadata: { role: "admin" },
    },
  }),
}));

vi.mock("axios", () => ({
  default: {
    get: async (url: string) => {
      if (url.includes("tasks")) {
        return {
          data: [
            {
              id: "1",
              title: "Prepare monthly report",
              description: "",
              status: "In progress",
              priority: "High",
              category: "Reports",
              createdat: "2026-07-10",
            },
          ],
        };
      }

      if (url.includes("employees")) {
        return {
          data: [
            {
              id: "1",
              name: "Jane Doe",
              department: "Sales",
              email: "jane@example.com",
            },
          ],
        };
      }

      return {
        data: [
          {
            id: "1",
            Title: "Acme",
            address: "Berlin",
            contatctperson: "Sam",
            email: "sam@acme.com",
            phonenumber: "12345",
          },
        ],
      };
    },
  },
}));

describe("Dashboard", () => {
  it("renders the admin dashboard overview", async () => {
    const queryClient = new QueryClient();

    render(
      <QueryClientProvider client={queryClient}>
        <Dashboard />
      </QueryClientProvider>,
    );

    expect(
      screen.getByRole("heading", {
        name: /welcome back/i,
      }),
    ).toBeInTheDocument();

    expect(await screen.findByText(/tasks/i)).toBeInTheDocument();
    expect(screen.getByText(/employees/i)).toBeInTheDocument();
    expect(screen.getByText(/customers/i)).toBeInTheDocument();
  });
});
