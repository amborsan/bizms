import { createFileRoute } from "@tanstack/react-router";

import SignupPage from "../../pages/login/SignUp";

export const Route = createFileRoute("/_public/signup")({
  component: SignupPage,
});
