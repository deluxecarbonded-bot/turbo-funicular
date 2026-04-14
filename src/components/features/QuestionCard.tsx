"use client";

import { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { cn, formatTimeAgo } from "@/lib/utils";
import { Avatar } from "@/components/ui/Avatar";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { HeartIcon, ShareIcon, ReplyIcon, MoreIcon, DeleteIcon, EditIcon } from "@/components/icons";
import type { Question, Answer, Profile } from "@/types";

interface QuestionCardProps {
  question: Question & { from_profile?: Profile | null };
  answer?: Answer;
  currentUserId?: string;
  onLike?: (questionId: string) => void;
  onReply?: (questionId: string) => void;
  onShare?: (questionId: string) => void;
  onDelete?: (questionId: string) => void;
  onEdit?: (questionId: string) => void;
}

export function QuestionCard({
  question,
  answer,
  currentUserId,
  onLike,
  onReply,
  onShare,
  onDelete,
  onEdit,
}: QuestionCardProps) {
  const [isLiked, setIsLiked] = useState(false);
  const [showAnswer, setShowAnswer] = useState(false);

  const handleLike = () => {
    setIsLiked(!isLiked);
    onLike?.(question.id);
  };

  const isOwnQuestion = currentUserId === question.to_user_id;

  return (
    <Card className="p-4" hover>
      <div className="flex items-start gap-3">
        <Link href={`/${question.from_profile?.username || "anonymous"}`}>
          <Avatar
            src={question.is_anonymous ? null : question.from_profile?.avatar_url}
            alt={question.is_anonymous ? "Anonymous" : question.from_profile?.username || "?"}
            size="md"
          />
        </Link>

        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-1">
            <Link
              href={`/${question.is_anonymous ? "anonymous" : question.from_profile?.username}`}
              className="font-medium hover:underline"
            >
              {question.is_anonymous ? "Anonymous" : question.from_profile?.username}
            </Link>
            <span className="text-[var(--accent)] text-sm">
              {formatTimeAgo(question.created_at)}
            </span>
          </div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="mb-3"
          >
            <Link href={`/ask/${question.from_profile?.username}`}>
              <p className="text-[var(--foreground)]">{question.content}</p>
            </Link>
          </motion.div>

          {answer ? (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              className="mt-3 p-3 bg-[var(--muted)] rounded-lg"
            >
              <p className="text-[var(--foreground)]">{answer.content}</p>
            </motion.div>
          ) : isOwnQuestion ? (
            <div className="mt-3">
              <textarea
                placeholder="Write your answer..."
                className="w-full p-3 bg-[var(--muted)] rounded-lg text-sm resize-none focus:outline-none"
                rows={3}
              />
              <div className="flex justify-end mt-2">
                <Button size="sm">Answer</Button>
              </div>
            </div>
          ) : null}

          <div className="flex items-center gap-4 mt-3">
            <motion.button
              className={cn(
                "flex items-center gap-1 text-sm transition-colors",
                isLiked ? "text-red-500" : "text-[var(--accent)] hover:text-red-500"
              )}
              onClick={handleLike}
              whileTap={{ scale: 0.9 }}
            >
              <HeartIcon size={18} filled={isLiked} />
              <span>{question.likes_count + (isLiked ? 1 : 0)}</span>
            </motion.button>

            <motion.button
              className="flex items-center gap-1 text-sm text-[var(--accent)] hover:text-[var(--foreground)] transition-colors"
              onClick={() => onReply?.(question.id)}
              whileTap={{ scale: 0.9 }}
            >
              <ReplyIcon size={18} />
              <span>Reply</span>
            </motion.button>

            <motion.button
              className="flex items-center gap-1 text-sm text-[var(--accent)] hover:text-[var(--foreground)] transition-colors"
              onClick={() => onShare?.(question.id)}
              whileTap={{ scale: 0.9 }}
            >
              <ShareIcon size={18} />
              <span>Share</span>
            </motion.button>

            {isOwnQuestion && (
              <div className="ml-auto flex items-center gap-2">
                <motion.button
                  className="p-1 text-[var(--accent)] hover:text-[var(--foreground)] transition-colors"
                  whileTap={{ scale: 0.9 }}
                  onClick={() => onEdit?.(question.id)}
                >
                  <EditIcon size={16} />
                </motion.button>
                <motion.button
                  className="p-1 text-[var(--accent)] hover:text-red-500 transition-colors"
                  whileTap={{ scale: 0.9 }}
                  onClick={() => onDelete?.(question.id)}
                >
                  <DeleteIcon size={16} />
                </motion.button>
              </div>
            )}
          </div>
        </div>
      </div>
    </Card>
  );
}
