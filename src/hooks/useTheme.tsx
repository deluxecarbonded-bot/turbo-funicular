"use client";

import { createContext, useContext, useEffect, useSyncExternalStore } from "react";

interface ThemeContextType {
  isDarkMode: boolean;
  toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

function getTheme(): boolean {
  if (typeof window === "undefined") return false;
  const saved = localStorage.getItem("exotic-theme");
  if (saved) return saved === "dark";
  return window.matchMedia("(prefers-color-scheme: dark)").matches;
}

function subscribe(callback: () => void) {
  const handler = () => callback();
  window.matchMedia("(prefers-color-scheme: dark)").addEventListener("change", handler);
  return () => {
    window.matchMedia("(prefers-color-scheme: dark)").removeEventListener("change", handler);
  };
}

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const isDarkMode = useSyncExternalStore(subscribe, getTheme, () => false);

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", isDarkMode ? "dark" : "light");
  }, [isDarkMode]);

  const toggleTheme = () => {
    const newTheme = !isDarkMode;
    localStorage.setItem("exotic-theme", newTheme ? "dark" : "light");
    document.documentElement.setAttribute("data-theme", newTheme ? "dark" : "light");
  };

  return (
    <ThemeContext.Provider value={{ isDarkMode, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
}
