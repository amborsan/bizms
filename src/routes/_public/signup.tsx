import { createFileRoute } from "@tanstack/react-router";

import SignupPage from "../../pages/Login/SignUp";

export const Route = createFileRoute("/_public/signup")({
  component: SignupPage,
});
