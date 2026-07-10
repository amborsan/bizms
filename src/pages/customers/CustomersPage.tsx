import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Outlet, useMatchRoute, useNavigate } from "@tanstack/react-router";
import axios from "axios";
import { useUser } from "@clerk/react";
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
  const { isSignedIn, user } = useUser();

  const childRoute = matchRoute({
    to: "/customers/$customerId",
    fuzzy: true,
  });

  const { data, isError, isLoading } = useQuery({
    queryKey: ["customers"],
    queryFn: async () => {
      const { data } = await axios.get<Customer[]>(
        "http://localhost:3001/customers",
      );
      return data;
    },
  });

  const deleteMutation = useMutation({
    mutationFn: (customerId: string) => {
      return axios.delete(`http://localhost:3001/customers/${customerId}`);
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
  const canManageCustomers =
    isSignedIn && user?.publicMetadata?.role === "admin";

  return (
    <section className="space-y-6 rounded-xl border border-base-300 bg-base-100 p-5 shadow-sm sm:p-6">
      <div className="flex flex-col gap-4 border-b border-base-300 pb-5 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="text-xs font-semibold uppercase tracking-wide text-primary">
            Customers
          </p>
          <h1 className="mt-1 text-3xl font-bold text-base-content">
            Customers
          </h1>
          <p className="mt-2 max-w-2xl text-sm leading-6 text-base-content/70">
            Review customer companies and contact information.
          </p>
        </div>
        <div className="rounded-lg border border-base-300 bg-base-200 px-4 py-3 text-right shadow-sm">
          <p className="text-2xl font-bold text-base-content">
            {customers.length}
          </p>
          <p className="text-xs font-medium uppercase text-base-content/60">
            Total customers
          </p>
        </div>
        {canManageCustomers && (
          <button
            type="button"
            className="btn btn-primary"
            onClick={() => navigate({ to: "/create-customer" })}
          >
            Add customer
          </button>
        )}
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
              ...(canManageCustomers
                ? [
                    {
                      icon: <EditIcon />,
                      label: "Edit customer",
                      onClick: () =>
                        navigate({
                          to: "/customers/$customerId/edit",
                          params: { customerId: customer.id },
                        }),
                      variant: "ghost" as const,
                    },
                    {
                      icon: <TrashIcon />,
                      label: "Delete customer",
                      onClick: () => deleteMutation.mutate(customer.id),
                      variant: "error" as const,
                    },
                  ]
                : []),
            ]}
          />
        ))}
      </ResourceGrid>
    </section>
  );
}

export default CustomersPage;
