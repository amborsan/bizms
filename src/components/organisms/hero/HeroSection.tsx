import { motion } from "framer-motion";
import { Link } from "@tanstack/react-router";

export default function HeroSection() {
  return (
    <section className="relative overflow-hidden bg-base-100 py-16 sm:py-24 lg:py-32 rounded-2xl mb-2.5">
      {/* Background Glow Effects */}
      <div className="absolute -top-24 -left-24 h-96 w-96 rounded-full bg-primary/10 blur-[100px]" />
      <div className="absolute bottom-0 right-0 h-96 w-96 rounded-full bg-secondary/10 blur-[100px]" />

      <div className="relative mx-auto max-w-7xl px-6 lg:px-8 flex flex-col lg:flex-row items-center gap-16">
        {/* Left Side: Text Content */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="max-w-2xl lg:w-1/2"
        >
          <div className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/10 px-4 py-2 text-xs font-semibold uppercase tracking-[0.15em] text-primary mb-6">
            Meet BizMS
          </div>

          <h1 className="text-4xl font-black tracking-tight text-base-content sm:text-6xl mb-6">
            Stop scattering your workflow. <br className="hidden lg:block" />
            <span className="text-primary text-balance">
              Unify your business.
            </span>
          </h1>

          <p className="mt-6 text-lg leading-8 text-base-content/70 mb-8 max-w-xl">
            Manage tasks, track employees, and serve customers—all in one
            centralized dashboard. Reclaim your team's lost time and leave the
            messy spreadsheets behind.
          </p>

          <div className="flex flex-wrap items-center gap-4">
            <Link
              to="/signup"
              className="btn btn-primary btn-lg shadow-lg shadow-primary/30 rounded-xl"
            >
              Get Started for Free
            </Link>
            <Link
              to="/about"
              className="btn btn-ghost btn-lg text-base-content rounded-xl"
            >
              See how it works <span aria-hidden="true">→</span>
            </Link>
          </div>
        </motion.div>

        {/* Right Side: Image/Mockup */}
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}
          className="lg:w-1/2 w-full relative"
        >
          {/* Browser Window Mockup Wrapper */}
          <div className="relative rounded-2xl bg-base-300 p-2 shadow-2xl ring-1 ring-base-content/10">
            {/* Fake Browser Dots */}
            <div className="flex gap-2 mb-3 px-2 pt-2">
              <div className="w-3 h-3 rounded-full bg-error/80"></div>
              <div className="w-3 h-3 rounded-full bg-warning/80"></div>
              <div className="w-3 h-3 rounded-full bg-success/80"></div>
            </div>

            {/* Dashboard Image */}
            <img
              src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=2070&auto=format&fit=crop"
              alt="BizMS Dashboard Preview showing data and analytics"
              className="rounded-xl w-full h-[300px] sm:h-[400px] object-cover shadow-sm border border-base-200"
            />

            {/* Floating "System Optimized" Badge */}
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.8, duration: 0.5 }}
              className="absolute -bottom-6 -left-6 bg-base-100 p-4 rounded-2xl shadow-xl border border-base-300 hidden sm:block"
            >
              <div className="flex items-center gap-3">
                <div className="bg-success/20 p-3 rounded-full">
                  <svg
                    className="w-6 h-6 text-success"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2.5}
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                </div>
                <div>
                  <p className="text-sm font-bold text-base-content">
                    System Optimized
                  </p>
                  <p className="text-xs font-medium text-base-content/60">
                    Ready for operations
                  </p>
                </div>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
