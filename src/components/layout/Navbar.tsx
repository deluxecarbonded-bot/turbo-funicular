"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import { Logo, HomeIcon, AskIcon, ProfileIcon, NotificationsIcon, SettingsIcon, SearchIcon, MoonIcon, SunIcon, MenuIcon, CloseIcon } from "@/components/icons";
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
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navItems = [
    { href: "/", icon: HomeIcon, label: "Home" },
    { href: "/notifications", icon: NotificationsIcon, label: "Notifications", badge: true },
    { href: "/settings", icon: SettingsIcon, label: "Settings" },
  ];

  return (
    <>
      <nav className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
        scrolled 
          ? "bg-[var(--background)]/80 backdrop-blur-xl border-b border-[var(--border)] shadow-sm" 
          : "bg-transparent"
      )}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="flex items-center justify-between h-16">
            <Link href="/" className="flex items-center gap-3 group">
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="flex items-center gap-2"
              >
                <div className="w-9 h-9 rounded-xl bg-[var(--foreground)] flex items-center justify-center">
                  <AskIcon size={20} className="text-[var(--background)]" />
                </div>
                <span className="text-xl font-bold hidden sm:block">Exotic</span>
              </motion.div>
            </Link>

            <div className="hidden md:flex items-center gap-1">
              <motion.button
                className="p-2.5 rounded-xl hover:bg-[var(--muted)] transition-colors"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <SearchIcon size={20} />
              </motion.button>
              
              {toggleTheme && (
                <motion.button
                  className="p-2.5 rounded-xl hover:bg-[var(--muted)] transition-colors"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={toggleTheme}
                >
                  {isDarkMode ? <SunIcon size={20} /> : <MoonIcon size={20} />}
                </motion.button>
              )}
            </div>

            <div className="hidden md:flex items-center gap-2">
              {user ? (
                <div className="flex items-center gap-1">
                  {navItems.map((item) => (
                    <Link key={item.href} href={item.href}>
                      <motion.div
                        className={cn(
                          "relative p-2.5 rounded-xl transition-colors",
                          pathname === item.href
                            ? "bg-[var(--muted)]"
                            : "hover:bg-[var(--muted)]"
                        )}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        <item.icon size={20} />
                        {item.badge && (
                          <span className="absolute top-1 right-1 w-2 h-2 bg-[var(--primary)] rounded-full" />
                        )}
                      </motion.div>
                    </Link>
                  ))}
                  <Link href={`/${user.email?.split('@')[0]}`}>
                    <motion.div
                      className="ml-2"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <Avatar src={null} alt="Profile" size="md" />
                    </motion.div>
                  </Link>
                </div>
              ) : (
                <Link href="/login">
                  <motion.button
                    className="px-5 py-2.5 bg-[var(--button-bg)] text-[var(--button-text)] rounded-xl font-medium"
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
              {mobileMenuOpen ? <CloseIcon size={24} /> : <MenuIcon size={24} />}
            </button>
          </div>
        </div>
      </nav>

      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            className="fixed inset-0 top-16 z-40 bg-[var(--background)] md:hidden"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
          >
            <div className="p-4 space-y-2">
              <Link href="/" onClick={() => setMobileMenuOpen(false)}>
                <motion.div
                  className="flex items-center gap-3 px-4 py-3 rounded-xl bg-[var(--muted)]"
                  whileTap={{ scale: 0.98 }}
                >
                  <HomeIcon size={20} />
                  <span>Home</span>
                </motion.div>
              </Link>
              <Link href="/notifications" onClick={() => setMobileMenuOpen(false)}>
                <motion.div
                  className="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-[var(--muted)]"
                  whileTap={{ scale: 0.98 }}
                >
                  <NotificationsIcon size={20} />
                  <span>Notifications</span>
                </motion.div>
              </Link>
              <Link href="/settings" onClick={() => setMobileMenuOpen(false)}>
                <motion.div
                  className="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-[var(--muted)]"
                  whileTap={{ scale: 0.98 }}
                >
                  <SettingsIcon size={20} />
                  <span>Settings</span>
                </motion.div>
              </Link>
              {user && (
                <Link href={`/${user.email?.split('@')[0]}`} onClick={() => setMobileMenuOpen(false)}>
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
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}