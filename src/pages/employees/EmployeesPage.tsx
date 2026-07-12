import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Outlet, useMatchRoute, useNavigate } from "@tanstack/react-router";
import axios from "axios";
import { useUser } from "@clerk/react";
import { useState } from "react";
import {
  EditIcon,
  EyeIcon,
  ListPagination,
  ResourceCard,
  ResourceGrid,
  TrashIcon,
} from "../../components/molecules/resourceCard";
import type { Employee } from "./employee.types";
import { useToast } from "../../context/ToastContext";
import Button from "../../components/atoms/button/Button";

const EMPLOYEE_PAGE_SIZE_OPTIONS = [6, 12, 24] as const;
const EMPLOYEE_SORT_OPTIONS = [
  { label: "Name A-Z", value: "name-asc" },
  { label: "Name Z-A", value: "name-desc" },
  { label: "Department A-Z", value: "department-asc" },
  { label: "Department Z-A", value: "department-desc" },
] as const;

type EmployeeSortValue = (typeof EMPLOYEE_SORT_OPTIONS)[number]["value"];

function EmployeesPage() {
  const matchRoute = useMatchRoute();
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { isSignedIn, user } = useUser();
  const { showToast } = useToast();
  const [search, setSearch] = useState("");
  const [sortBy, setSortBy] = useState<EmployeeSortValue>("name-asc");
  const [pageSize, setPageSize] =
    useState<(typeof EMPLOYEE_PAGE_SIZE_OPTIONS)[number]>(6);
  const [currentPage, setCurrentPage] = useState(1);

  const childRoute = matchRoute({
    to: "/employees/$employeeId",
    fuzzy: true,
  });

  const { data, isError, isLoading } = useQuery({
    queryKey: ["employees"],
    queryFn: async () => {
      const { data } = await axios.get<Employee[]>(
        "http://localhost:3001/employees",
      );
      return data;
    },
  });

  const deleteMutation = useMutation({
    mutationFn: (employeeId: string) => {
      return axios.delete(`http://localhost:3001/employees/${employeeId}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["employees"] });
      showToast("Employee deleted successfully.", { type: "success" });
    },
    onError: () => {
      showToast("Employee could not be deleted.", { type: "error" });
    },
  });

  if (childRoute) {
    return <Outlet />;
  }

  if (isLoading) {
    return <div className="loading loading-spinner loading-lg" />;
  }

  if (isError) {
    return <div className="alert alert-error">Employees could not load.</div>;
  }

  const employees = (data ?? []) as Employee[];
  const canManageEmployees =
    isSignedIn && user?.publicMetadata?.role === "admin";
  const normalizedSearch = search.trim().toLowerCase();

  const filtered = employees.filter((employee) => {
    const matchesSearch =
      normalizedSearch.length === 0 ||
      employee.name.toLowerCase().includes(normalizedSearch) ||
      employee.department.toLowerCase().includes(normalizedSearch) ||
      employee.email.toLowerCase().includes(normalizedSearch);

    return matchesSearch;
  });

  const filteredEmployees = filtered.sort((left, right) => {
    if (sortBy === "name-asc") return left.name.localeCompare(right.name);
    if (sortBy === "name-desc") return right.name.localeCompare(left.name);
    if (sortBy === "department-asc")
      return left.department.localeCompare(right.department);

    return right.department.localeCompare(left.department);
  });

  const totalPages = Math.max(
    1,
    Math.ceil(filteredEmployees.length / pageSize),
  );
  const safePage = Math.min(currentPage, totalPages);
  const pagedEmployees = filteredEmployees.slice(
    (safePage - 1) * pageSize,
    safePage * pageSize,
  );

  return (
    <section className="space-y-6 rounded-xl border border-base-300 bg-base-100 p-5 shadow-sm sm:p-6">
      <div className="flex flex-col gap-4 border-b border-base-300 pb-5 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="text-xs font-semibold uppercase tracking-wide text-primary">
            Team
          </p>
          <h1 className="mt-1 text-3xl font-bold text-base-content">
            Employees
          </h1>
          <p className="mt-2 max-w-2xl text-sm leading-6 text-base-content/70">
            Review employees and update their contact information.
          </p>
        </div>
        <div className="rounded-lg border border-base-300 bg-base-200 px-4 py-3 text-right shadow-sm">
          <p className="text-2xl font-bold text-base-content">
            {filteredEmployees.length}
          </p>
          <p className="text-xs font-medium uppercase text-base-content/60">
            Filtered employees
          </p>
        </div>
        {canManageEmployees && (
          <Button
            type="button"
            onClick={() => navigate({ to: "/create-employee" })}
          >
            Add employee
          </Button>
        )}
      </div>

      <div className="grid gap-4 rounded-2xl border border-base-300 bg-base-200 p-4 lg:grid-cols-4">
        <label className="form-control lg:col-span-2">
          <span className="label-text text-xs font-semibold uppercase tracking-wide text-base-content/60">
            Search name or department
          </span>
          <input
            type="search"
            value={search}
            onChange={(event) => setSearch(event.target.value)}
            placeholder="Search employees..."
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
              setSortBy(event.target.value as EmployeeSortValue)
            }
            className="select select-bordered w-full"
          >
            {EMPLOYEE_SORT_OPTIONS.map((option) => (
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
            {EMPLOYEE_PAGE_SIZE_OPTIONS.map((option) => (
              <option key={option} value={option}>
                {option} per page
              </option>
            ))}
          </select>
        </label>
      </div>

      <ResourceGrid
        isEmpty={pagedEmployees.length === 0}
        emptyMessage="No employees found."
      >
        {pagedEmployees.map((employee) => (
          <ResourceCard
            key={employee.id}
            title={employee.name}
            description={employee.email}
            badges={[
              {
                label: employee.department,
                className: "bg-blue-50 text-blue-700 ring-1 ring-blue-200",
              },
            ]}
            fields={[
              {
                label: "Department",
                value: employee.department,
              },
              {
                label: "Email",
                value: employee.email,
              },
            ]}
            actions={[
              {
                icon: <EyeIcon />,
                label: "View employee",
                onClick: () =>
                  navigate({
                    to: "/employees/$employeeId",
                    params: { employeeId: employee.id },
                  }),
                variant: "primary",
              },
              ...(canManageEmployees
                ? [
                    {
                      icon: <EditIcon />,
                      label: "Edit employee",
                      onClick: () =>
                        navigate({
                          to: "/employees/$employeeId/edit",
                          params: { employeeId: employee.id },
                        }),
                      variant: "ghost" as const,
                    },
                    {
                      icon: <TrashIcon />,
                      label: "Delete employee",
                      onClick: () => deleteMutation.mutate(employee.id),
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

export default EmployeesPage;
