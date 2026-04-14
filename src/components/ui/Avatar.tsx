"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface AvatarProps {
  src?: string | null;
  alt?: string;
  size?: "sm" | "md" | "lg" | "xl";
  className?: string;
}

const sizeClasses = {
  sm: "w-8 h-8 text-xs",
  md: "w-10 h-10 text-sm",
  lg: "w-14 h-14 text-base",
  xl: "w-24 h-24 text-xl",
};

const initialsSizeClasses = {
  sm: "text-xs",
  md: "text-sm",
  lg: "text-base",
  xl: "text-xl",
};

export function Avatar({ src, alt, size = "md", className }: AvatarProps) {
  const initials = alt?.charAt(0).toUpperCase() || "?";

  return (
    <div
      className={cn(
        "relative rounded-full overflow-hidden flex items-center justify-center bg-[var(--muted)] text-[var(--foreground)] font-medium",
        sizeClasses[size],
        className
      )}
    >
      {src ? (
        <motion.img
          src={src}
          alt={alt}
          className="w-full h-full object-cover"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.2 }}
        />
      ) : (
        <motion.span
          className={cn("font-semibold", initialsSizeClasses[size])}
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: "spring", stiffness: 500, damping: 30 }}
        >
          {initials}
        </motion.span>
      )}
    </div>
  );
}
