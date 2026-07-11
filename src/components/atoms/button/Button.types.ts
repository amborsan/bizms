import type { HTMLMotionProps } from "framer-motion";
import type { ReactNode } from "react";

export interface ButtonProps extends HTMLMotionProps<"button"> {
  children: ReactNode;

  variant?:
    "primary" | "secondary" | "accent" | "success" | "warning" | "error";

  size?: "sm" | "md" | "lg";

  loading?: boolean;
}
