"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface StatsDisplayProps {
  questions: number;
  answers: number;
  likes: number;
}

export function StatsDisplay({ questions, answers, likes }: StatsDisplayProps) {
  const stats = [
    { label: "Questions", value: questions },
    { label: "Answers", value: answers },
    { label: "Likes", value: likes },
  ];

  return (
    <div className="flex justify-center sm:justify-start gap-8">
      {stats.map((stat, index) => (
        <motion.div
          key={stat.label}
          className="text-center"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.1 }}
        >
          <div className="text-xl font-bold text-[var(--foreground)]">
            {stat.value}
          </div>
          <div className="text-sm text-[var(--accent)]">{stat.label}</div>
        </motion.div>
      ))}
    </div>
  );
}
