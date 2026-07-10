import { createFileRoute } from "@tanstack/react-router";
import EditTaskPage from "../../pages/tasks/EditTaskPage";

export const Route = createFileRoute("/_public/tasks/$taskId/edit")({
  component: EditTaskPage,
});
