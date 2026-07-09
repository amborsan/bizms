import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import Button from "../../components/atoms/Button";
function TasksPage() {
  const { data, isLoading, isError } = useQuery({
    queryKey: ["tasks"],
    queryFn: async () => {
      const { data } = await axios.get("http://localhost:3001/tasks");

      return data;
    },
  });

  if (isLoading) {
    return <p>Loading posts...</p>;
  }

  if (isError) {
    return <p>Something went wrong.</p>;
  }

  return (
    <section>
      <h1 className="text-2xl font-bold">Tasks</h1>

      <ul className="mt-4 space-y-3">
        {data.map((task) => (
          <article key={task.id}>
            <li className="rounded bg-white p-4 shadow-sm">
              <h2 className="font-semibold">Task: {task.title}</h2>
              <p className="mt-1 text-sm text-slate-600">
                {" "}
                Description: {task.description}
              </p>
              <p className="mt-1 text-sm text-slate-600">
                {" "}
                Task Status{task.status[0]}
              </p>
              <p className="mt-1 text-sm text-slate-600">
                reated at: {task.createdat}
              </p>
              <p className="mt-1 text-sm text-slate-600">
                Priority: {task.priority[1]}
              </p>
            </li>
            <div>
              <span className="m-2 p-2">
                <Button>Delete</Button>
              </span>

              <span className="m-2 p-2">
                <Button>Edit</Button>
              </span>
            </div>
          </article>
        ))}
      </ul>
    </section>
  );
}

export default TasksPage;
