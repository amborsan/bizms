import { createFileRoute, redirect } from "@tanstack/react-router";
import CreateTaskPage from "../../pages/tasks/CreateTaskPage";

export const Route = createFileRoute("/_public/create-task")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <>
      <CreateTaskPage />
    </>
  );
}
