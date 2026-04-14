"use client";

import Link from "next/link";
import { useAuth } from "@/contexts/AuthContext";
import { useTheme } from "@/hooks/useTheme";

export function Navbar() {
  const { user } = useAuth();
  const { toggleTheme } = useTheme();

  return (
    <header className="fixed top-0 left-0 right-0 h-14 bg-[var(--background)]/80 backdrop-blur-sm border-b border-[var(--border)] z-40">
      <div className="h-full max-w-5xl mx-auto px-4 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-[var(--primary)] flex items-center justify-center">
            <span className="text-[var(--button-text)] font-bold text-sm">E</span>
          </div>
          <span className="font-semibold">Exotic</span>
        </Link>

        <nav className="flex items-center gap-4">
          {toggleTheme && (
            <button onClick={toggleTheme} className="p-2 rounded-lg hover:bg-[var(--muted)] text-sm">
              Theme
            </button>
          )}
          {user ? (
            <Link href={`/${user.email?.split('@')[0]}`} className="text-sm hover:underline">
              Profile
            </Link>
          ) : (
            <Link href="/login" className="px-4 py-2 bg-[var(--button-bg)] text-[var(--button-text)] rounded-lg text-sm font-medium">
              Sign In
            </Link>
          )}
        </nav>
      </div>
    </header>
  );
}