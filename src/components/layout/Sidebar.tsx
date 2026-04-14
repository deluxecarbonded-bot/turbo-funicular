"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { Logo, HomeIcon, AskIcon, ProfileIcon, NotificationsIcon, SettingsIcon, SearchIcon, MoonIcon, SunIcon } from "@/components/icons";
import { Avatar } from "@/components/ui/Avatar";
import { useAuth } from "@/contexts/AuthContext";
import { useTheme } from "@/hooks/useTheme";

export function Sidebar() {
  const pathname = usePathname();
  const { user } = useAuth();
  const { isDarkMode, toggleTheme } = useTheme();

  const navItems = [
    { href: "/", icon: HomeIcon, label: "Home" },
    { href: "/notifications", icon: NotificationsIcon, label: "Notifications", badge: true },
    { href: "/settings", icon: SettingsIcon, label: "Settings" },
  ];

  return (
    <aside className="fixed left-0 top-0 bottom-0 w-72 bg-[var(--background)] hidden lg:flex flex-col border-r border-[var(--border)]">
      <div className="p-6">
        <Link href="/">
          <motion.div
            className="flex items-center gap-3"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <div className="w-10 h-10 rounded-xl bg-[var(--foreground)] flex items-center justify-center">
              <AskIcon size={22} className="text-[var(--background)]" />
            </div>
            <span className="text-2xl font-bold">Exotic</span>
          </motion.div>
        </Link>
      </div>

      <div className="px-4 pb-4">
        <motion.button
          className="w-full flex items-center gap-3 px-4 py-3 rounded-xl bg-[var(--muted)] text-[var(--accent)]"
          whileHover={{ scale: 1.01 }}
          whileTap={{ scale: 0.99 }}
        >
          <SearchIcon size={20} />
          <span>Search</span>
          <kbd className="ml-auto text-xs px-2 py-0.5 rounded bg-[var(--card)]">⌘K</kbd>
        </motion.button>
      </div>

      <nav className="flex-1 px-3 space-y-1">
        <div className="text-xs font-medium text-[var(--accent)] uppercase tracking-wider px-3 py-2">Menu</div>
        {navItems.map((item) => (
          <Link key={item.href} href={item.href}>
            <motion.div
              className={cn(
                "relative flex items-center gap-3 px-4 py-3 rounded-xl transition-colors",
                pathname === item.href
                  ? "bg-[var(--muted)] font-medium"
                  : "hover:bg-[var(--muted)]"
              )}
              whileHover={{ scale: 1.01, x: 4 }}
              whileTap={{ scale: 0.99 }}
            >
              <item.icon size={20} />
              <span>{item.label}</span>
              {item.badge && (
                <span className="ml-auto w-2 h-2 bg-[var(--primary)] rounded-full" />
              )}
            </motion.div>
          </Link>
        ))}
      </nav>

      <div className="p-4 border-t border-[var(--border)] space-y-3">
        {user && (
          <Link href={`/${user.email?.split('@')[0]}`}>
            <motion.div
              className={cn(
                "flex items-center gap-3 px-4 py-3 rounded-xl transition-colors",
                pathname === `/${user.email?.split('@')[0]}`
                  ? "bg-[var(--muted)]"
                  : "hover:bg-[var(--muted)]"
              )}
              whileHover={{ scale: 1.01, x: 4 }}
              whileTap={{ scale: 0.99 }}
            >
              <Avatar src={null} alt="Profile" size="md" />
              <div className="flex flex-col">
                <span className="font-medium text-sm">@{user.email?.split('@')[0]}</span>
                <span className="text-xs text-[var(--accent)]">View Profile</span>
              </div>
            </motion.div>
          </Link>
        )}

        {toggleTheme && (
          <motion.button
            className="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-[var(--muted)] w-full transition-colors"
            whileHover={{ scale: 1.01 }}
            whileTap={{ scale: 0.99 }}
            onClick={toggleTheme}
          >
            {isDarkMode ? <SunIcon size={20} /> : <MoonIcon size={20} />}
            <span>{isDarkMode ? "Light Mode" : "Dark Mode"}</span>
          </motion.button>
        )}
      </div>
    </aside>
  );
}