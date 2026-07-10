import { createFileRoute } from "@tanstack/react-router";
import EditEmployeePage from "../../pages/employees/EditEmployeePage";

export const Route = createFileRoute("/_protected/employees/$employeeId/edit")({
  component: EditEmployeePage,
});
