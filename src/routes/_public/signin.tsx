import { createFileRoute } from "@tanstack/react-router";
import SigninPage from "../../pages/Login";

export const Route = createFileRoute("/_public/signin")({
  component: SigninPage,
});
