"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/Button";
import { UserPlusIcon, CheckIcon } from "@/components/icons";

interface FollowButtonProps {
  isFollowing: boolean;
  onClick: () => void;
  className?: string;
}

export function FollowButton({ isFollowing, onClick, className }: FollowButtonProps) {
  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      className={className}
    >
      <Button
        variant={isFollowing ? "secondary" : "primary"}
        size="sm"
        onClick={onClick}
      >
        {isFollowing ? (
          <>
            <CheckIcon size={16} />
            Following
          </>
        ) : (
          <>
            <UserPlusIcon size={16} />
            Follow
          </>
        )}
      </Button>
    </motion.div>
  );
}
