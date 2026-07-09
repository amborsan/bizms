import { motion } from "framer-motion";

import type { EmployeeCardProps } from "./EmployeeCard.types";

export default function EmployeeCard({
  employee,
  onDelete,
}: EmployeeCardProps) {
  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0 }}
      className="card bg-base-200 shadow-lg"
    >
      <div className="card-body">
        <h2 className="card-title">
          {employee.firstName} {employee.lastName}
        </h2>

        <p>Email: {employee.email}</p>

        <p>Position: {employee.position}</p>

        <p>Salary: €{employee.salary}</p>

        <div className="card-actions justify-end">
          <button
            className="btn btn-error btn-sm"
            onClick={() => onDelete(employee.id)}
          >
            Delete
          </button>
        </div>
      </div>
    </motion.div>
  );
}
