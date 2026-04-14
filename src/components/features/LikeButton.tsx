"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { HeartIcon } from "@/components/icons";

interface LikeButtonProps {
  likesCount: number;
  isLiked: boolean;
  onClick: () => void;
  className?: string;
}

export function LikeButton({ likesCount, isLiked, onClick, className }: LikeButtonProps) {
  const [isAnimating, setIsAnimating] = useState(false);

  const handleClick = () => {
    setIsAnimating(true);
    onClick();
    setTimeout(() => setIsAnimating(false), 500);
  };

  return (
    <motion.button
      className={cn(
        "flex items-center gap-1 text-sm transition-colors",
        isLiked ? "text-red-500" : "text-[var(--accent)] hover:text-red-500",
        className
      )}
      onClick={handleClick}
      whileTap={{ scale: 0.9 }}
      animate={isAnimating ? { scale: [1, 1.3, 1] } : {}}
      transition={{ duration: 0.3 }}
    >
      <HeartIcon size={18} filled={isLiked} />
      <span>{likesCount + (isLiked ? 1 : 0)}</span>
    </motion.button>
  );
}
