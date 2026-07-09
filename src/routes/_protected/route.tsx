import { createFileRoute, redirect } from "@tanstack/react-router";

import DashboardLayout from "../../layouts/DashboardLayout";

export const Route = createFileRoute("/_protected")({
  /*   beforeLoad: ({ context }) => {
    if (!context.auth.isSignedIn) {
      throw redirect({
        to: routes.login,
      });
    }
  }, */
  component: DashboardLayout,
});
