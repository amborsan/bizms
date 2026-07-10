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
import type { Task } from "./task.types";
import { getPriorityBadgeClass, getStatusBadgeClass } from "./taskBadges";

function TasksPage() {
  const matchRoute = useMatchRoute();
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { isSignedIn, user } = useUser();
  const { data, isLoading, isError } = useQuery({
    queryKey: ["tasks"],
    queryFn: async () => {
      const { data } = await axios.get("http://localhost:3001/tasks");

      return data;
    },
  });
  const deleteMutation = useMutation({
    mutationFn: (taskId: string) => {
      return axios.delete(`http://localhost:3001/tasks/${taskId}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["tasks"] });
    },
  });
  const childTaskRoute = matchRoute({
    to: "/tasks/$taskId",
    fuzzy: true,
  });

  if (childTaskRoute) {
    return <Outlet />;
  }

  if (isLoading) {
    return <div className="loading loading-spinner loading-lg" />;
  }

  if (isError) {
    return <div className="alert alert-error">Something went wrong.</div>;
  }

  const tasks = data as Task[];
  const canManageTasks = isSignedIn && user?.publicMetadata?.role === "admin";

  return (
    <section className="space-y-6 rounded-xl border border-base-300 bg-base-100 p-5 shadow-sm sm:p-6">
      <div className="flex flex-col gap-4 border-b border-base-300 pb-5 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="text-xs font-semibold uppercase tracking-wide text-primary">
            Operations
          </p>
          <h1 className="mt-1 text-3xl font-bold text-base-content">Tasks</h1>
          <p className="mt-2 max-w-2xl text-sm leading-6 text-base-content/70">
            Review open work, priorities, and task ownership details.
          </p>
        </div>
        <div className="rounded-lg border border-base-300 bg-base-200 px-4 py-3 text-right shadow-sm">
          <p className="text-2xl font-bold text-base-content">{tasks.length}</p>
          <p className="text-xs font-medium uppercase text-base-content/60">
            Total tasks
          </p>
        </div>
        {canManageTasks && (
          <button
            type="button"
            className="btn btn-primary"
            onClick={() => navigate({ to: "/create-task" })}
          >
            Add task
          </button>
        )}
      </div>

      <ResourceGrid isEmpty={tasks.length === 0} emptyMessage="No tasks found.">
        {tasks.map((task) => (
          <ResourceCard
            key={task.id}
            title={task.title || "Untitled task"}
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
            ]}
            actions={[
              {
                icon: <EyeIcon />,
                label: "View task",
                onClick: () =>
                  navigate({
                    to: "/tasks/$taskId",
                    params: { taskId: task.id },
                  }),
                variant: "primary",
              },
              ...(canManageTasks
                ? [
                    {
                      icon: <EditIcon />,
                      label: "Edit task",
                      onClick: () =>
                        navigate({
                          to: "/tasks/$taskId/edit",
                          params: { taskId: task.id },
                        }),
                      variant: "ghost" as const,
                    },
                    {
                      icon: <TrashIcon />,
                      label: "Delete task",
                      onClick: () => deleteMutation.mutate(task.id),
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

export default TasksPage;
