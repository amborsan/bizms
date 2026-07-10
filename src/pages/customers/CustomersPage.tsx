import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Outlet, useMatchRoute, useNavigate } from "@tanstack/react-router";
import axios from "axios";
import { useUser } from "@clerk/react";
import { useMemo, useState } from "react";
import {
  EditIcon,
  EyeIcon,
  ListPagination,
  ResourceCard,
  ResourceGrid,
  TrashIcon,
} from "../../components/molecules/ResourceCard";
import type { Customer } from "./customer.types";
import { useToast } from "../../context/ToastContext";

const CUSTOMER_PAGE_SIZE_OPTIONS = [6, 12, 24] as const;
const CUSTOMER_SORT_OPTIONS = [
  { label: "Title A-Z", value: "title-asc" },
  { label: "Title Z-A", value: "title-desc" },
  { label: "Contact A-Z", value: "contact-asc" },
  { label: "Contact Z-A", value: "contact-desc" },
  { label: "Email A-Z", value: "email-asc" },
  { label: "Email Z-A", value: "email-desc" },
] as const;

type CustomerSortValue = (typeof CUSTOMER_SORT_OPTIONS)[number]["value"];

function CustomersPage() {
  const matchRoute = useMatchRoute();
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { isSignedIn, user } = useUser();
  const { showToast } = useToast();
  const [search, setSearch] = useState("");
  const [sortBy, setSortBy] = useState<CustomerSortValue>("title-asc");
  const [pageSize, setPageSize] =
    useState<(typeof CUSTOMER_PAGE_SIZE_OPTIONS)[number]>(6);
  const [currentPage, setCurrentPage] = useState(1);

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
      showToast("Customer deleted successfully.", { type: "success" });
    },
    onError: () => {
      showToast("Customer could not be deleted.", { type: "error" });
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

  const customers = useMemo(() => (data ?? []) as Customer[], [data]);
  const canManageCustomers =
    isSignedIn && user?.publicMetadata?.role === "admin";

  const filteredCustomers = useMemo(() => {
    const normalizedSearch = search.trim().toLowerCase();

    const filtered = customers.filter((customer) => {
      const matchesSearch =
        normalizedSearch.length === 0 ||
        customer.Title.toLowerCase().includes(normalizedSearch) ||
        customer.contatctperson.toLowerCase().includes(normalizedSearch) ||
        customer.email.toLowerCase().includes(normalizedSearch);

      return matchesSearch;
    });

    return filtered.sort((left, right) => {
      if (sortBy === "title-asc") return left.Title.localeCompare(right.Title);
      if (sortBy === "title-desc") return right.Title.localeCompare(left.Title);
      if (sortBy === "contact-asc")
        return left.contatctperson.localeCompare(right.contatctperson);
      if (sortBy === "contact-desc")
        return right.contatctperson.localeCompare(left.contatctperson);
      if (sortBy === "email-asc") return left.email.localeCompare(right.email);

      return right.email.localeCompare(left.email);
    });
  }, [customers, search, sortBy]);

  const totalPages = Math.max(
    1,
    Math.ceil(filteredCustomers.length / pageSize),
  );
  const safePage = Math.min(currentPage, totalPages);
  const pagedCustomers = filteredCustomers.slice(
    (safePage - 1) * pageSize,
    safePage * pageSize,
  );

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
            {filteredCustomers.length}
          </p>
          <p className="text-xs font-medium uppercase text-base-content/60">
            Filtered customers
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

      <div className="grid gap-4 rounded-2xl border border-base-300 bg-base-200 p-4 lg:grid-cols-4">
        <label className="form-control lg:col-span-2">
          <span className="label-text text-xs font-semibold uppercase tracking-wide text-base-content/60">
            Search title or contact
          </span>
          <input
            type="search"
            value={search}
            onChange={(event) => setSearch(event.target.value)}
            placeholder="Search customers..."
            className="input input-bordered w-full"
          />
        </label>

        <label className="form-control">
          <span className="label-text text-xs font-semibold uppercase tracking-wide text-base-content/60">
            Sort by
          </span>
          <select
            value={sortBy}
            onChange={(event) =>
              setSortBy(event.target.value as CustomerSortValue)
            }
            className="select select-bordered w-full"
          >
            {CUSTOMER_SORT_OPTIONS.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </label>

        <label className="form-control">
          <span className="label-text text-xs font-semibold uppercase tracking-wide text-base-content/60">
            Page size
          </span>
          <select
            value={pageSize}
            onChange={(event) =>
              setPageSize(Number(event.target.value) as 6 | 12 | 24)
            }
            className="select select-bordered w-full"
          >
            {CUSTOMER_PAGE_SIZE_OPTIONS.map((option) => (
              <option key={option} value={option}>
                {option} per page
              </option>
            ))}
          </select>
        </label>
      </div>

      <ResourceGrid
        isEmpty={pagedCustomers.length === 0}
        emptyMessage="No customers found."
      >
        {pagedCustomers.map((customer) => (
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

      <ListPagination
        currentPage={safePage}
        totalPages={totalPages}
        onPageChange={setCurrentPage}
      />
    </section>
  );
}

export default CustomersPage;
