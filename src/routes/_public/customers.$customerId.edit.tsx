import { createFileRoute } from "@tanstack/react-router";
import EditCustomerPage from "../../pages/customers/EditCustomerPage";

export const Route = createFileRoute("/_public/customers/$customerId/edit")({
  component: EditCustomerPage,
});
