"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { Card } from "@/components/ui/Card";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";
import { AskIcon, ArrowLeftIcon } from "@/components/icons";
import Link from "next/link";
import { useAuth } from "@/contexts/AuthContext";

export default function LoginPage() {
  const router = useRouter();
  const { signIn } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    const { error: authError } = await signIn(email, password);
    
    if (authError) {
      setError(authError.message);
    } else {
      router.push("/");
    }
    setIsLoading(false);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="w-full max-w-sm"
    >
      <Link href="/" className="absolute top-4 left-4">
        <motion.button
          className="p-2 hover:bg-[var(--muted)] rounded-full transition-colors"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <ArrowLeftIcon size={20} />
        </motion.button>
      </Link>

      <div className="flex justify-center mb-6">
        <div className="w-12 h-12 rounded-2xl bg-[var(--foreground)] flex items-center justify-center">
          <AskIcon size={26} className="text-[var(--background)]" />
        </div>
      </div>

      <Card className="p-6">
        <h1 className="text-2xl font-bold text-[var(--foreground)] text-center mb-1">
          Welcome back
        </h1>
        <p className="text-[var(--accent)] text-center mb-6">
          Sign in to your account
        </p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <Input
            label="Email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="you@example.com"
            required
          />
          <Input
            label="Password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter your password"
            required
          />

          {error && (
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-sm text-red-500"
            >
              {error}
            </motion.p>
          )}

          <Button type="submit" className="w-full" isLoading={isLoading}>
            Sign In
          </Button>
        </form>

        <p className="text-center text-[var(--accent)] mt-6">
          Do not have an account?{" "}
          <Link href="/register" className="text-[var(--foreground)] hover:underline font-medium">
            Sign up
          </Link>
        </p>
      </Card>
    </motion.div>
  );
}