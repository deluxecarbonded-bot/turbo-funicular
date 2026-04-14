"use client";

import { Navbar } from "@/components/layout/Navbar";

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-[var(--background)]">
      <Navbar />
      <main className="pt-14">
        <div className="max-w-3xl mx-auto px-4 py-8">
          {children}
        </div>
      </main>
    </div>
  );
}