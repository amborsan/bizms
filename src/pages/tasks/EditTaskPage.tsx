import { Link, useNavigate, useParams } from "@tanstack/react-router";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import CreateTaskForm from "../../components/atoms/forms/CreateTaskForm";
import type { Task } from "./task.types";

function EditTaskPage() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { taskId } = useParams({ from: "/_public/tasks/$taskId/edit" });
  const {
    data: task,
    isError,
    isLoading,
  } = useQuery({
    queryKey: ["tasks", taskId],
    queryFn: async () => {
      const { data } = await axios.get<Task>(
        `http://localhost:3001/tasks/${taskId}`,
      );

      return data;
    },
  });

  if (isLoading) {
    return <div className="loading loading-spinner loading-lg" />;
  }

  if (isError || !task) {
    return (
      <div className="space-y-4">
        <Link to="/tasks" className="btn btn-outline btn-sm">
          Back to tasks
        </Link>
        <div className="alert alert-error">Task could not be loaded.</div>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <Link to="/tasks" className="btn btn-outline btn-sm">
        Back to tasks
      </Link>

      <section className="space-y-6 rounded-xl border border-base-300 bg-base-100 p-5 shadow-sm sm:p-6">
        <div className="flex flex-col gap-4 border-b border-base-300 pb-5 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-xs font-semibold uppercase tracking-wide text-primary">
              Modify task
            </p>
            <h1 className="mt-1 text-3xl font-bold text-base-content">
              Edit {task.title}
            </h1>
            <p className="mt-2 max-w-2xl text-sm leading-6 text-base-content/70">
              Update task details, priority, category, or workflow status.
            </p>
          </div>

          <div className="flex gap-2">
            <Link
              to="/tasks/$taskId"
              params={{ taskId }}
              className="btn btn-primary btn-sm"
            >
              View details
            </Link>
          </div>
        </div>

        <CreateTaskForm
          initialValues={task}
          mode="edit"
          onSuccess={(updatedTask) => {
            queryClient.invalidateQueries({ queryKey: ["tasks"] });
            queryClient.setQueryData(["tasks", updatedTask.id], updatedTask);
            navigate({
              to: "/tasks/$taskId",
              params: { taskId: updatedTask.id },
            });
          }}
        />
      </section>
    </div>
  );
}

export default EditTaskPage;
