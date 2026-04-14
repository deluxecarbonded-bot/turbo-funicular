"use client";

import { Card } from "@/components/ui/Card";
import { Input } from "@/components/ui/Input";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/contexts/AuthContext";
import Link from "next/link";

export default function LoginPage() {
  const router = useRouter();
  const { signIn } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    const { error: err } = await signIn(email, password);
    if (err) setError(err.message);
    else router.push("/");
    setLoading(false);
  };

  return (
    <Card className="p-6">
      <h1 className="text-xl font-semibold text-center mb-1">Welcome back</h1>
      <p className="text-center mb-6 text-sm">Sign in to your account</p>
      <form onSubmit={handleSubmit} className="space-y-4">
        <Input label="Email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="you@example.com" required />
        <Input label="Password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Enter your password" required />
        {error && <p className="text-sm text-red-500">{error}</p>}
        <button type="submit" disabled={loading} className="w-full py-2.5 bg-[var(--button-bg)] text-[var(--button-text)] rounded-lg font-medium disabled:opacity-50">
          {loading ? "Signing in..." : "Sign In"}
        </button>
      </form>
      <p className="text-center mt-6 text-sm">
        No account? <Link href="/register" className="font-medium">Sign up</Link>
      </p>
    </Card>
  );
}