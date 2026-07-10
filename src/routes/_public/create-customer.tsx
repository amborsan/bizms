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
    <section className="space-y-6 rounded-xl border border-slate-200 bg-slate-50 p-5 shadow-sm sm:p-6">
      <div className="border-b border-slate-200 pb-5">
        <p className="text-xs font-semibold uppercase tracking-wide text-blue-600">
          New customer
        </p>
        <h1 className="mt-1 text-3xl font-bold text-slate-950">
          Add a new customer
        </h1>
        <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-600">
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
