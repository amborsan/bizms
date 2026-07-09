import { AnimatePresence } from "framer-motion";

import EmployeeCard from "../EmployeeCard";
import type { EmployeeListProps } from "./EmployeeList.types";

export default function EmployeeList({
  employees,
  onDelete,
}: EmployeeListProps) {
  if (employees.length === 0) {
    return <div className="alert alert-info">No employees found.</div>;
  }

  return (
    <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
      <AnimatePresence>
        {employees.map((employee) => (
          <EmployeeCard
            key={employee.id}
            employee={employee}
            onDelete={onDelete}
          />
        ))}
      </AnimatePresence>
    </div>
  );
}
