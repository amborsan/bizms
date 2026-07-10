import { createFileRoute } from "@tanstack/react-router";
import CustomerDetailsPage from "../../pages/customers/CustomerDetailsPage";

export const Route = createFileRoute("/_public/customers/$customerId")({
  component: CustomerDetailsPage,
});
