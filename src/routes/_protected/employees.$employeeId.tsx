import { createFileRoute } from "@tanstack/react-router";
import EmployeeDetailsPage from "../../pages/employees/EmployeeDetailsPage";

export const Route = createFileRoute("/_protected/employees/$employeeId")({
  component: EmployeeDetailsPage,
});
