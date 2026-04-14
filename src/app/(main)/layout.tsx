"use client";

import { motion, AnimatePresence } from "framer-motion";
import { Navbar } from "@/components/layout/Navbar";
import { Sidebar } from "@/components/layout/Sidebar";
import { MobileNav } from "@/components/layout/MobileNav";
import { Container } from "@/components/layout/Container";

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-[var(--background)]">
      <Navbar />
      
      <div className="hidden lg:flex fixed left-0 top-0 bottom-0 z-30">
        <Sidebar />
      </div>
      
      <main className="lg:ml-64 pt-14 pb-20 lg:pb-4">
        <Container size="xl">
          <AnimatePresence mode="wait">
            <motion.div
              key={typeof window !== "undefined" ? window.location.pathname : "/"}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.2, ease: "easeOut" }}
              className="py-4 lg:py-6"
            >
              {children}
            </motion.div>
          </AnimatePresence>
        </Container>
      </main>
      
      <MobileNav />
    </div>
  );
}