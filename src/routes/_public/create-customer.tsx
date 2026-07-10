import { createFileRoute } from "@tanstack/react-router";
import { useNavigate } from "@tanstack/react-router";
import { useQueryClient } from "@tanstack/react-query";
import type { Customer } from "../../pages/customers/customer.types";
import CreateCustomerForm from "../../components/atoms/forms/CreateCustomerForm";

export const Route = createFileRoute("/_public/create-customer")({
  component: RouteComponent,
});

function RouteComponent() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  return (
    <section className="space-y-6 rounded-xl border border-base-300 bg-base-100 p-5 shadow-sm sm:p-6">
      <div className="border-b border-base-300 pb-5">
        <p className="text-xs font-semibold uppercase tracking-wide text-primary">
          New customer
        </p>
        <h1 className="mt-1 text-3xl font-bold text-base-content">
          Add a new customer
        </h1>
        <p className="mt-2 max-w-2xl text-sm leading-6 text-base-content/70">
          Capture the company name, contact person, and contact details.
        </p>
      </div>

      <CreateCustomerForm
        onSuccess={(customer: Customer) => {
          queryClient.invalidateQueries({ queryKey: ["customers"] });
          queryClient.setQueryData(["customers", customer.id], customer);
          navigate({
            to: "/customers/$customerId",
            params: { customerId: customer.id },
          });
        }}
      />
    </section>
  );
}
