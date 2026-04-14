"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface SkeletonProps {
  className?: string;
}

export function Skeleton({ className }: SkeletonProps) {
  return (
    <motion.div
      className={cn("bg-[var(--muted)] rounded animate-pulse", className)}
      initial={{ opacity: 0.5 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1, repeat: Infinity, ease: "easeInOut" }}
    />
  );
}

export function QuestionCardSkeleton() {
  return (
    <div className="p-4 space-y-3">
      <div className="flex items-center gap-3">
        <Skeleton className="w-10 h-10 rounded-full" />
        <div className="space-y-2">
          <Skeleton className="w-24 h-4 rounded" />
          <Skeleton className="w-16 h-3 rounded" />
        </div>
      </div>
      <Skeleton className="w-full h-16 rounded" />
      <div className="flex gap-4">
        <Skeleton className="w-12 h-6 rounded" />
        <Skeleton className="w-12 h-6 rounded" />
      </div>
    </div>
  );
}

export function ProfileSkeleton() {
  return (
    <div className="space-y-4">
      <div className="flex items-center gap-4">
        <Skeleton className="w-24 h-24 rounded-full" />
        <div className="space-y-2 flex-1">
          <Skeleton className="w-32 h-6 rounded" />
          <Skeleton className="w-24 h-4 rounded" />
        </div>
      </div>
      <Skeleton className="w-full h-20 rounded" />
      <div className="flex gap-8">
        <Skeleton className="w-16 h-8 rounded" />
        <Skeleton className="w-16 h-8 rounded" />
        <Skeleton className="w-16 h-8 rounded" />
      </div>
    </div>
  );
}
