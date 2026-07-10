import { Link, useNavigate, useParams } from "@tanstack/react-router";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import CustomerForm from "./CustomerForm";
import type { Customer } from "./customer.types";

function EditCustomerPage() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { customerId } = useParams({
    from: "/_public/customers/$customerId/edit",
  });

  const { data: customer, isError, isLoading } = useQuery({
    queryKey: ["customers", customerId],
    queryFn: async () => {
      const { data } = await axios.get<Customer>(
        `http://localhost:3001/custommers/${customerId}`,
      );
      return data;
    },
  });

  if (isLoading) {
    return <div className="loading loading-spinner loading-lg" />;
  }

  if (isError || !customer) {
    return (
      <div className="space-y-4">
        <Link to="/customers" className="btn btn-outline btn-sm">
          Back to customers
        </Link>
        <div className="alert alert-error">Customer could not be loaded.</div>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <Link to="/customers" className="btn btn-outline btn-sm">
        Back to customers
      </Link>

      <section className="space-y-6 rounded-xl border border-slate-200 bg-slate-50 p-5 shadow-sm sm:p-6">
        <div className="border-b border-slate-200 pb-5">
          <p className="text-xs font-semibold uppercase tracking-wide text-blue-600">
            Edit customer
          </p>
          <h1 className="mt-1 text-3xl font-bold text-slate-950">
            Edit {customer.Title}
          </h1>
        </div>

        <CustomerForm
          customer={customer}
          onSuccess={(updatedCustomer) => {
            queryClient.invalidateQueries({ queryKey: ["customers"] });
            queryClient.setQueryData(
              ["customers", updatedCustomer.id],
              updatedCustomer,
            );
            navigate({
              to: "/customers/$customerId",
              params: { customerId: updatedCustomer.id },
            });
          }}
        />
      </section>
    </div>
  );
}

export default EditCustomerPage;
