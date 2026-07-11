import { motion } from "framer-motion";
import type { HTMLMotionProps } from "framer-motion";

type ButtonVariant = "primary" | "secondary" | "outline";
type ButtonSize = "sm" | "md" | "lg";

interface ButtonProps extends HTMLMotionProps<"button"> {
  children: React.ReactNode;
  variant?: ButtonVariant;
  size?: ButtonSize;
  loading?: boolean;
}

export default function Button({
  children,
  variant = "primary",
  size = "md",
  loading = false,
  className = "",
  disabled,
  ...props
}: ButtonProps) {
  return (
    <motion.button
      whileHover={{ scale: 1.04 }}
      whileTap={{ scale: 0.96 }}
      disabled={disabled || loading}
      className={`btn btn-${variant} btn-${size} ${className}`}
      {...props}
    >
      {loading && <span className="loading loading-spinner loading-sm"></span>}
      {children}
    </motion.button>
  );
}
