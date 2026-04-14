"use client";

import { motion, AnimatePresence } from "framer-motion";
import { Navbar } from "@/components/layout/Navbar";
import { Sidebar } from "@/components/layout/Sidebar";
import { MobileNav } from "@/components/layout/MobileNav";

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-[var(--background)]">
      <Navbar />
      
      <Sidebar />
      
      <main className="lg:ml-64 pt-14 pb-24 lg:pb-6">
        <div className="px-4 sm:px-6 max-w-5xl mx-auto">
          <AnimatePresence mode="wait">
            <motion.div
              key={typeof window !== "undefined" ? window.location.pathname : "/"}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.15 }}
              className="py-4 lg:py-6"
            >
              {children}
            </motion.div>
          </AnimatePresence>
        </div>
      </main>
      
      <MobileNav />
    </div>
  );
}