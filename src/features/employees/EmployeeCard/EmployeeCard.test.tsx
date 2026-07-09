import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";

import EmployeeCard from "./EmployeeCard";

describe("EmployeeCard", () => {
  const employee = {
    id: "employee-1",
    firstName: "Ada",
    lastName: "Lovelace",
    email: "ada@example.com",
    position: "Engineer",
    salary: 75000,
  };

  it("renders employee details", () => {
    render(<EmployeeCard employee={employee} onDelete={vi.fn()} />);

    expect(screen.getByText(/ada lovelace/i)).toBeInTheDocument();
    expect(screen.getByText(/ada@example.com/i)).toBeInTheDocument();
    expect(screen.getByText(/engineer/i)).toBeInTheDocument();
    expect(screen.getByText(/75000/i)).toBeInTheDocument();
  });

  it("calls onDelete with the employee id", async () => {
    const user = userEvent.setup();
    const onDelete = vi.fn();

    render(<EmployeeCard employee={employee} onDelete={onDelete} />);

    await user.click(screen.getByRole("button", { name: /delete/i }));

    expect(onDelete).toHaveBeenCalledWith(employee.id);
  });
});
