"use client";

import { useParams } from "next/navigation";
import { motion } from "framer-motion";
import { Container, PageWrapper } from "@/components/layout/Container";
import { ProfileHeader } from "@/components/features/ProfileHeader";
import { QuestionCard } from "@/components/features/QuestionCard";
import type { Profile, Question } from "@/types";

const mockProfile: Profile = {
  id: "1",
  username: "demo",
  display_name: "Demo User",
  avatar_url: null,
  bio: "Welcome to my Exotic profile! Ask me anything.",
  website: "https://example.com",
  created_at: new Date().toISOString(),
  updated_at: new Date().toISOString(),
};

const mockQuestions: (Question & { from_profile: Profile | null })[] = [
  {
    id: "1",
    from_user_id: null,
    to_user_id: "1",
    content: "What's your favorite movie?",
    is_anonymous: true,
    is_answered: true,
    is_public: true,
    likes_count: 5,
    created_at: new Date(Date.now() - 3600000).toISOString(),
    from_profile: null,
  },
  {
    id: "2",
    from_user_id: "2",
    to_user_id: "1",
    content: "If you could travel anywhere, where would you go?",
    is_anonymous: false,
    is_answered: true,
    is_public: true,
    likes_count: 12,
    created_at: new Date(Date.now() - 7200000).toISOString(),
    from_profile: {
      id: "2",
      username: "curious_mind",
      display_name: "Curious Mind",
      avatar_url: null,
      bio: null,
      website: null,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    },
  },
  {
    id: "3",
    from_user_id: null,
    to_user_id: "1",
    content: "What's your biggest dream?",
    is_anonymous: true,
    is_answered: false,
    is_public: true,
    likes_count: 8,
    created_at: new Date(Date.now() - 86400000).toISOString(),
    from_profile: null,
  },
];

export default function ProfilePage() {
  const params = useParams();
  const username = params.username as string;

  const isCurrentUser = false;
  const isFollowing = false;

  return (
    <PageWrapper>
      <Container>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-6 py-6"
        >
          <ProfileHeader
            profile={mockProfile}
            isCurrentUser={isCurrentUser}
            isFollowing={isFollowing}
            stats={{
              questionsReceived: mockQuestions.length,
              questionsAnswered: mockQuestions.filter(q => q.is_answered).length,
              likes: mockQuestions.reduce((acc, q) => acc + q.likes_count, 0),
            }}
          />

          <div className="space-y-4">
            <h2 className="text-lg font-semibold text-[var(--foreground)]">
              Questions
            </h2>
            {mockQuestions.map((question, index) => (
              <motion.div
                key={question.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <QuestionCard question={question} />
              </motion.div>
            ))}
          </div>
        </motion.div>
      </Container>
    </PageWrapper>
  );
}
