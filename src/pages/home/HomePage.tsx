import { useAuth } from "@clerk/react";
import { Link, useNavigate } from "@tanstack/react-router";
import Grainient from "../../components/backgrounds/Grainient";
import Button from "../../components/atoms/Button/Button";

const highlights = [
  {
    title: "Track work",
    description:
      "Review tasks, ownership, and progress from a single workspace.",
  },
  {
    title: "Manage teams",
    description:
      "Keep employee records, contact details, and department data aligned.",
  },
  {
    title: "Handle customers",
    description:
      "Store customer profiles, details, and records in one organized place.",
  },
] as const;

const quickLinks = [
  { label: "Browse tasks", to: "/tasks" },
  { label: "View employees", to: "/employees" },
  { label: "Review customers", to: "/customers" },
] as const;

function HomePage() {
  const { isSignedIn } = useAuth();
  const navigate = useNavigate();

  return (
    <div className="relative overflow-hidden rounded-4xl border border-base-300 bg-base-100 p-6 shadow-sm sm:p-10 lg:p-14">
      <div className="absolute inset-0">
        <Grainient
          color1="#ac9fff"
          color2="#000000"
          color3="#B497CF"
          timeSpeed={0.75}
          colorBalance={-0.1}
          warpStrength={1}
          warpFrequency={5}
          warpSpeed={2}
          warpAmplitude={50}
          blendAngle={0}
          blendSoftness={0.05}
          rotationAmount={500}
          noiseScale={2}
          grainAmount={0.1}
          grainScale={2}
          grainAnimated={false}
          contrast={1.5}
          gamma={1}
          saturation={1}
          centerX={0}
          centerY={0}
          zoom={0.9}
        />
      </div>
      <div className="absolute inset-0 bg-base-100/80 backdrop-blur-[1px]" />
      <div className="absolute -right-28 top-12 h-72 w-72 rounded-full bg-primary/10 blur-3xl" />
      <div className="absolute -bottom-24 left-10 h-80 w-80 rounded-full bg-secondary/10 blur-3xl" />

      <div className="relative space-y-12">
        <section className="grid gap-10 lg:grid-cols-[1.3fr_0.9fr] lg:items-center">
          <div className="space-y-6">
            <div className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/10 px-4 py-2 text-xs font-semibold uppercase tracking-[0.15em] text-primary">
              Business management system
            </div>

            <div className="space-y-4">
              <h1 className="max-w-3xl text-4xl font-black leading-tight text-base-content sm:text-5xl lg:text-6xl uppercase">
                Manage tasks, teams, and customers.
              </h1>
              <p className="max-w-2xl text-base leading-7 text-base-content/70 sm:text-lg">
                A focused workspace for daily operations.
              </p>
            </div>

            <div className="flex flex-wrap gap-3">
              {isSignedIn ? (
                <>
                  <Button onClick={() => void navigate({ to: "/dashboard" })}>
                    Open dashboard
                  </Button>
                  <Button
                    variant="outline"
                    onClick={() => void navigate({ to: "/tasks" })}
                  >
                    Go to tasks
                  </Button>
                </>
              ) : (
                <>
                  <Link to="/signin" className="btn btn-primary">
                    Sign in
                  </Link>
                  <Link to="/signup" className="btn btn-outline">
                    Create account
                  </Link>
                </>
              )}
            </div>
          </div>

          <div className="grid gap-4 rounded-3xl border border-base-300 bg-base-200 p-5 shadow-inner sm:grid-cols-2 lg:grid-cols-1">
            <div className="rounded-2xl bg-base-100 p-5 shadow-sm">
              <p className="text-xs font-semibold uppercase tracking-wide text-primary">
                Overview
              </p>
              <p className="mt-2 text-3xl font-bold text-base-content">3</p>
              <p className="mt-1 text-sm text-base-content/70">
                Core management modules ready to use.
              </p>
            </div>
            <div className="rounded-2xl bg-base-100 p-5 shadow-sm">
              <p className="text-xs font-semibold uppercase tracking-wide text-primary">
                Access
              </p>
              <p className="mt-2 text-3xl font-bold text-base-content">
                {isSignedIn ? "Live" : "Guest"}
              </p>
              <p className="mt-1 text-sm text-base-content/70">
                Clerk-powered authentication and role-based controls.
              </p>
            </div>
            <div className="rounded-2xl bg-base-100 p-5 shadow-sm sm:col-span-2 lg:col-span-1">
              <p className="text-xs font-semibold uppercase tracking-wide text-primary">
                Fast navigation
              </p>
              <div className="mt-4 grid grid-cols-2 gap-2">
                {quickLinks.map((item) => (
                  <Link
                    key={item.to}
                    to={item.to}
                    className="rounded-xl border border-base-300 bg-base-200 px-3 py-2 text-sm font-medium text-base-content/80 transition hover:bg-primary/10 hover:text-primary"
                  >
                    {item.label}
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="grid gap-4 md:grid-cols-3">
          {highlights.map((item) => (
            <article
              key={item.title}
              className="rounded-2xl border border-base-300 bg-base-100 p-6 shadow-sm"
            >
              <div className="mb-4 h-1.5 w-14 rounded-full bg-primary" />
              <h2 className="text-lg font-semibold text-base-content">
                {item.title}
              </h2>
              <p className="mt-2 text-sm leading-6 text-base-content/70">
                {item.description}
              </p>
            </article>
          ))}
        </section>
      </div>
    </div>
  );
}

export default HomePage;
