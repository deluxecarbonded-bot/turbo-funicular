"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { Logo, HomeIcon, AskIcon, ProfileIcon, NotificationsIcon, SettingsIcon, SearchIcon, MoonIcon, SunIcon, MenuIcon } from "@/components/icons";
import { Avatar } from "@/components/ui/Avatar";

interface NavbarProps {
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

export function Navbar({ currentUser, onToggleTheme, isDarkMode }: NavbarProps) {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 right-0 z-40 bg-[var(--background)]/80 backdrop-blur-md">
      <div className="flex items-center justify-between h-14 px-4">
        <div className="flex items-center gap-4">
          <Link href="/" className="flex items-center gap-2">
            <Logo className="text-[var(--logo)]" />
          </Link>
        </div>

        <div className="hidden md:flex items-center gap-2">
          <motion.button
            className="p-2 rounded-full hover:bg-[var(--muted)] transition-colors"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <SearchIcon size={20} />
          </motion.button>
          
          {onToggleTheme && (
            <motion.button
              className="p-2 rounded-full hover:bg-[var(--muted)] transition-colors"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={onToggleTheme}
            >
              {isDarkMode ? <SunIcon size={20} /> : <MoonIcon size={20} />}
            </motion.button>
          )}
        </div>

        <div className="hidden md:flex items-center gap-4">
          {currentUser ? (
            <>
              {navItems.map((item) => (
                <Link key={item.href} href={item.href}>
                  <motion.div
                    className={cn(
                      "p-2 rounded-full transition-colors",
                      pathname === item.href
                        ? "bg-[var(--muted)]"
                        : "hover:bg-[var(--muted)]"
                    )}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <item.icon size={20} />
                  </motion.div>
                </Link>
              ))}
              <Link href={`/${currentUser.username}`}>
                <Avatar src={currentUser.avatar_url} alt={currentUser.username} size="sm" />
              </Link>
            </>
          ) : (
            <Link href="/login">
              <motion.button
                className="px-4 py-2 bg-[var(--button-bg)] text-[var(--button-text)] rounded-md text-sm font-medium"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                Sign In
              </motion.button>
            </Link>
          )}
        </div>

        <button
          className="md:hidden p-2"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          <MenuIcon size={24} />
        </button>
      </div>

      {mobileMenuOpen && (
        <motion.div
          className="md:hidden absolute top-14 left-0 right-0 bg-[var(--background)] border-b border-[var(--border)] p-4"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
        >
          <div className="flex flex-col gap-2">
            {currentUser ? (
              <>
                <Link href="/" onClick={() => setMobileMenuOpen(false)}>
                  <div className="p-3 rounded-md hover:bg-[var(--muted)]">Home</div>
                </Link>
                <Link href="/notifications" onClick={() => setMobileMenuOpen(false)}>
                  <div className="p-3 rounded-md hover:bg-[var(--muted)]">Notifications</div>
                </Link>
                <Link href="/settings" onClick={() => setMobileMenuOpen(false)}>
                  <div className="p-3 rounded-md hover:bg-[var(--muted)]">Settings</div>
                </Link>
                <Link href={`/${currentUser.username}`} onClick={() => setMobileMenuOpen(false)}>
                  <div className="p-3 rounded-md hover:bg-[var(--muted)]">Profile</div>
                </Link>
                {onToggleTheme && (
                  <button
                    onClick={() => {
                      onToggleTheme();
                      setMobileMenuOpen(false);
                    }}
                    className="p-3 rounded-md hover:bg-[var(--muted)] text-left"
                  >
                    {isDarkMode ? "Light Mode" : "Dark Mode"}
                  </button>
                )}
              </>
            ) : (
              <Link href="/login" onClick={() => setMobileMenuOpen(false)}>
                <div className="p-3 rounded-md hover:bg-[var(--muted)]">Sign In</div>
              </Link>
            )}
          </div>
        </motion.div>
      )}
    </nav>
  );
}
