"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useTheme } from "@/hooks/useTheme";
import { Navbar } from "@/components/layout/Navbar";
import { Sidebar } from "@/components/layout/Sidebar";
import { MobileNav } from "@/components/layout/MobileNav";

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { isDarkMode, toggleTheme } = useTheme();

  const currentUser = null;

  return (
    <div className="min-h-screen bg-[var(--background)]">
      <Navbar
        currentUser={currentUser}
        onToggleTheme={toggleTheme}
        isDarkMode={isDarkMode}
      />
      <Sidebar
        currentUser={currentUser}
        onToggleTheme={toggleTheme}
        isDarkMode={isDarkMode}
      />
      
      <main className="lg:ml-64 pt-14 pb-20 lg:pb-4">
        <AnimatePresence mode="wait">
          <motion.div
            key={typeof window !== "undefined" ? window.location.pathname : "/"}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.2 }}
          >
            {children}
          </motion.div>
        </AnimatePresence>
      </main>
      
      <MobileNav currentUser={currentUser} />
    </div>
  );
}
