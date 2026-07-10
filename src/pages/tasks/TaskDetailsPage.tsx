import { Link, Outlet, useMatchRoute, useParams } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import {
  EditIcon,
  ResourceCard,
} from "../../components/molecules/ResourceCard";
import type { Task } from "./task.types";
import { getPriorityBadgeClass, getStatusBadgeClass } from "./taskBadges";

function TaskDetailsPage() {
  const matchRoute = useMatchRoute();
  const { taskId } = useParams({ from: "/_public/tasks/$taskId" });
  const { data: task, isError, isLoading } = useQuery({
    queryKey: ["tasks", taskId],
    queryFn: async () => {
      const { data } = await axios.get<Task>(
        `http://localhost:3001/tasks/${taskId}`,
      );

      return data;
    },
  });
  const editRoute = matchRoute({
    to: "/tasks/$taskId/edit",
    fuzzy: true,
  });

  if (editRoute) {
    return <Outlet />;
  }

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

      <section className="space-y-6 rounded-xl border border-slate-200 bg-slate-50 p-5 shadow-sm sm:p-6">
        <div className="flex flex-col gap-4 border-b border-slate-200 pb-5 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-xs font-semibold uppercase tracking-wide text-blue-600">
              Task details
            </p>
            <h1 className="mt-1 text-3xl font-bold text-slate-950">
              {task.title}
            </h1>
            <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-600">
              View the complete task record and current workflow status.
            </p>
          </div>

          <div className="flex gap-2">
            <Link
              to="/tasks/$taskId/edit"
              params={{ taskId }}
              className="btn btn-primary btn-sm"
            >
              <EditIcon />
              Edit
            </Link>
          </div>
        </div>

        <ResourceCard
          title={task.title}
          description={task.description || "No description provided."}
          badges={[
            {
              label: task.status || "No status",
              className: getStatusBadgeClass(task.status),
            },
            {
              label: task.priority || "No priority",
              className: getPriorityBadgeClass(task.priority),
            },
          ]}
          fields={[
            {
              label: "Category",
              value: task.category || "Unassigned",
            },
            {
              label: "Created",
              value: task.createdat || "Unknown",
            },
            {
              label: "Task ID",
              value: task.id,
            },
          ]}
        />
      </section>
    </div>
  );
}

export default TaskDetailsPage;
