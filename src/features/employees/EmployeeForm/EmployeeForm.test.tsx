import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";

import EmployeeForm from "./EmployeeForm";

describe("EmployeeForm", () => {
  it("submits a new employee", async () => {
    const user = userEvent.setup();
    const onSubmit = vi.fn();

    render(<EmployeeForm onSubmit={onSubmit} />);

    await user.type(screen.getByPlaceholderText(/first name/i), "Ada");
    await user.type(screen.getByPlaceholderText(/last name/i), "Lovelace");
    await user.type(screen.getByPlaceholderText(/email/i), "ada@example.com");
    await user.type(screen.getByPlaceholderText(/position/i), "Engineer");
    await user.clear(screen.getByPlaceholderText(/salary/i));
    await user.type(screen.getByPlaceholderText(/salary/i), "75000");
    await user.click(screen.getByRole("button", { name: /add employee/i }));

    expect(onSubmit).toHaveBeenCalledWith(
      expect.objectContaining({
        firstName: "Ada",
        lastName: "Lovelace",
        email: "ada@example.com",
        position: "Engineer",
        salary: 75000,
      }),
    );
  });
});
