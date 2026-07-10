import { useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "@tanstack/react-router";
import CreateEmployeeForm from "../../components/atoms/forms/CreateEmployeeForm";
import type { Employee } from "./employee.types";

function CreateEmployeePage() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  return (
    <section className="space-y-6 rounded-xl border border-base-300 bg-base-100 p-5 shadow-sm sm:p-6">
      <div className="border-b border-base-300 pb-5">
        <p className="text-xs font-semibold uppercase tracking-wide text-primary">
          New employee
        </p>
        <h1 className="mt-1 text-3xl font-bold text-base-content">
          Add a new employee
        </h1>
        <p className="mt-2 max-w-2xl text-sm leading-6 text-base-content/70">
          Capture the employee name, department, and email address.
        </p>
      </div>

      <CreateEmployeeForm
        onSuccess={(employee: Employee) => {
          queryClient.invalidateQueries({ queryKey: ["employees"] });
          queryClient.setQueryData(["employees", employee.id], employee);
          navigate({
            to: "/employees/$employeeId",
            params: { employeeId: employee.id },
          });
        }}
      />
    </section>
  );
}

export default CreateEmployeePage;
