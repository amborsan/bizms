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
import type { Employee } from "./employee.types";

function EmployeesPage() {
  const matchRoute = useMatchRoute();
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { isSignedIn, user } = useUser();

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

  const employees = data || [];
  const canManageEmployees =
    isSignedIn && user?.publicMetadata?.role === "admin";

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
            {employees.length}
          </p>
          <p className="text-xs font-medium uppercase text-base-content/60">
            Total employees
          </p>
        </div>
        {canManageEmployees && (
          <button
            type="button"
            className="btn btn-primary"
            onClick={() => navigate({ to: "/create-employee" })}
          >
            Add employee
          </button>
        )}
      </div>

      <ResourceGrid
        isEmpty={employees.length === 0}
        emptyMessage="No employees found."
      >
        {employees.map((employee) => (
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
    </section>
  );
}

export default EmployeesPage;
