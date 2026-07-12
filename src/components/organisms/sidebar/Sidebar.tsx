import { useState } from "react"; // Added useState
import { SignInButton, UserButton, useAuth, useUser } from "@clerk/react";
import { Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import Grainient from "../../backgrounds/Grainient";
import { useTheme } from "../../../context/ThemeContext";
import Button from "../../atoms/button/Button";

const coreNavigationItems = [
  { label: "Home", to: "/" },
  { label: "Tasks", to: "/tasks" },
  { label: "Employees", to: "/employees" },
  { label: "Customers", to: "/customers" },
  { label: "About us", to: "/about" },
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

  // 1. State to manage mobile menu
  const [isOpen, setIsOpen] = useState(false);

  // 2. Helper to close the menu on link click
  const closeMenu = () => setIsOpen(false);

  return (
    <>
      {/* 3. Floating Hamburger Button for Mobile */}
      <button
        onClick={() => setIsOpen(true)}
        className="fixed left-4 top-4 z-40 rounded-lg bg-base-100 p-2 shadow-md md:hidden text-base-content"
        aria-label="Open Menu"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="h-6 w-6"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
          />
        </svg>
      </button>

      {/* 4. Mobile Overlay Background */}
      {isOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm md:hidden transition-opacity"
          onClick={closeMenu}
        />
      )}

      {/* 5. Responsive Sidebar Classes */}
      <motion.aside
        initial={{ x: -80 }}
        animate={{ x: 0 }}
        transition={{ duration: 0.4 }}
        className={`fixed inset-y-0 left-0 z-50 flex h-screen w-72 shrink-0 flex-col overflow-hidden border-r border-base-300 bg-base-100 px-5 py-6 text-base-content transition-transform duration-300 ease-in-out md:sticky md:top-0 md:translate-x-0 ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="absolute inset-0">
          <Grainient
            color1="#ac9fff"
            color2="#000000"
            color3="#B497CF"
            timeSpeed={0.65}
            colorBalance={-0.44}
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
            zoom={2}
          />
        </div>
        <div className="absolute inset-0 bg-base-100/82 backdrop-blur-[1px]" />

        <div className="relative mb-8 shrink-0 flex items-center justify-between">
          <div className="mt-2 flex items-center gap-3">
            <img
              src="/logo.svg"
              alt="BMS logo"
              className={`h-10 w-10 shrink-0 object-contain ${
                theme === "dark" ? "invert" : ""
              }`}
            />
            <h1 className="text-2xl font-bold text-base-content">BMS</h1>
          </div>

          {/* Mobile Close Button (X) */}
          <button
            onClick={closeMenu}
            className="md:hidden text-base-content p-2"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>

        <nav className="relative min-h-0 flex-1 space-y-2 overflow-y-auto pr-1">
          {coreNavigationItems.map((item) => (
            <Link
              key={item.to}
              to={item.to}
              activeProps={{ className: "bg-primary/10 text-primary" }}
              className={navItemClassName}
              activeOptions={{ exact: true }}
              onClick={closeMenu} // Closes menu when clicked
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
              onClick={closeMenu} // Closes menu when clicked
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
                onClick={closeMenu} // Closes menu when clicked
              >
                Sign up
              </Link>
              <Link
                to="/signin"
                className={navItemClassName}
                activeProps={{ className: "bg-primary/10 text-primary" }}
                activeOptions={{ exact: true }}
                onClick={closeMenu} // Closes menu when clicked
              >
                Sign in
              </Link>
            </div>
          )}
        </nav>

        <div className="relative mt-6 shrink-0 border-t border-base-300 pt-5">
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
                <p className="text-sm font-medium text-base-content">
                  Signed in
                </p>
              </div>
              <UserButton />
            </div>
          ) : (
            <SignInButton mode="modal" forceRedirectUrl="/">
              <Button className="w-full" onClick={closeMenu}>
                Sign in
              </Button>
            </SignInButton>
          )}
        </div>
      </motion.aside>
    </>
  );
}
