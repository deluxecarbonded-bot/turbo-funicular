"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { HomeIcon, NotificationsIcon, SettingsIcon, ProfileIcon, AskIcon } from "@/components/icons";
import { Avatar } from "@/components/ui/Avatar";

interface MobileNavProps {
  currentUser?: {
    username: string;
    avatar_url: string | null;
  } | null;
}

const navItems = [
  { href: "/", icon: HomeIcon, label: "Home" },
  { href: "/notifications", icon: NotificationsIcon, label: "Notifications" },
  { href: "/settings", icon: SettingsIcon, label: "Settings" },
];

export function MobileNav({ currentUser }: MobileNavProps) {
  const pathname = usePathname();

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-40 bg-[var(--background)]/80 backdrop-blur-md border-t border-[var(--border)] lg:hidden">
      <div className="flex items-center justify-around h-16 px-4">
        {currentUser ? (
          <>
            {navItems.map((item) => (
              <Link key={item.href} href={item.href}>
                <motion.div
                  className={cn(
                    "p-3 rounded-full transition-colors",
                    pathname === item.href
                      ? "bg-[var(--muted)]"
                      : "hover:bg-[var(--muted)]"
                  )}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <item.icon size={22} />
                </motion.div>
              </Link>
            ))}
            <Link href={`/${currentUser.username}`}>
              <motion.div
                className={cn(
                  "p-1 rounded-full transition-colors",
                  pathname === `/${currentUser.username}`
                    ? "bg-[var(--muted)]"
                    : "hover:bg-[var(--muted)]"
                )}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                <Avatar src={currentUser.avatar_url} alt={currentUser.username} size="sm" />
              </motion.div>
            </Link>
          </>
        ) : (
          <Link href="/login">
            <motion.div
              className="px-4 py-2 bg-[var(--button-bg)] text-[var(--button-text)] rounded-md text-sm font-medium"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              Sign In
            </motion.div>
          </Link>
        )}
      </div>
    </nav>
  );
}
