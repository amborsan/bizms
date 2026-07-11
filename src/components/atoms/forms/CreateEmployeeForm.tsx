import { useForm } from "@tanstack/react-form";
import axios from "axios";
import { useMutation } from "@tanstack/react-query";
import { z } from "zod";
import Button from "../button/Button";
import FieldComponent from "./FieldComponent";
import Input from "./Input";
import type {
  Employee,
  EmployeeFormValues,
} from "../../../pages/employees/employee.types";

const employeeSchema = z.object({
  name: z.string().min(2, "Name is required"),
  department: z.string().min(2, "Department is required"),
  email: z.string().email("Please enter a valid email"),
});

type CreateEmployeeFormProps = {
  onSuccess: (employee: Employee) => void;
};

function CreateEmployeeForm({ onSuccess }: CreateEmployeeFormProps) {
  const mutation = useMutation({
    mutationFn: async (employeeValues: EmployeeFormValues) => {
      const { data } = await axios.post<Employee>(
        "http://localhost:3001/employees",
        employeeValues,
      );

      return data;
    },
    onSuccess: (employee) => {
      onSuccess(employee);
    },
  });

  const form = useForm({
    defaultValues: {
      name: "",
      department: "",
      email: "",
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
            Create employee
          </Button>
        </div>
      </form>
    </div>
  );
}

export default CreateEmployeeForm;
