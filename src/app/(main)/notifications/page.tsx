"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { NotificationItem } from "@/components/features/NotificationItem";
import { Card } from "@/components/ui/Card";
import { supabase } from "@/lib/supabase";
import { useAuth } from "@/contexts/AuthContext";
import type { Notification } from "@/types";
import { Skeleton } from "@/components/ui/Skeleton";

export default function NotificationsPage() {
  const router = useRouter();
  const { user } = useAuth();
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchNotifications() {
      if (!user) {
        router.push("/login");
        return;
      }

      const { data } = await supabase
        .from("notifications")
        .select("*")
        .eq("user_id", user.id)
        .order("created_at", { ascending: false });

      setNotifications(data || []);
      setLoading(false);
    }

    fetchNotifications();
  }, [user, router]);

  const unreadCount = notifications.filter(n => !n.is_read).length;

  const handleMarkAsRead = async (id: string) => {
    await supabase
      .from("notifications")
      .update({ is_read: true })
      .eq("id", id);

    setNotifications(prev => 
      prev.map(n => n.id === id ? { ...n, is_read: true } : n)
    );
  };

  if (loading) {
    return (
      <div className="space-y-4">
        <Skeleton className="h-10 w-40" />
        <Skeleton className="h-24" />
        <Skeleton className="h-24" />
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-4"
    >
      <div className="flex items-center justify-between">
        <h1 className="text-xl sm:text-2xl font-bold text-[var(--foreground)]">
          Notifications
        </h1>
        {unreadCount > 0 && (
          <span className="px-3 py-1 bg-[var(--foreground)] text-[var(--background)] text-sm rounded-full font-medium">
            {unreadCount} new
          </span>
        )}
      </div>

      <Card>
        <div className="divide-y divide-[var(--border)]">
          {notifications.length > 0 ? (
            notifications.map((notification, index) => (
              <motion.div
                key={notification.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.05 }}
              >
                <NotificationItem 
                  notification={notification} 
                  onMarkAsRead={handleMarkAsRead}
                />
              </motion.div>
            ))
          ) : (
            <div className="p-6 sm:p-8 text-center text-[var(--accent)]">
              No notifications yet
            </div>
          )}
        </div>
      </Card>
    </motion.div>
  );
}