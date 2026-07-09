import type { Employee } from "../types/employee.types";

export interface EmployeeListProps {
  employees: Employee[];
  onDelete(id: string): void;
}
