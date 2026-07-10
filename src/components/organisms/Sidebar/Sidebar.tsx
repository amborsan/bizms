import { SignInButton, UserButton, useAuth, useUser } from "@clerk/react";
import { Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { useTheme } from "../../../context/ThemeContext";

const coreNavigationItems = [
  { label: "Home", to: "/" },
  { label: "Tasks", to: "/tasks" },
  { label: "Employees", to: "/employees" },
  { label: "Customers", to: "/customers" },
] as const;

const navItemClassName =
  "flex w-full items-center rounded-lg px-4 py-3 text-sm font-medium text-base-content/80 transition hover:bg-base-200 hover:text-base-content";

export default function Sidebar() {
  const { isSignedIn } = useAuth();
  const { user } = useUser();
  const { theme, toggleTheme } = useTheme();
  const isAdmin = user?.publicMetadata?.role === "admin";
  const showDashboard = isSignedIn || isAdmin;
  const showGuestAuthLinks = !isSignedIn;

  return (
    <motion.aside
      initial={{ x: -80 }}
      animate={{ x: 0 }}
      transition={{ duration: 0.4 }}
      className="sticky top-0 flex h-screen w-72 shrink-0 flex-col border-r border-base-300 bg-base-100 px-5 py-6 text-base-content"
    >
      <div className="mb-8 shrink-0">
        <p className="text-xs font-semibold uppercase tracking-[0.3em] text-primary">
          Business
        </p>
        <h1 className="mt-2 text-2xl font-bold text-base-content">BMS</h1>
        <p className="mt-2 text-sm leading-6 text-base-content/70">
          Business management system navigation.
        </p>
      </div>

      <nav className="min-h-0 flex-1 space-y-2 overflow-y-auto pr-1">
        {coreNavigationItems.map((item) => (
          <Link
            key={item.to}
            to={item.to}
            activeProps={{ className: "bg-primary/10 text-primary" }}
            className={navItemClassName}
            activeOptions={{ exact: true }}
          >
            {item.label}
          </Link>
        ))}

        {showDashboard && (
          <Link
            to="/dashboard"
            activeProps={{ className: "bg-primary/10 text-primary" }}
            className={navItemClassName}
            activeOptions={{ exact: true }}
          >
            Dashboard
          </Link>
        )}

        {showGuestAuthLinks && (
          <div className="space-y-2 pt-2">
            <Link
              to="/signup"
              className={navItemClassName}
              activeProps={{ className: "bg-primary/10 text-primary" }}
              activeOptions={{ exact: true }}
            >
              Sign up
            </Link>
            <Link
              to="/signin"
              className={navItemClassName}
              activeProps={{ className: "bg-primary/10 text-primary" }}
              activeOptions={{ exact: true }}
            >
              Sign in
            </Link>
          </div>
        )}
      </nav>

      <div className="mt-6 shrink-0 border-t border-base-300 pt-5">
        <div className="mb-4 flex items-center justify-between rounded-xl bg-base-200 px-4 py-3">
          <div>
            <p className="text-xs font-semibold uppercase tracking-wide text-base-content/60">
              Theme
            </p>
            <p className="text-sm font-medium text-base-content">
              {theme === "dark" ? "Dark" : "Light"}
            </p>
          </div>
          <label className="flex cursor-pointer items-center gap-3">
            <span className="text-xs font-medium text-base-content/60">
              Light
            </span>
            <input
              type="checkbox"
              className="toggle toggle-primary"
              checked={theme === "dark"}
              onChange={toggleTheme}
            />
            <span className="text-xs font-medium text-base-content/60">
              Dark
            </span>
          </label>
        </div>

        {isSignedIn ? (
          <div className="flex items-center justify-between gap-3 rounded-xl bg-base-200 px-4 py-3">
            <div>
              <p className="text-xs font-semibold uppercase tracking-wide text-base-content/60">
                Account
              </p>
              <p className="text-sm font-medium text-base-content">Signed in</p>
            </div>
            <UserButton />
          </div>
        ) : (
          <SignInButton mode="modal" forceRedirectUrl="/">
            <button className="btn btn-primary w-full">Sign in</button>
          </SignInButton>
        )}
      </div>
    </motion.aside>
  );
}
