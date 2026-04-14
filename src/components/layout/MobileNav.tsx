"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import { HomeIcon, NotificationsIcon, SettingsIcon, ProfileIcon, AskIcon, SendIcon } from "@/components/icons";
import { useAuth } from "@/contexts/AuthContext";

export function MobileNav() {
  const pathname = usePathname();
  const { user } = useAuth();
  const [fabOpen, setFabOpen] = useState(false);

  const navItems = [
    { href: "/", icon: HomeIcon, label: "Home" },
    { href: "/notifications", icon: NotificationsIcon, label: "Notifications" },
    { href: "/settings", icon: SettingsIcon, label: "Settings" },
  ];

  return (
    <>
      <nav className="fixed bottom-4 left-4 right-4 z-50 lg:hidden">
        <div className="flex items-center justify-between h-14 px-4 bg-[var(--background)]/90 backdrop-blur-xl rounded-2xl border border-[var(--border)] shadow-lg">
          {user ? (
            <>
              <div className="flex items-center gap-1">
                {navItems.map((item) => (
                  <Link key={item.href} href={item.href}>
                    <motion.div
                      className={cn(
                        "p-3 rounded-xl transition-colors",
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
              </div>
              <Link href={user ? `/${user.email?.split('@')[0]}` : "/login"}>
                <motion.div
                  className={cn(
                    "p-1.5 rounded-xl transition-colors",
                    pathname === `/${user?.email?.split('@')[0]}`
                      ? "bg-[var(--muted)]"
                      : "hover:bg-[var(--muted)]"
                  )}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <ProfileIcon size={22} />
                </motion.div>
              </Link>
            </>
          ) : (
            <Link href="/login" className="w-full">
              <motion.div
                className="flex items-center justify-center gap-2 w-full px-4 py-2.5 bg-[var(--button-bg)] text-[var(--button-text)] rounded-xl font-medium"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <span>Sign In</span>
              </motion.div>
            </Link>
          )}
        </div>
      </nav>

      <AnimatePresence>
        {fabOpen && user && (
          <motion.div
            className="fixed inset-0 z-40 lg:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setFabOpen(false)}
          >
            <div className="absolute bottom-24 right-4 space-y-2">
              <Link href={`/ask/${user.email?.split('@')[0]}`} onClick={() => setFabOpen(false)}>
                <motion.div
                  className="flex items-center gap-3 px-4 py-3 bg-[var(--button-bg)] text-[var(--button-text)] rounded-xl shadow-lg"
                  initial={{ scale: 0, x: 20 }}
                  animate={{ scale: 1, x: 0 }}
                  exit={{ scale: 0, x: 20 }}
                >
                  <AskIcon size={20} />
                  <span className="font-medium">Ask Me</span>
                </motion.div>
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {user && (
        <motion.button
          className="fixed bottom-20 right-4 z-50 lg:hidden w-14 h-14 bg-[var(--primary)] rounded-full flex items-center justify-center shadow-lg"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={() => setFabOpen(!fabOpen)}
        >
          <SendIcon size={24} className="text-[var(--button-text)]" />
        </motion.button>
      )}
    </>
  );
}