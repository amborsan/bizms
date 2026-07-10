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

  const {
    data: customer,
    isError,
    isLoading,
  } = useQuery({
    queryKey: ["customers", customerId],
    queryFn: async () => {
      const { data } = await axios.get<Customer>(
        `http://localhost:3001/customers/${customerId}`,
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

      <section className="space-y-6 rounded-xl border border-base-300 bg-base-100 p-5 shadow-sm sm:p-6">
        <div className="border-b border-base-300 pb-5">
          <p className="text-xs font-semibold uppercase tracking-wide text-primary">
            Edit customer
          </p>
          <h1 className="mt-1 text-3xl font-bold text-base-content">
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
