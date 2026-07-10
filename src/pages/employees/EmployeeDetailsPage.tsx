import { Link, Outlet, useMatchRoute, useParams } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import {
  EditIcon,
  ResourceCard,
} from "../../components/molecules/ResourceCard";
import type { Employee } from "./employee.types";

function EmployeeDetailsPage() {
  const matchRoute = useMatchRoute();
  const { employeeId } = useParams({
    from: "/_protected/employees/$employeeId",
  });

  const editRoute = matchRoute({
    to: "/employees/$employeeId/edit",
    fuzzy: true,
  });

  const {
    data: employee,
    isError,
    isLoading,
  } = useQuery({
    queryKey: ["employees", employeeId],
    queryFn: async () => {
      const { data } = await axios.get<Employee>(
        `http://localhost:3001/employees/${employeeId}`,
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

  if (isError || !employee) {
    return (
      <div className="space-y-4">
        <Link to="/employees" className="btn btn-outline btn-sm">
          Back to employees
        </Link>
        <div className="alert alert-error">Employee could not be loaded.</div>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <Link to="/employees" className="btn btn-outline btn-sm">
        Back to employees
      </Link>

      <section className="space-y-6 rounded-xl border border-base-300 bg-base-100 p-5 shadow-sm sm:p-6">
        <div className="flex flex-col gap-4 border-b border-base-300 pb-5 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-xs font-semibold uppercase tracking-wide text-primary">
              Employee details
            </p>
            <h1 className="mt-1 text-3xl font-bold text-base-content">
              {employee.name}
            </h1>
            <p className="mt-2 text-sm leading-6 text-base-content/70">
              View employee contact and department information.
            </p>
          </div>

          <Link
            to="/employees/$employeeId/edit"
            params={{ employeeId }}
            className="btn btn-primary btn-sm"
          >
            <EditIcon />
            Edit
          </Link>
        </div>

        <ResourceCard
          title={employee.name}
          description={employee.email}
          badges={[
            {
              label: employee.department,
              className: "bg-blue-50 text-blue-700 ring-1 ring-blue-200",
            },
          ]}
          fields={[
            { label: "Department", value: employee.department },
            { label: "Email", value: employee.email },
            { label: "Employee ID", value: employee.id },
          ]}
        />
      </section>
    </div>
  );
}

export default EmployeeDetailsPage;
