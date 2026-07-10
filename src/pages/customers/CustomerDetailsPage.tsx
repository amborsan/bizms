import { Link, Outlet, useMatchRoute, useParams } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import {
  EditIcon,
  ResourceCard,
} from "../../components/molecules/ResourceCard";
import type { Customer } from "./customer.types";

function CustomerDetailsPage() {
  const matchRoute = useMatchRoute();
  const { customerId } = useParams({ from: "/_public/customers/$customerId" });

  const editRoute = matchRoute({
    to: "/customers/$customerId/edit",
    fuzzy: true,
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

  if (editRoute) {
    return <Outlet />;
  }

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
        <div className="flex flex-col gap-4 border-b border-slate-200 pb-5 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-xs font-semibold uppercase tracking-wide text-blue-600">
              Customer details
            </p>
            <h1 className="mt-1 text-3xl font-bold text-slate-950">
              {customer.Title}
            </h1>
            <p className="mt-2 text-sm leading-6 text-slate-600">
              View customer address and contact information.
            </p>
          </div>

          <Link
            to="/customers/$customerId/edit"
            params={{ customerId }}
            className="btn btn-primary btn-sm"
          >
            <EditIcon />
            Edit
          </Link>
        </div>

        <ResourceCard
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
            { label: "Customer ID", value: customer.id },
          ]}
        />
      </section>
    </div>
  );
}

export default CustomerDetailsPage;
