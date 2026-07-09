import { api } from "./axios";

export async function fetchTasks() {
  const response = await api.get("/tasks");
  const tasks = response.data.tasks;
  return tasks;
}
