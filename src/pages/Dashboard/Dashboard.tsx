import { useUser } from "@clerk/react";
import { useQuery } from "@tanstack/react-query";
import { Link, useNavigate } from "@tanstack/react-router";
import axios from "axios";
import Button from "../../components/atoms/Button/Button";
import type { Customer } from "../customers/customer.types";
import type { Employee } from "../employees/employee.types";
import type { Task } from "../tasks/task.types";

type StatCardProps = {
  label: string;
  value: string | number;
  helperText: string;
};

const taskStatusLabels = [
  "open",
  "In progress",
  "Pending",
  "Completed",
] as const;
const priorityLabels = ["High", "Medium", "Low"] as const;

function StatCard({ label, value, helperText }: StatCardProps) {
  return (
    <article className="rounded-2xl border border-base-300 bg-base-100 p-5 shadow-sm">
      <p className="text-xs font-semibold uppercase tracking-wide text-primary">
        {label}
      </p>
      <p className="mt-3 text-3xl font-black text-base-content">{value}</p>
      <p className="mt-2 text-sm leading-6 text-base-content/70">
        {helperText}
      </p>
    </article>
  );
}

export default function Dashboard() {
  const { user } = useUser();
  const navigate = useNavigate();

  const tasksQuery = useQuery({
    queryKey: ["tasks"],
    queryFn: async () => {
      const { data } = await axios.get<Task[]>("http://localhost:3001/tasks");
      return data;
    },
  });

  const employeesQuery = useQuery({
    queryKey: ["employees"],
    queryFn: async () => {
      const { data } = await axios.get<Employee[]>(
        "http://localhost:3001/employees",
      );
      return data;
    },
  });

  const customersQuery = useQuery({
    queryKey: ["customers"],
    queryFn: async () => {
      const { data } = await axios.get<Customer[]>(
        "http://localhost:3001/customers",
      );
      return data;
    },
  });

  const tasks = tasksQuery.data ?? [];
  const employees = employeesQuery.data ?? [];
  const customers = customersQuery.data ?? [];

  const loading =
    tasksQuery.isLoading ||
    employeesQuery.isLoading ||
    customersQuery.isLoading;
  const error =
    tasksQuery.isError || employeesQuery.isError || customersQuery.isError;

  const taskCounts = taskStatusLabels.map((status) => ({
    label: status,
    count: tasks.filter((task) => task.status === status).length,
  }));

  const priorityCounts = priorityLabels.map((priority) => ({
    label: priority,
    count: tasks.filter((task) => task.priority === priority).length,
  }));

  const openTasks = tasks.filter((task) => task.status !== "Completed");
  const recentTasks = [...tasks]
    .slice(0, 5)
    .map((task) => task.title || "Untitled task");

  if (loading) {
    return <div className="loading loading-spinner loading-lg" />;
  }

  if (error) {
    return (
      <div className="alert alert-error">
        The dashboard could not load right now.
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <section className="overflow-hidden rounded-4xl border border-base-300 bg-base-100 p-6 shadow-sm sm:p-8">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-3xl space-y-4">
            <div className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/10 px-4 py-2 text-xs font-semibold uppercase tracking-[0.15em] text-primary">
              Admin dashboard
            </div>
            <div className="space-y-3">
              <h2 className="font-light leading-tight text-base-content sm:text-4xl">
                Welcome back{user?.firstName ? `, ${user.firstName}` : ""}.
              </h2>
              <p className="font-light max-w-1xl text-base leading-7 text-base-content/60 sm:text-mg">
                Track operations, teams, and customers in one place.
              </p>
            </div>
          </div>

          <div className="grid gap-3 rounded-3xl border border-base-300 bg-base-200 p-5 shadow-inner sm:min-w-80">
            <div>
              <p className="text-xs font-semibold uppercase tracking-wide text-base-content/60">
                Access level
              </p>
              <p className="mt-1 text-2xl font-bold text-base-content">
                {user?.publicMetadata?.role === "admin"
                  ? "Administrator"
                  : "Employee"}
              </p>
            </div>
            <div className="grid grid-cols-2 gap-3">
              <Button
                size="sm"
                onClick={() => void navigate({ to: "/tasks" })}
              >
                Tasks
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => void navigate({ to: "/employees" })}
              >
                Employees
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => void navigate({ to: "/customers" })}
              >
                Customers
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => void navigate({ to: "/reports" })}
              >
                Reports
              </Button>
            </div>
          </div>
        </div>
      </section>

      <section className="grid gap-4 md:grid-cols-3">
        <StatCard
          label="Tasks"
          value={tasks.length}
          helperText={`${openTasks.length} tasks still need attention.`}
        />
        <StatCard
          label="Employees"
          value={employees.length}
          helperText="Current active team members in the workspace."
        />
        <StatCard
          label="Customers"
          value={customers.length}
          helperText="Registered customer records available for review."
        />
      </section>

      <section className="grid gap-6 xl:grid-cols-[1.2fr_0.8fr]">
        <article className="rounded-3xl border border-base-300 bg-base-100 p-6 shadow-sm">
          <div className="flex items-end justify-between gap-4 border-b border-base-300 pb-4">
            <div>
              <p className="text-xs font-semibold uppercase tracking-wide text-primary">
                Task breakdown
              </p>
              <h2 className="mt-1 text-2xl font-bold text-base-content">
                Status overview
              </h2>
            </div>
            <p className="text-sm text-base-content/60">{tasks.length} total</p>
          </div>

          <div className="mt-5 space-y-4">
            {taskCounts.map((item) => {
              const percentage =
                tasks.length === 0
                  ? 0
                  : Math.round((item.count / tasks.length) * 100);

              return (
                <div key={item.label} className="space-y-2">
                  <div className="flex items-center justify-between text-sm">
                    <span className="font-medium text-base-content">
                      {item.label}
                    </span>
                    <span className="text-base-content/70">
                      {item.count} ({percentage}%)
                    </span>
                  </div>
                  <progress
                    className="progress progress-primary w-full"
                    value={item.count}
                    max={tasks.length || 1}
                  />
                </div>
              );
            })}
          </div>

          <div className="mt-6 rounded-2xl bg-base-200 p-4">
            <p className="text-xs font-semibold uppercase tracking-wide text-base-content/60">
              Priority mix
            </p>
            <div className="mt-3 grid gap-3 sm:grid-cols-3">
              {priorityCounts.map((item) => (
                <div
                  key={item.label}
                  className="rounded-2xl bg-base-100 p-4 text-center shadow-sm"
                >
                  <p className="text-2xl font-bold text-base-content">
                    {item.count}
                  </p>
                  <p className="mt-1 text-xs font-semibold uppercase tracking-wide text-base-content/60">
                    {item.label}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </article>

        <article className="rounded-3xl border border-base-300 bg-base-100 p-6 shadow-sm">
          <div className="border-b border-base-300 pb-4">
            <p className="text-xs font-semibold uppercase tracking-wide text-primary">
              Quick glance
            </p>
            <h2 className="mt-1 text-2xl font-bold text-base-content">
              Recent activity
            </h2>
          </div>

          <div className="mt-5 space-y-4">
            <div className="rounded-2xl border border-base-300 bg-base-200 p-4">
              <p className="text-xs font-semibold uppercase tracking-wide text-base-content/60">
                Tasks in progress
              </p>
              <p className="mt-2 text-3xl font-black text-base-content">
                {tasks.filter((task) => task.status === "In progress").length}
              </p>
            </div>

            <div className="rounded-2xl border border-base-300 bg-base-200 p-4">
              <p className="text-xs font-semibold uppercase tracking-wide text-base-content/60">
                Recent task titles
              </p>
              <ul className="mt-3 space-y-2 text-sm text-base-content/80">
                {recentTasks.length > 0 ? (
                  recentTasks.map((taskTitle) => (
                    <li key={taskTitle}>{taskTitle}</li>
                  ))
                ) : (
                  <li>No tasks recorded yet.</li>
                )}
              </ul>
            </div>

            <div className="rounded-2xl border border-base-300 bg-base-200 p-4">
              <p className="text-xs font-semibold uppercase tracking-wide text-base-content/60">
                Recommended next step
              </p>
              <p className="mt-2 text-sm leading-6 text-base-content/80">
                Keep the dashboard moving by creating a task, reviewing a
                customer record, or checking the employees list for updates.
              </p>
              <div className="mt-4 flex flex-wrap gap-2">
                <Link to="/create-task" className="btn btn-primary btn-sm">
                  Create task
                </Link>
                <Link to="/customers" className="btn btn-outline btn-sm">
                  Customers
                </Link>
              </div>
            </div>
          </div>
        </article>
      </section>
    </div>
  );
}
