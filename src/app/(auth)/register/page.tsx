"use client";

import { Card } from "@/components/ui/Card";
import { Input } from "@/components/ui/Input";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/contexts/AuthContext";
import Link from "next/link";

export default function RegisterPage() {
  const router = useRouter();
  const { signUp } = useAuth();
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    if (password !== confirm) { setError("Passwords do not match"); return; }
    if (password.length < 6) { setError("Password must be at least 6 characters"); return; }
    setLoading(true);
    const { error: err } = await signUp(email, password, username);
    if (err) setError(err.message);
    else router.push("/");
    setLoading(false);
  };

  return (
    <Card className="p-6">
      <h1 className="text-xl font-semibold text-center mb-1">Create account</h1>
      <p className="text-center mb-6 text-sm">Join Exotic</p>
      <form onSubmit={handleSubmit} className="space-y-4">
        <Input label="Username" value={username} onChange={(e) => setUsername(e.target.value)} placeholder="Choose a username" required />
        <Input label="Email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="you@example.com" required />
        <Input label="Password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Create a password" required />
        <Input label="Confirm Password" type="password" value={confirm} onChange={(e) => setConfirm(e.target.value)} placeholder="Confirm your password" required />
        {error && <p className="text-sm text-red-500">{error}</p>}
        <button type="submit" disabled={loading} className="w-full py-2.5 bg-[var(--button-bg)] text-[var(--button-text)] rounded-lg font-medium disabled:opacity-50">
          {loading ? "Creating..." : "Create Account"}
        </button>
      </form>
      <p className="text-center mt-6 text-sm">
        Have an account? <Link href="/login" className="font-medium">Sign in</Link>
      </p>
    </Card>
  );
}