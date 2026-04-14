"use client";

import { motion } from "framer-motion";
import { Container, PageWrapper } from "@/components/layout/Container";
import { NotificationItem } from "@/components/features/NotificationItem";
import { Card } from "@/components/ui/Card";
import type { Notification } from "@/types";

const mockNotifications: Notification[] = [
  {
    id: "1",
    user_id: "1",
    type: "new_question",
    data: {
      from_username: "curious_one",
      from_user_id: "2",
    },
    is_read: false,
    created_at: new Date(Date.now() - 1800000).toISOString(),
  },
  {
    id: "2",
    user_id: "1",
    type: "new_like",
    data: {
      from_username: "fan123",
      from_user_id: "3",
      question_id: "1",
    },
    is_read: false,
    created_at: new Date(Date.now() - 3600000).toISOString(),
  },
  {
    id: "3",
    user_id: "1",
    type: "new_answer",
    data: {
      from_username: "question_asker",
      from_user_id: "4",
      question_id: "2",
    },
    is_read: true,
    created_at: new Date(Date.now() - 86400000).toISOString(),
  },
];

export default function NotificationsPage() {
  const unreadCount = mockNotifications.filter(n => !n.is_read).length;

  return (
    <PageWrapper>
      <Container>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-4 py-6"
        >
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-bold text-[var(--foreground)]">
              Notifications
            </h1>
            {unreadCount > 0 && (
              <span className="px-3 py-1 bg-[var(--primary)] text-[var(--button-text)] text-sm rounded-full">
                {unreadCount} new
              </span>
            )}
          </div>

          <Card>
            <div className="divide-y divide-[var(--border)]">
              {mockNotifications.length > 0 ? (
                mockNotifications.map((notification, index) => (
                  <motion.div
                    key={notification.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.05 }}
                  >
                    <NotificationItem notification={notification} />
                  </motion.div>
                ))
              ) : (
                <div className="p-8 text-center text-[var(--accent)]">
                  No notifications yet
                </div>
              )}
            </div>
          </Card>
        </motion.div>
      </Container>
    </PageWrapper>
  );
}
