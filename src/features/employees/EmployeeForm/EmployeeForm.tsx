import { useState } from "react";

import type { Employee } from "../types/employee.types";
import type { EmployeeFormProps } from "./EmployeeForm.types";
import Button from "../../../components/atoms/Button/Button";

export default function EmployeeForm({ onSubmit }: EmployeeFormProps) {
  const [employee, setEmployee] = useState<Employee>({
    id: "",
    firstName: "",
    lastName: "",
    email: "",
    position: "",
    salary: 0,
  });

  function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
    const { name, value } = event.target;

    setEmployee((prev) => ({
      ...prev,
      [name]: name === "salary" ? Number(value) : value,
    }));
  }

  function handleSubmit(event: React.FormEvent) {
    event.preventDefault();

    if (!employee.firstName.trim()) return;

    onSubmit({
      ...employee,
      id: crypto.randomUUID(),
    });

    setEmployee({
      id: "",
      firstName: "",
      lastName: "",
      email: "",
      position: "",
      salary: 0,
    });
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-3">
      <input
        className="input input-bordered w-full"
        placeholder="First Name"
        name="firstName"
        value={employee.firstName}
        onChange={handleChange}
      />

      <input
        className="input input-bordered w-full"
        placeholder="Last Name"
        name="lastName"
        value={employee.lastName}
        onChange={handleChange}
      />

      <input
        className="input input-bordered w-full"
        placeholder="Email"
        name="email"
        value={employee.email}
        onChange={handleChange}
      />

      <input
        className="input input-bordered w-full"
        placeholder="Position"
        name="position"
        value={employee.position}
        onChange={handleChange}
      />

      <input
        className="input input-bordered w-full"
        type="number"
        placeholder="Salary"
        name="salary"
        value={employee.salary}
        onChange={handleChange}
      />

      <Button type="submit">Add Employee</Button>
    </form>
  );
}
