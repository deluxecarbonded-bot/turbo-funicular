"use client";

import { motion } from "framer-motion";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { AskIcon, SearchIcon } from "@/components/icons";
import Link from "next/link";

export default function HomePage() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-8"
    >
      <section className="text-center py-8 sm:py-12">
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: "spring", stiffness: 200, damping: 15 }}
          className="inline-flex items-center justify-center w-16 h-16 sm:w-20 sm:h-20 rounded-2xl bg-[var(--muted)] mb-6"
        >
          <AskIcon size={28} className="sm:w-10 sm:h-10" />
        </motion.div>
        <h1 className="text-2xl sm:text-3xl font-bold text-[var(--foreground)] mb-2">
          Welcome to Exotic
        </h1>
        <p className="text-[var(--accent)] max-w-md mx-auto text-sm sm:text-base">
          The platform for anonymous questions and answers. Share your link and let people ask you anything.
        </p>
        
        <div className="flex flex-col sm:flex-row gap-3 justify-center mt-6 sm:mt-8">
          <Link href="/login">
            <Button size="lg">Get Started</Button>
          </Link>
          <Button variant="secondary" size="lg">
            <SearchIcon size={18} />
            <span>Explore</span>
          </Button>
        </div>
      </section>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <Card className="p-5 sm:p-6 text-center" hover>
          <div className="text-2xl sm:text-3xl font-bold text-[var(--foreground)] mb-1">100%</div>
          <div className="text-[var(--accent)]">Anonymous</div>
        </Card>
        <Card className="p-5 sm:p-6 text-center" hover>
          <div className="text-2xl sm:text-3xl font-bold text-[var(--foreground)] mb-1">Real</div>
          <div className="text-[var(--accent)]">Answers</div>
        </Card>
        <Card className="p-5 sm:p-6 text-center" hover>
          <div className="text-2xl sm:text-3xl font-bold text-[var(--foreground)] mb-1">Instant</div>
          <div className="text-[var(--accent)]">Notifications</div>
        </Card>
      </div>

      <section className="text-center py-6 sm:py-8">
        <h2 className="text-lg sm:text-xl font-semibold text-[var(--foreground)] mb-4">
          How it works
        </h2>
        <div className="space-y-3 max-w-md mx-auto">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-[var(--foreground)] text-[var(--background)] flex items-center justify-center font-bold flex-shrink-0">1</div>
            <p className="text-sm text-[var(--foreground)]">Create your profile</p>
          </div>
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-[var(--foreground)] text-[var(--background)] flex items-center justify-center font-bold flex-shrink-0">2</div>
            <p className="text-sm text-[var(--foreground)]">Share your unique link</p>
          </div>
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-[var(--foreground)] text-[var(--background)] flex items-center justify-center font-bold flex-shrink-0">3</div>
            <p className="text-sm text-[var(--foreground)]">Answer questions publicly or privately</p>
          </div>
        </div>
      </section>
    </motion.div>
  );
}