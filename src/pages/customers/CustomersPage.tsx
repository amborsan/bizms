import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Outlet, useMatchRoute, useNavigate } from "@tanstack/react-router";
import axios from "axios";
import {
  EditIcon,
  EyeIcon,
  ResourceCard,
  ResourceGrid,
  TrashIcon,
} from "../../components/molecules/ResourceCard";
import type { Customer } from "./customer.types";

function CustomersPage() {
  const matchRoute = useMatchRoute();
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const childRoute = matchRoute({
    to: "/customers/$customerId",
    fuzzy: true,
  });

  const { data, isError, isLoading } = useQuery({
    queryKey: ["customers"],
    queryFn: async () => {
      const { data } = await axios.get<Customer[]>(
        "http://localhost:3001/custommers",
      );
      return data;
    },
  });

  const deleteMutation = useMutation({
    mutationFn: (customerId: string) => {
      return axios.delete(`http://localhost:3001/custommers/${customerId}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["customers"] });
    },
  });

  if (childRoute) {
    return <Outlet />;
  }

  if (isLoading) {
    return <div className="loading loading-spinner loading-lg" />;
  }

  if (isError) {
    return <div className="alert alert-error">Customers could not load.</div>;
  }

  const customers = data || [];

  return (
    <section className="space-y-6 rounded-xl border border-slate-200 bg-slate-50 p-5 shadow-sm sm:p-6">
      <div className="flex flex-col gap-4 border-b border-slate-200 pb-5 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="text-xs font-semibold uppercase tracking-wide text-blue-600">
            Customers
          </p>
          <h1 className="mt-1 text-3xl font-bold text-slate-950">
            Customers
          </h1>
          <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-600">
            Review customer companies and contact information.
          </p>
        </div>
        <div className="rounded-lg border border-slate-200 bg-white px-4 py-3 text-right shadow-sm">
          <p className="text-2xl font-bold text-slate-950">
            {customers.length}
          </p>
          <p className="text-xs font-medium uppercase text-slate-500">
            Total customers
          </p>
        </div>
      </div>

      <ResourceGrid
        isEmpty={customers.length === 0}
        emptyMessage="No customers found."
      >
        {customers.map((customer) => (
          <ResourceCard
            key={customer.id}
            title={customer.Title}
            description={customer.address}
            badges={[
              {
                label: customer.contatctperson,
                className:
                  "bg-emerald-50 text-emerald-700 ring-1 ring-emerald-200",
              },
            ]}
            fields={[
              { label: "Contact", value: customer.contatctperson },
              { label: "Email", value: customer.email },
              { label: "Phone", value: customer.phonenumber },
            ]}
            actions={[
              {
                icon: <EyeIcon />,
                label: "View customer",
                onClick: () =>
                  navigate({
                    to: "/customers/$customerId",
                    params: { customerId: customer.id },
                  }),
                variant: "primary",
              },
              {
                icon: <EditIcon />,
                label: "Edit customer",
                onClick: () =>
                  navigate({
                    to: "/customers/$customerId/edit",
                    params: { customerId: customer.id },
                  }),
                variant: "ghost",
              },
              {
                icon: <TrashIcon />,
                label: "Delete customer",
                onClick: () => deleteMutation.mutate(customer.id),
                variant: "error",
              },
            ]}
          />
        ))}
      </ResourceGrid>
    </section>
  );
}

export default CustomersPage;
