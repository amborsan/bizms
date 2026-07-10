import { createFileRoute } from "@tanstack/react-router";
import TaskDetailsPage from "../../pages/tasks/TaskDetailsPage";

export const Route = createFileRoute("/_public/tasks/$taskId")({
  component: TaskDetailsPage,
});
