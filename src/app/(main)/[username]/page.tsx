"use client";

import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { ProfileHeader } from "@/components/features/ProfileHeader";
import { QuestionCard } from "@/components/features/QuestionCard";
import { supabase } from "@/lib/supabase";
import type { Profile, Question } from "@/types";
import { useAuth } from "@/contexts/AuthContext";
import { Skeleton } from "@/components/ui/Skeleton";
import { Card } from "@/components/ui/Card";
import Link from "next/link";
import { ArrowLeftIcon } from "@/components/icons";

interface ProfileData extends Profile {
  user_id: string;
}

export default function ProfilePage() {
  const params = useParams();
  const username = params.username as string;
  const { user } = useAuth();
  const [profile, setProfile] = useState<ProfileData | null>(null);
  const [questions, setQuestions] = useState<(Question & { from_profile: Profile | null })[]>([]);
  const [loading, setLoading] = useState(true);
  const [isFollowing, setIsFollowing] = useState(false);

  const isCurrentUser = user?.email === profile?.id;

  useEffect(() => {
    async function fetchProfile() {
      const { data: profileData, error } = await supabase
        .from("profiles")
        .select("*")
        .eq("username", username)
        .single();

      if (error || !profileData) {
        setLoading(false);
        return;
      }

      setProfile(profileData);

      const { data: questionsData } = await supabase
        .from("questions")
        .select("*")
        .eq("to_user_id", profileData.id)
        .order("created_at", { ascending: false });

      if (questionsData) {
        setQuestions(questionsData as any);
      }

      if (user) {
        const { data: followData } = await supabase
          .from("follows")
          .select("*")
          .eq("follower_id", user.id)
          .eq("following_id", profileData.id)
          .single();
        setIsFollowing(!!followData);
      }

      setLoading(false);
    }

    if (username) {
      fetchProfile();
    }
  }, [username, user]);

  const handleFollow = async () => {
    if (!user || !profile) return;

    if (isFollowing) {
      await supabase.from("follows").delete().eq("follower_id", user.id).eq("following_id", profile.id);
    } else {
      await supabase.from("follows").insert({ follower_id: user.id, following_id: profile.id });
    }
    setIsFollowing(!isFollowing);
  };

  if (loading) {
    return (
      <div className="space-y-6">
        <Skeleton className="h-32" />
        <Skeleton className="h-24" />
        <Skeleton className="h-24" />
      </div>
    );
  }

  if (!profile) {
    return (
      <Card className="p-8 text-center">
        <p className="text-[var(--accent)] mb-4">User not found</p>
        <Link href="/" className="text-[var(--foreground)] hover:underline text-sm">
          Go back home
        </Link>
      </Card>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-6"
    >
      <ProfileHeader
        profile={profile}
        isCurrentUser={isCurrentUser}
        isFollowing={isFollowing}
        onFollow={handleFollow}
        stats={{
          questionsReceived: questions.length,
          questionsAnswered: questions.filter(q => q.is_answered).length,
          likes: questions.reduce((acc, q) => acc + (q.likes_count || 0), 0),
        }}
      />

      <div className="space-y-4">
        <h2 className="text-lg font-semibold text-[var(--foreground)]">
          Questions
        </h2>
        {questions.length === 0 ? (
          <Card className="p-6 text-center">
            <p className="text-[var(--accent)]">No questions yet</p>
          </Card>
        ) : (
          questions.map((question, index) => (
            <motion.div
              key={question.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <QuestionCard question={question} />
            </motion.div>
          ))
        )}
      </div>
    </motion.div>
  );
}