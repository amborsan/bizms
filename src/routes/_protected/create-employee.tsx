import { createFileRoute } from "@tanstack/react-router";
import CreateEmployeePage from "../../pages/employees/CreateEmployeePage";

export const Route = createFileRoute("/_protected/create-employee")({
  component: CreateEmployeePage,
});
