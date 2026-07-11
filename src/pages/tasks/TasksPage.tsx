import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Outlet, useLocation, useNavigate } from "@tanstack/react-router";
import axios from "axios";
import { useMemo, useState } from "react";
import { useUser } from "@clerk/react";
import {
  EditIcon,
  EyeIcon,
  ListPagination,
  ResourceCard,
  ResourceGrid,
  TrashIcon,
} from "../../components/molecules/ResourceCard";
import type { Task } from "./task.types";
import { getPriorityBadgeClass, getStatusBadgeClass } from "./taskBadges";
import { useToast } from "../../context/ToastContext";
import Button from "../../components/atoms/Button";

const TASK_PAGE_SIZE_OPTIONS = [6, 12, 24] as const;
const TASK_SORT_OPTIONS = [
  { label: "Newest first", value: "createdat-desc" },
  { label: "Oldest first", value: "createdat-asc" },
  { label: "Title A-Z", value: "title-asc" },
  { label: "Title Z-A", value: "title-desc" },
  { label: "Priority high-low", value: "priority-desc" },
  { label: "Priority low-high", value: "priority-asc" },
] as const;

type TaskSortValue = (typeof TASK_SORT_OPTIONS)[number]["value"];

function getPriorityRank(priority: string) {
  if (priority === "High") return 3;
  if (priority === "Medium") return 2;
  if (priority === "Low") return 1;

  return 0;
}

function TasksPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { isSignedIn, user } = useUser();
  const { showToast } = useToast();
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [sortBy, setSortBy] = useState<TaskSortValue>("createdat-desc");
  const [pageSize, setPageSize] =
    useState<(typeof TASK_PAGE_SIZE_OPTIONS)[number]>(6);
  const [currentPage, setCurrentPage] = useState(1);

  const { data, isLoading, isError } = useQuery({
    queryKey: ["tasks"],
    queryFn: async () => {
      const { data } = await axios.get<Task[]>("http://localhost:3001/tasks");

      return data;
    },
  });

  const deleteMutation = useMutation({
    mutationFn: (taskId: string) => {
      return axios.delete(`http://localhost:3001/tasks/${taskId}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["tasks"] });
      showToast("Task deleted successfully.", { type: "success" });
    },
    onError: () => {
      showToast("Task could not be deleted.", { type: "error" });
    },
  });

  const isTaskChildRoute =
    location.pathname !== "/tasks" && location.pathname.startsWith("/tasks/");

  const tasks = useMemo(() => (data ?? []) as Task[], [data]);
  const canManageTasks = isSignedIn && user?.publicMetadata?.role === "admin";

  const categories = useMemo(
    () =>
      Array.from(
        new Set(tasks.map((task) => task.category).filter(Boolean)),
      ).sort(),
    [tasks],
  );

  const filteredTasks = useMemo(() => {
    const normalizedSearch = search.trim().toLowerCase();

    const filtered = tasks.filter((task) => {
      const matchesSearch =
        normalizedSearch.length === 0 ||
        task.title.toLowerCase().includes(normalizedSearch) ||
        task.description.toLowerCase().includes(normalizedSearch);
      const matchesStatus =
        statusFilter === "all" || task.status === statusFilter;
      const matchesCategory =
        categoryFilter === "all" || task.category === categoryFilter;

      return matchesSearch && matchesStatus && matchesCategory;
    });

    return filtered.sort((left, right) => {
      if (sortBy === "createdat-desc") {
        return (
          new Date(right.createdat).getTime() -
          new Date(left.createdat).getTime()
        );
      }

      if (sortBy === "createdat-asc") {
        return (
          new Date(left.createdat).getTime() -
          new Date(right.createdat).getTime()
        );
      }

      if (sortBy === "title-asc") {
        return left.title.localeCompare(right.title);
      }

      if (sortBy === "title-desc") {
        return right.title.localeCompare(left.title);
      }

      if (sortBy === "priority-desc") {
        return getPriorityRank(right.priority) - getPriorityRank(left.priority);
      }

      return getPriorityRank(left.priority) - getPriorityRank(right.priority);
    });
  }, [categoryFilter, search, sortBy, statusFilter, tasks]);

  const totalPages = Math.max(1, Math.ceil(filteredTasks.length / pageSize));
  const safePage = Math.min(currentPage, totalPages);
  const pagedTasks = filteredTasks.slice(
    (safePage - 1) * pageSize,
    safePage * pageSize,
  );

  if (isTaskChildRoute) {
    return <Outlet />;
  }

  if (isLoading) {
    return <div className="loading loading-spinner loading-lg" />;
  }

  if (isError) {
    return <div className="alert alert-error">Something went wrong.</div>;
  }

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
          <p className="text-2xl font-bold text-base-content">
            {filteredTasks.length}
          </p>
          <p className="text-xs font-medium uppercase text-base-content/60">
            Filtered tasks
          </p>
        </div>
        {canManageTasks && (
          <Button
            type="button"
            className="btn btn-primary"
            onClick={() => navigate({ to: "/create-task" })}
          >
            Add task
          </Button>
        )}
      </div>

      <div className="grid gap-4 rounded-2xl border border-base-300 bg-base-200 p-4 lg:grid-cols-5">
        <label className="form-control lg:col-span-2">
          <span className="label-text text-xs font-semibold uppercase tracking-wide text-base-content/60">
            Search title or description
          </span>
          <input
            type="search"
            value={search}
            onChange={(event) => setSearch(event.target.value)}
            placeholder="Search tasks..."
            className="input input-bordered w-full"
          />
        </label>

        <label className="form-control">
          <span className="label-text text-xs font-semibold uppercase tracking-wide text-base-content/60">
            Status
          </span>
          <select
            value={statusFilter}
            onChange={(event) => setStatusFilter(event.target.value)}
            className="select select-bordered w-full"
          >
            <option value="all">All statuses</option>
            <option value="open">Open</option>
            <option value="In progress">In progress</option>
            <option value="Pending">Pending</option>
            <option value="Completed">Completed</option>
            <option value="canceled">Canceled</option>
          </select>
        </label>

        <label className="form-control">
          <span className="label-text text-xs font-semibold uppercase tracking-wide text-base-content/60">
            Category
          </span>
          <select
            value={categoryFilter}
            onChange={(event) => setCategoryFilter(event.target.value)}
            className="select select-bordered w-full"
          >
            <option value="all">All categories</option>
            {categories.map((category) => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </select>
        </label>

        <label className="form-control">
          <span className="label-text text-xs font-semibold uppercase tracking-wide text-base-content/60">
            Sort by
          </span>
          <select
            value={sortBy}
            onChange={(event) => setSortBy(event.target.value as TaskSortValue)}
            className="select select-bordered w-full"
          >
            {TASK_SORT_OPTIONS.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </label>

        <label className="form-control lg:col-start-5">
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
            {TASK_PAGE_SIZE_OPTIONS.map((option) => (
              <option key={option} value={option}>
                {option} per page
              </option>
            ))}
          </select>
        </label>
      </div>

      <ResourceGrid
        isEmpty={pagedTasks.length === 0}
        emptyMessage="No tasks found."
      >
        {pagedTasks.map((task) => (
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

      <ListPagination
        currentPage={safePage}
        totalPages={totalPages}
        onPageChange={setCurrentPage}
      />
    </section>
  );
}

export default TasksPage;
