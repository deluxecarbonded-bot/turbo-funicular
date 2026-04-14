"use client";

import { useParams, useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { AskForm } from "@/components/features/AskForm";
import { supabase } from "@/lib/supabase";
import { useAuth } from "@/contexts/AuthContext";

export default function AskPage() {
  const params = useParams();
  const router = useRouter();
  const username = params.username as string;
  const { user } = useAuth();

  const handleSubmit = async (content: string, isAnonymous: boolean) => {
    if (!user) {
      router.push("/login");
      return;
    }

    const { data: profile } = await supabase
      .from("profiles")
      .select("id")
      .eq("username", username)
      .single();

    if (!profile) return;

    const { error } = await supabase.from("questions").insert({
      from_user_id: isAnonymous ? null : user.id,
      to_user_id: profile.id,
      content,
      is_anonymous: isAnonymous,
    });

    if (!error) {
      router.push(`/${username}`);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="py-6"
    >
      <AskForm toUsername={username} onSubmit={handleSubmit} />
    </motion.div>
  );
}