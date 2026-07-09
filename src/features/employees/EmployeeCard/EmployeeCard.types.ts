import type { Employee } from "../types/employee.types";

export interface EmployeeCardProps {
  employee: Employee;
  onDelete(id: string): void;
}
