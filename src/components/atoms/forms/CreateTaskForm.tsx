import { useForm } from "@tanstack/react-form";
import Button from "../Button/Button";
import axios from "axios";
import { useMutation } from "@tanstack/react-query";
import z from "zod";

const taskScheme = {
  title: z.string().min(3).max(50),
  description: z.string(),
  status: z.string(),
  category: z.string(),
  priority: z.string(),
  createdat: z.string(),
};
type Task = z.infer<typeof taskScheme>;
const statuses = ["Completed", "Pending", "In progress", "canceled", "open"];
const priorities = ["High", "Medium", "Low"];
const categories = [
  "IT Support",
  "Custom relatioships",
  "Design",
  "Manifacturing",
  "Quality control",
];
function AddEmployeeForm() {
  // const [tasks, setTasks] = useState({});
  const mutation = useMutation({
    mutationFn: (newTask: Task) => {
      return axios.post("http://localhost:3001/tasks", newTask);
    },
  });

  const defaultTask: Task = {
    title: "",
    description: "",
    status: "",
    category: "",
    priority: "",
    createdat: new Date().toLocaleDateString(),
  };
  /*   const getTasks = async () => {
    const { fetchedTasks } = await axios.get("http://localhost:3001/tasks");
  }; */
  /*   const handleInput = async (e, taskInput) => {
    const inputData = e.target.value;
    setTask({ ...task, taskInput: inputData });
    console.log("Task: ", inputData);
  }; */
  const form = useForm({
    defaultValues: defaultTask,
    onSubmit: ({ value }) => {
      mutation.mutate(value);
    },
  });
  return (
    <div>
      <form action={form.handleSubmit}>
        <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
          <form.Field name="title">
            {(field) => {
              //   console.log('Field', field)
              return (
                <>
                  <input
                    className="block min-w-0 grow bg-amber-200 py-1.5 pr-3 pl-1 text-base text-blue placeholder:text-gray-500 focus:outline-1 sm:text-sm/6"
                    value={field.state.value}
                    onBlur={field.handleBlur}
                    onChange={(e) => field.handleChange(e.target.value)}
                  />
                  status
                </>
              );
            }}
          </form.Field>
          <form.Field name="description">
            {(field) => {
              //   console.log('statusField', field)
              return (
                <>
                  <textarea
                    className="block min-w-0 grow bg-amber-200 py-1.5 pr-3 pl-1 text-base text-blue placeholder:text-gray-500 focus:outline-1 sm:text-sm/6"
                    value={field.state.value}
                    onBlur={field.handleBlur}
                    onChange={(e) => field.handleChange(e.target.value)}
                  />
                </>
              );
            }}
          </form.Field>
          <form.Field name="status">
            {(field) => (
              <div>
                <label htmlFor={field.name}>Status</label>
                <select
                  id={field.name}
                  name={field.name}
                  value={field.state.value}
                  onChange={(e) => field.handleChange(e.target.value)}
                  onBlur={field.handleBlur}
                >
                  {statuses.map((status) => (
                    <option key={status} value={status}>
                      {status}
                    </option>
                  ))}
                </select>
              </div>
            )}
          </form.Field>
          <form.Field name="priority">
            {(field) => {
              return (
                <>
                  <select
                    className="block min-w-0 grow bg-amber-200 py-1.5 pr-3 pl-1 text-base text-blue placeholder:text-gray-500 focus:outline-1 sm:text-sm/6"
                    value={field.state.value}
                    onBlur={field.handleBlur}
                    onChange={(e) => field.handleChange(e.target.value)}
                  >
                    {priorities.map((priority) => (
                      <option key={priority} value={priority}>
                        {priority}
                      </option>
                    ))}
                  </select>
                </>
              );
            }}
          </form.Field>
          <form.Field name="category">
            {(field) => {
              return (
                <>
                  <select
                    className="block min-w-0 grow bg-amber-200 py-1.5 pr-3 pl-1 text-base text-blue placeholder:text-gray-500 focus:outline-1 sm:text-sm/6"
                    value={field.state.value}
                    onBlur={field.handleBlur}
                    onChange={(e) => field.handleChange(e.target.value)}
                  >
                    {categories.map((category) => (
                      <option key={category} value={category}>
                        {category}
                      </option>
                    ))}
                  </select>
                </>
              );
            }}
          </form.Field>
        </div>
        <Button>Submit</Button>
      </form>
    </div>
  );
}

export default AddEmployeeForm;
