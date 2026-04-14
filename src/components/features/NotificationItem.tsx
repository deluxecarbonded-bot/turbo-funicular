"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { cn, formatTimeAgo } from "@/lib/utils";
import { Avatar } from "@/components/ui/Avatar";
import { HeartIcon, AskIcon } from "@/components/icons";
import type { Notification } from "@/types";

interface NotificationItemProps {
  notification: Notification;
  onClick?: () => void;
  onMarkAsRead?: (id: string) => void;
}

const notificationIcons = {
  new_question: AskIcon,
  new_answer: AskIcon,
  new_like: HeartIcon,
  new_follower: AskIcon,
};

const notificationMessages = {
  new_question: "sent you a question",
  new_answer: "answered your question",
  new_like: "liked your question",
  new_follower: "started following you",
};

export function NotificationItem({ notification, onClick, onMarkAsRead }: NotificationItemProps) {
  const Icon = notificationIcons[notification.type] || AskIcon;
  const message = notificationMessages[notification.type] || "";

  const handleClick = () => {
    if (!notification.is_read && onMarkAsRead) {
      onMarkAsRead(notification.id);
    }
    if (onClick) onClick();
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      whileHover={{ backgroundColor: "var(--muted)" }}
      className={cn(
        "flex items-start gap-3 p-4 transition-colors cursor-pointer",
        !notification.is_read && "bg-[var(--muted)]/50"
      )}
      onClick={handleClick}
    >
      <Avatar
        src={null}
        alt={notification.data.from_username || "?"}
        size="md"
      />
      
      <div className="flex-1 min-w-0">
        <p className="text-[var(--foreground)]">
          <span className="font-medium">
            {notification.data.from_username || "Someone"}
          </span>{" "}
          {message}
        </p>
        <span className="text-sm text-[var(--accent)]">
          {formatTimeAgo(notification.created_at)}
        </span>
      </div>
      
      <div className="p-2">
        <Icon size={16} />
      </div>
    </motion.div>
  );
}
