import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import Input from "./Input";

describe("Input", () => {
  it("renders the label", () => {
    render(<Input label="Username" />);

    expect(screen.getByText(/username/i)).toBeInTheDocument();
  });

  it("renders the input", () => {
    render(<Input placeholder="Enter username" />);

    expect(screen.getByPlaceholderText(/enter username/i)).toBeInTheDocument();
  });

  it("renders an error message", () => {
    render(<Input error="Required field" />);

    expect(screen.getByText(/required field/i)).toBeInTheDocument();
  });
});
