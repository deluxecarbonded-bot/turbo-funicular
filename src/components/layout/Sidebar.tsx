"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { AskIcon, HomeIcon, NotificationsIcon, SettingsIcon, SearchIcon, MoonIcon, SunIcon, ProfileIcon } from "@/components/icons";
import { Avatar } from "@/components/ui/Avatar";
import { useAuth } from "@/contexts/AuthContext";
import { useTheme } from "@/hooks/useTheme";

export function Sidebar() {
  const pathname = usePathname();
  const { user } = useAuth();
  const { isDarkMode, toggleTheme } = useTheme();

  const navLinks = [
    { href: "/", label: "Home", icon: HomeIcon },
    { href: "/notifications", label: "Notifications", icon: NotificationsIcon },
    { href: "/settings", label: "Settings", icon: SettingsIcon },
  ];

  return (
    <aside className="fixed left-0 top-0 bottom-0 w-64 bg-[var(--background)] hidden lg:flex flex-col border-r border-[var(--border)]">
      <div className="p-5">
        <Link href="/">
          <motion.div
            className="flex items-center gap-2.5"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <div className="w-10 h-10 rounded-xl bg-[var(--foreground)] flex items-center justify-center">
              <AskIcon size={20} className="text-[var(--background)]" />
            </div>
            <span className="text-xl font-bold">Exotic</span>
          </motion.div>
        </Link>
      </div>

      <div className="px-3">
        <motion.button
          className="w-full flex items-center gap-3 px-4 py-2.5 rounded-xl bg-[var(--muted)] text-[var(--accent)] text-sm"
          whileHover={{ scale: 1.01 }}
          whileTap={{ scale: 0.99 }}
        >
          <SearchIcon size={18} />
          <span>Search</span>
          <kbd className="ml-auto text-xs px-1.5 py-0.5 rounded bg-[var(--card)]">⌘K</kbd>
        </motion.button>
      </div>

      <nav className="flex-1 px-3 py-4 space-y-1">
        <div className="px-3 py-2 text-xs font-medium text-[var(--accent)] uppercase tracking-wider">Menu</div>
        {navLinks.map((link) => (
          <Link key={link.href} href={link.href}>
            <motion.div
              className={cn(
                "flex items-center gap-3 px-4 py-2.5 rounded-xl transition-colors",
                pathname === link.href ? "bg-[var(--muted)] font-medium" : "hover:bg-[var(--muted)]"
              )}
              whileHover={{ scale: 1.01 }}
              whileTap={{ scale: 0.99 }}
            >
              <link.icon size={18} />
              <span>{link.label}</span>
            </motion.div>
          </Link>
        ))}
      </nav>

      <div className="p-3 border-t border-[var(--border)] space-y-2">
        {user && (
          <Link href={`/${user.email?.split('@')[0]}`}>
            <motion.div
              className={cn(
                "flex items-center gap-3 px-4 py-2.5 rounded-xl transition-colors",
                pathname === `/${user.email?.split('@')[0]}` ? "bg-[var(--muted)]" : "hover:bg-[var(--muted)]"
              )}
              whileHover={{ scale: 1.01 }}
              whileTap={{ scale: 0.99 }}
            >
              <Avatar src={null} alt="Profile" size="sm" />
              <div className="flex flex-col">
                <span className="text-sm font-medium">@{user.email?.split('@')[0]}</span>
                <span className="text-xs text-[var(--accent)]">View Profile</span>
              </div>
            </motion.div>
          </Link>
        )}

        {toggleTheme && (
          <motion.button
            className="flex items-center gap-3 px-4 py-2.5 rounded-xl hover:bg-[var(--muted)] w-full transition-colors"
            whileHover={{ scale: 1.01 }}
            whileTap={{ scale: 0.99 }}
            onClick={toggleTheme}
          >
            {isDarkMode ? <SunIcon size={18} /> : <MoonIcon size={18} />}
            <span>{isDarkMode ? "Light Mode" : "Dark Mode"}</span>
          </motion.button>
        )}
      </div>
    </aside>
  );
}