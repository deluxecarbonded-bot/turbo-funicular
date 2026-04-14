"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { Logo, HomeIcon, AskIcon, ProfileIcon, NotificationsIcon, SettingsIcon, SearchIcon, MoonIcon, SunIcon } from "@/components/icons";
import { Avatar } from "@/components/ui/Avatar";
import { Button } from "@/components/ui/Button";

interface SidebarProps {
  currentUser?: {
    username: string;
    avatar_url: string | null;
  } | null;
  onToggleTheme?: () => void;
  isDarkMode?: boolean;
}

const navItems = [
  { href: "/", icon: HomeIcon, label: "Home" },
  { href: "/notifications", icon: NotificationsIcon, label: "Notifications" },
  { href: "/settings", icon: SettingsIcon, label: "Settings" },
];

export function Sidebar({ currentUser, onToggleTheme, isDarkMode }: SidebarProps) {
  const pathname = usePathname();

  return (
    <aside className="fixed left-0 top-14 bottom-0 w-64 bg-[var(--background)] p-4 hidden lg:flex flex-col">
      <div className="mb-6">
        <Link href="/">
          <Logo className="text-[var(--logo)]" />
        </Link>
      </div>

      <nav className="flex-1 space-y-1">
        {navItems.map((item) => (
          <Link key={item.href} href={item.href}>
            <motion.div
              className={cn(
                "flex items-center gap-3 px-4 py-3 rounded-lg transition-colors",
                pathname === item.href
                  ? "bg-[var(--muted)] font-medium"
                  : "hover:bg-[var(--muted)]"
              )}
              whileHover={{ scale: 1.02, x: 4 }}
              whileTap={{ scale: 0.98 }}
            >
              <item.icon size={20} />
              <span>{item.label}</span>
            </motion.div>
          </Link>
        ))}
      </nav>

      <div className="space-y-3 border-t border-[var(--border)] pt-4">
        {currentUser && (
          <Link href={`/${currentUser.username}`}>
            <motion.div
              className={cn(
                "flex items-center gap-3 px-4 py-3 rounded-lg transition-colors",
                pathname === `/${currentUser.username}`
                  ? "bg-[var(--muted)]"
                  : "hover:bg-[var(--muted)]"
              )}
              whileHover={{ scale: 1.02, x: 4 }}
              whileTap={{ scale: 0.98 }}
            >
              <Avatar src={currentUser.avatar_url} alt={currentUser.username} size="sm" />
              <div className="flex flex-col">
                <span className="font-medium text-sm">{currentUser.username}</span>
                <span className="text-xs text-[var(--accent)]">View Profile</span>
              </div>
            </motion.div>
          </Link>
        )}

        {onToggleTheme && (
          <motion.button
            className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-[var(--muted)] w-full transition-colors"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={onToggleTheme}
          >
            {isDarkMode ? <SunIcon size={20} /> : <MoonIcon size={20} />}
            <span>{isDarkMode ? "Light Mode" : "Dark Mode"}</span>
          </motion.button>
        )}
      </div>
    </aside>
  );
}
