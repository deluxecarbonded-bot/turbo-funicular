"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface ToggleProps {
  checked: boolean;
  onChange: (checked: boolean) => void;
  label?: string;
  disabled?: boolean;
  className?: string;
}

export function Toggle({ checked, onChange, label, disabled, className }: ToggleProps) {
  return (
    <label className={cn("flex items-center gap-3 cursor-pointer", className)}>
      <div className="relative">
        <input
          type="checkbox"
          checked={checked}
          onChange={(e) => onChange(e.target.checked)}
          disabled={disabled}
          className="sr-only"
        />
        <motion.div
          className={cn(
            "w-11 h-6 rounded-full transition-colors duration-200",
            checked ? "bg-[var(--primary)]" : "bg-[var(--muted)]"
          )}
          animate={checked ? { scale: 1.05 } : { scale: 1 }}
        >
          <motion.div
            className="absolute top-0.5 left-0.5 w-5 h-5 rounded-full bg-[var(--button-text)] shadow"
            animate={{ x: checked ? 20 : 0 }}
            transition={{ type: "spring", stiffness: 500, damping: 30 }}
          />
        </motion.div>
      </div>
      {label && (
        <span className="text-sm text-[var(--foreground)]">{label}</span>
      )}
    </label>
  );
}
