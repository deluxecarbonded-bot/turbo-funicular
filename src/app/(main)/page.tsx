"use client";

import { motion } from "framer-motion";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import Link from "next/link";

export default function HomePage() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-8"
    >
      <section className="text-center py-8">
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-[var(--muted)] mb-6">
          <span className="text-2xl">❓</span>
        </div>
        <h1 className="text-2xl font-bold mb-2">
          Welcome to Exotic
        </h1>
        <p className="max-w-md mx-auto mb-6">
          The platform for anonymous questions and answers. Share your link and let people ask you anything.
        </p>
        
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Link href="/login">
            <Button>Get Started</Button>
          </Link>
          <Link href="/login">
            <Button variant="secondary">Sign In</Button>
          </Link>
        </div>
      </section>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <Card className="p-5 text-center" hover>
          <div className="text-2xl font-bold mb-1">100%</div>
          <div>Anonymous</div>
        </Card>
        <Card className="p-5 text-center" hover>
          <div className="text-2xl font-bold mb-1">Real</div>
          <div>Answers</div>
        </Card>
        <Card className="p-5 text-center" hover>
          <div className="text-2xl font-bold mb-1">Instant</div>
          <div>Notifications</div>
        </Card>
      </div>

      <section className="text-center py-4">
        <h2 className="font-semibold mb-4">
          How it works
        </h2>
        <div className="space-y-3 max-w-md mx-auto text-left">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-[var(--foreground)] text-[var(--background)] flex items-center justify-center font-bold flex-shrink-0">1</div>
            <p>Create your profile</p>
          </div>
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-[var(--foreground)] text-[var(--background)] flex items-center justify-center font-bold flex-shrink-0">2</div>
            <p>Share your unique link</p>
          </div>
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-[var(--foreground)] text-[var(--background)] flex items-center justify-center font-bold flex-shrink-0">3</div>
            <p>Answer questions</p>
          </div>
        </div>
      </section>
    </motion.div>
  );
}