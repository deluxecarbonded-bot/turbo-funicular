"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import { AskIcon, HomeIcon, NotificationsIcon, SettingsIcon, SearchIcon, MoonIcon, SunIcon, MenuIcon, CloseIcon, ProfileIcon } from "@/components/icons";
import { Avatar } from "@/components/ui/Avatar";
import { useAuth } from "@/contexts/AuthContext";
import { useTheme } from "@/hooks/useTheme";

export function Navbar() {
  const pathname = usePathname();
  const { user } = useAuth();
  const { isDarkMode, toggleTheme } = useTheme();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 8);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { href: "/", label: "Home", icon: HomeIcon },
    { href: "/notifications", label: "Notifications", icon: NotificationsIcon },
    { href: "/settings", label: "Settings", icon: SettingsIcon },
  ];

  return (
    <>
      <header className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-200",
        scrolled ? "bg-[var(--background)]/90 backdrop-blur-lg border-b border-[var(--border)]" : "bg-transparent"
      )}>
        <div className="max-w-6xl mx-auto px-4 h-14 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-[var(--foreground)] flex items-center justify-center">
              <AskIcon size={18} className="text-[var(--background)]" />
            </div>
            <span className="text-lg font-bold hidden sm:block">Exotic</span>
          </Link>

          <div className="hidden md:flex items-center gap-1">
            <motion.button
              className="p-2.5 rounded-xl hover:bg-[var(--muted)] transition-colors"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <SearchIcon size={18} />
            </motion.button>
            
            {toggleTheme && (
              <motion.button
                className="p-2.5 rounded-xl hover:bg-[var(--muted)] transition-colors"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={toggleTheme}
              >
                {isDarkMode ? <SunIcon size={18} /> : <MoonIcon size={18} />}
              </motion.button>
            )}
          </div>

          <div className="hidden md:flex items-center gap-2">
            {user ? (
              <div className="flex items-center gap-1">
                {navLinks.map((link) => (
                  <Link key={link.href} href={link.href}>
                    <motion.div
                      className={cn(
                        "p-2.5 rounded-xl transition-colors",
                        pathname === link.href ? "bg-[var(--muted)]" : "hover:bg-[var(--muted)]"
                      )}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <link.icon size={18} />
                    </motion.div>
                  </Link>
                ))}
                <Link href={`/${user.email?.split('@')[0]}`}>
                  <motion.div
                    className="ml-1"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Avatar src={null} alt="Profile" size="sm" />
                  </motion.div>
                </Link>
              </div>
            ) : (
              <Link href="/login">
                <motion.button
                  className="px-4 py-2 bg-[var(--button-bg)] text-[var(--button-text)] rounded-xl text-sm font-medium"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  Sign In
                </motion.button>
              </Link>
            )}
          </div>

          <button
            className="md:hidden p-2 -mr-2"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <CloseIcon size={22} /> : <MenuIcon size={22} />}
          </button>
        </div>
      </header>

      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            className="fixed inset-0 top-14 z-40 bg-[var(--background)] md:hidden"
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
          >
            <nav className="p-4 space-y-2">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                >
                  <motion.div
                    className={cn(
                      "flex items-center gap-3 px-4 py-3 rounded-xl",
                      pathname === link.href ? "bg-[var(--muted)]" : "hover:bg-[var(--muted)]"
                    )}
                    whileTap={{ scale: 0.98 }}
                  >
                    <link.icon size={20} />
                    <span>{link.label}</span>
                  </motion.div>
                </Link>
              ))}
              {user && (
                <Link
                  href={`/${user.email?.split('@')[0]}`}
                  onClick={() => setMobileMenuOpen(false)}
                >
                  <motion.div
                    className="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-[var(--muted)]"
                    whileTap={{ scale: 0.98 }}
                  >
                    <ProfileIcon size={20} />
                    <span>Profile</span>
                  </motion.div>
                </Link>
              )}
              {toggleTheme && (
                <motion.button
                  onClick={() => {
                    toggleTheme();
                    setMobileMenuOpen(false);
                  }}
                  className="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-[var(--muted)] w-full"
                  whileTap={{ scale: 0.98 }}
                >
                  {isDarkMode ? <SunIcon size={20} /> : <MoonIcon size={20} />}
                  <span>{isDarkMode ? "Light Mode" : "Dark Mode"}</span>
                </motion.button>
              )}
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}