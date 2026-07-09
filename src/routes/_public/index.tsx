import { createFileRoute, Link } from "@tanstack/react-router";

export const Route = createFileRoute("/_public/")({
  component: HomePage,
});

function HomePage() {
  return (
    <section className="mx-auto flex min-h-screen w-full max-w-5xl flex-col justify-center px-6 py-16">
      <div className="max-w-2xl space-y-6">
        <p className="text-sm font-semibold uppercase tracking-wide text-primary">
          Business Management System
        </p>

        <h1 className="text-5xl font-bold leading-tight text-base-content">
          Manage employees, products, sales, and reports in one place.
        </h1>

        <p className="text-lg text-base-content/70">
          Sign in to open your workspace, or create an account to get started.
        </p>

        <div className="flex flex-wrap gap-3">
          <Link to="/login" className="btn btn-primary">
            Sign in
          </Link>

          <Link to="/signup" className="btn btn-outline">
            Sign up
          </Link>
        </div>
      </div>
    </section>
  );
}
