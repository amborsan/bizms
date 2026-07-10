import { useForm } from "@tanstack/react-form";
import Button from "../Button/Button";
import axios from "axios";
import { useMutation } from "@tanstack/react-query";
import z from "zod";
import FieldComponent from "./FieldComponent";
import Input from "./Input";
import SelectInput from "./SelectInput";
import type { Task, TaskFormValues } from "../../../pages/tasks/task.types";

const taskSchema = z.object({
  title: z
    .string()
    .trim()
    .min(3, "Title must be at least 3 characters")
    .max(50, "Title must be 50 characters or less"),
  description: z.string().trim().min(1, "Description is required"),
  status: z.string().min(1, "Status is required"),
  category: z.string().min(1, "Category is required"),
  priority: z.string().min(1, "Priority is required"),
  createdat: z.string(),
});
const statuses = ["Completed", "Pending", "In progress", "canceled", "open"];
const priorities = ["High", "Medium", "Low"];
const categories = [
  "IT Support",
  "Custom relatioships",
  "Design",
  "Manifacturing",
  "Quality control",
];
type CreateTaskFormProps = {
  initialValues?: Task;
  mode?: "create" | "edit";
  onSuccess?: (task: Task) => void;
};

function CreateTaskForm({
  initialValues,
  mode = "create",
  onSuccess,
}: CreateTaskFormProps) {
  const mutation = useMutation({
    mutationFn: async (taskValues: TaskFormValues) => {
      if (mode === "edit" && initialValues?.id) {
        const { data } = await axios.put<Task>(
          `http://localhost:3001/tasks/${initialValues.id}`,
          {
            ...taskValues,
            id: initialValues.id,
          },
        );

        return data;
      }

      const { data } = await axios.post<Task>(
        "http://localhost:3001/tasks",
        taskValues,
      );

      return data;
    },
    onSuccess: (task) => {
      onSuccess?.(task);
    },
  });

  const defaultTask: TaskFormValues = {
    title: initialValues?.title ?? "",
    description: initialValues?.description ?? "",
    status: initialValues?.status ?? "",
    category: initialValues?.category ?? "",
    priority: initialValues?.priority ?? "",
    createdat: initialValues?.createdat ?? new Date().toLocaleDateString(),
  };

  const form = useForm({
    defaultValues: defaultTask,
    validators: {
      onChange: taskSchema,
      onSubmit: taskSchema,
    },
    onSubmit: ({ value }) => {
      mutation.mutate(taskSchema.parse(value));
    },
  });
  return (
    <div className="card w-full max-w-2xl border border-slate-200 bg-white shadow-sm">
      <form
        className="card-body gap-4"
        onSubmit={(event) => {
          event.preventDefault();
          form.handleSubmit();
        }}
      >
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <FieldComponent
            className="sm:col-span-2"
            form={form}
            label="Title"
            name="title"
          >
            {(field) => <Input field={field} />}
          </FieldComponent>

          <FieldComponent
            className="sm:col-span-2"
            form={form}
            label="Description"
            name="description"
          >
            {(field) => (
              <textarea
                id={field.name}
                name={field.name}
                className={`textarea textarea-bordered w-full ${
                  field.state.meta.isTouched &&
                  field.state.meta.errors.length > 0
                    ? "textarea-error"
                    : ""
                }`}
                value={field.state.value}
                onBlur={field.handleBlur}
                onChange={(e) => field.handleChange(e.target.value)}
              />
            )}
          </FieldComponent>

          <FieldComponent form={form} label="Status" name="status">
            {(field) => (
              <SelectInput
                field={field}
                options={statuses}
                placeholder="Select status ..."
              />
            )}
          </FieldComponent>

          <FieldComponent form={form} label="Priority" name="priority">
            {(field) => (
              <SelectInput
                field={field}
                options={priorities}
                placeholder="Select priority ..."
              />
            )}
          </FieldComponent>

          <FieldComponent form={form} label="Category" name="category">
            {(field) => (
              <SelectInput
                field={field}
                options={categories}
                placeholder="Select category ..."
              />
            )}
          </FieldComponent>
        </div>
        <div className="card-actions justify-end pt-2">
          <Button type="submit" loading={mutation.isPending}>
            {mode === "edit" ? "Save changes" : "Create task"}
          </Button>
        </div>
      </form>
    </div>
  );
}

export default CreateTaskForm;
