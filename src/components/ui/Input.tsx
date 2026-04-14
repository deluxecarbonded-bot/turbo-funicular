"use client";

import { forwardRef } from "react";
import { cn } from "@/lib/utils";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
}

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ className, label, type = "text", ...props }, ref) => {
    return (
      <div className="space-y-1.5">
        {label && <label className="text-sm font-medium">{label}</label>}
        <input
          type={type}
          ref={ref}
          className={cn(
            "w-full rounded-lg bg-[var(--input)] border border-[var(--border)] px-4 py-2.5 text-sm",
            "focus:border-[var(--accent)] focus:ring-2 focus:ring-[var(--muted)] transition-all",
            className
          )}
          {...props}
        />
      </div>
    );
  }
);

Input.displayName = "Input";
export { Input };