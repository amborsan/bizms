import { Link, useNavigate, useParams } from "@tanstack/react-router";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import EmployeeForm from "./EmployeeForm";
import type { Employee } from "./employee.types";

function EditEmployeePage() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { employeeId } = useParams({
    from: "/_protected/employees/$employeeId/edit",
  });

  const { data: employee, isError, isLoading } = useQuery({
    queryKey: ["employees", employeeId],
    queryFn: async () => {
      const { data } = await axios.get<Employee>(
        `http://localhost:3001/employees/${employeeId}`,
      );
      return data;
    },
  });

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

      <section className="space-y-6 rounded-xl border border-slate-200 bg-slate-50 p-5 shadow-sm sm:p-6">
        <div className="border-b border-slate-200 pb-5">
          <p className="text-xs font-semibold uppercase tracking-wide text-blue-600">
            Edit employee
          </p>
          <h1 className="mt-1 text-3xl font-bold text-slate-950">
            Edit {employee.name}
          </h1>
        </div>

        <EmployeeForm
          employee={employee}
          onSuccess={(updatedEmployee) => {
            queryClient.invalidateQueries({ queryKey: ["employees"] });
            queryClient.setQueryData(
              ["employees", updatedEmployee.id],
              updatedEmployee,
            );
            navigate({
              to: "/employees/$employeeId",
              params: { employeeId: updatedEmployee.id },
            });
          }}
        />
      </section>
    </div>
  );
}

export default EditEmployeePage;
