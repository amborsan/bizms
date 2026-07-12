import { createFileRoute } from "@tanstack/react-router";
import AboutPage from "../../pages/about/AboutPage";

export const Route = createFileRoute("/_public/about")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <>
      <AboutPage />
    </>
  );
}
