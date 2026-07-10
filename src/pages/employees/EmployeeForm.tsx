import { useState } from "react";
import type { ChangeEvent, FormEvent } from "react";
import axios from "axios";
import { z } from "zod";
import type { Employee, EmployeeFormValues } from "./employee.types";

const employeeSchema = z.object({
  name: z.string().min(2, "Name is required"),
  department: z.string().min(2, "Department is required"),
  email: z.string().email("Please enter a valid email"),
});

type EmployeeFormProps = {
  employee: Employee;
  onSuccess: (employee: Employee) => void;
};

function EmployeeForm({ employee, onSuccess }: EmployeeFormProps) {
  const [formData, setFormData] = useState<EmployeeFormValues>({
    name: employee.name,
    department: employee.department,
    email: employee.email,
  });
  const [error, setError] = useState("");

  function handleChange(event: ChangeEvent<HTMLInputElement>) {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value,
    });
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const result = employeeSchema.safeParse(formData);

    if (!result.success) {
      setError(result.error.issues[0].message);
      return;
    }

    setError("");

    const { data } = await axios.put<Employee>(
      `http://localhost:3001/employees/${employee.id}`,
      {
        ...result.data,
        id: employee.id,
      },
    );

    onSuccess(data);
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="card w-full max-w-2xl border border-slate-200 bg-white shadow-sm"
    >
      <div className="card-body gap-4">
        {error && <div className="alert alert-error">{error}</div>}

        <label className="form-control w-full">
          <span className="label-text mb-1">Name</span>
          <input
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="input input-bordered w-full"
          />
        </label>

        <label className="form-control w-full">
          <span className="label-text mb-1">Department</span>
          <input
            name="department"
            value={formData.department}
            onChange={handleChange}
            className="input input-bordered w-full"
          />
        </label>

        <label className="form-control w-full">
          <span className="label-text mb-1">Email</span>
          <input
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="input input-bordered w-full"
          />
        </label>

        <div className="card-actions justify-end">
          <button type="submit" className="btn btn-primary">
            Save changes
          </button>
        </div>
      </div>
    </form>
  );
}

export default EmployeeForm;
