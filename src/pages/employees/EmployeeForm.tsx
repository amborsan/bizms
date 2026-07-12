import { useForm } from "@tanstack/react-form";
import axios from "axios";
import { useMutation } from "@tanstack/react-query";
import { z } from "zod";
import Button from "../../components/atoms/button/Button";
import FieldComponent from "../../components/atoms/forms/FieldComponent";
import Input from "../../components/atoms/forms/Input";
import type { Employee, EmployeeFormValues } from "./employee.types";
import { useToast } from "../../context/ToastContext";

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
  const { showToast } = useToast();

  const mutation = useMutation({
    mutationFn: async (employeeValues: EmployeeFormValues) => {
      const { data } = await axios.put<Employee>(
        `http://localhost:3001/employees/${employee.id}`,
        {
          ...employeeValues,
          id: employee.id,
        },
      );

      return data;
    },
    onSuccess: (updatedEmployee) => {
      showToast("Employee updated successfully.", { type: "success" });
      onSuccess(updatedEmployee);
    },
    onError: () => {
      showToast("Employee could not be saved.", { type: "error" });
    },
  });

  const form = useForm({
    defaultValues: {
      name: employee.name,
      department: employee.department,
      email: employee.email,
    },
    validators: {
      onChange: employeeSchema,
      onSubmit: employeeSchema,
    },
    onSubmit: ({ value }) => {
      mutation.mutate(employeeSchema.parse(value));
    },
  });

  return (
    <div className="card w-full max-w-2xl border border-base-300 bg-base-100 shadow-sm">
      <form
        className="card-body gap-4"
        onSubmit={(event) => {
          event.preventDefault();
          form.handleSubmit();
        }}
      >
        <div className="grid grid-cols-1 gap-4">
          <FieldComponent form={form} label="Name" name="name">
            {(field) => <Input field={field} />}
          </FieldComponent>

          <FieldComponent form={form} label="Department" name="department">
            {(field) => <Input field={field} />}
          </FieldComponent>

          <FieldComponent form={form} label="Email" name="email">
            {(field) => <Input field={field} type="email" />}
          </FieldComponent>
        </div>

        <div className="card-actions justify-end">
          <Button type="submit" loading={mutation.isPending}>
            Save changes
          </Button>
        </div>
      </form>
    </div>
  );
}

export default EmployeeForm;
