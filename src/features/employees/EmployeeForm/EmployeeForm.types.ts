import type { Employee } from "../types/employee.types";

export interface EmployeeFormProps {
  onSubmit(employee: Employee): void;
}
