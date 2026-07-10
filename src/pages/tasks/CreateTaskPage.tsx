import { useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "@tanstack/react-router";
import CreateTaskForm from "../../components/atoms/forms/CreateTaskForm";

function CreateTaskPage() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  return (
    <section className="space-y-6 rounded-xl border border-slate-200 bg-slate-50 p-5 shadow-sm sm:p-6">
      <div className="border-b border-slate-200 pb-5">
        <p className="text-xs font-semibold uppercase tracking-wide text-blue-600">
          New task
        </p>
        <h1 className="mt-1 text-3xl font-bold text-slate-950">
          Add a new task
        </h1>
        <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-600">
          Capture the work, set priority, and assign the task to a category.
        </p>
      </div>

      <CreateTaskForm
        onSuccess={(task) => {
          queryClient.invalidateQueries({ queryKey: ["tasks"] });
          queryClient.setQueryData(["tasks", task.id], task);
          navigate({
            to: "/tasks/$taskId",
            params: { taskId: task.id },
          });
        }}
      />
    </section>
  );
}

export default CreateTaskPage;
