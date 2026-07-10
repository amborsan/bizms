export type Task = {
  category: string;
  createdat: string;
  description: string;
  id: string;
  priority: string;
  status: string;
  title: string;
};

export type TaskFormValues = Omit<Task, "id">;
