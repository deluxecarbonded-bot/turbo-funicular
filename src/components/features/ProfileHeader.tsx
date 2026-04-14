"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { Avatar } from "@/components/ui/Avatar";
import { Button } from "@/components/ui/Button";
import { EditIcon, UserPlusIcon, LinkIcon } from "@/components/icons";
import type { Profile } from "@/types";

interface ProfileHeaderProps {
  profile: Profile;
  isCurrentUser?: boolean;
  isFollowing?: boolean;
  onFollow?: () => void;
  stats?: {
    questionsReceived: number;
    questionsAnswered: number;
    likes: number;
  };
}

export function ProfileHeader({
  profile,
  isCurrentUser,
  isFollowing,
  onFollow,
  stats,
}: ProfileHeaderProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-4"
    >
      <div className="flex flex-col sm:flex-row items-center gap-4">
        <Avatar
          src={profile.avatar_url}
          alt={profile.username}
          size="xl"
          className="w-24 h-24"
        />
        
        <div className="flex-1 text-center sm:text-left">
          <div className="flex flex-col sm:flex-row items-center gap-2">
            <h1 className="text-2xl font-bold text-[var(--foreground)]">
              {profile.display_name || profile.username}
            </h1>
            {profile.display_name && (
              <span className="text-[var(--accent)]">@{profile.username}</span>
            )}
          </div>
          
          {profile.bio && (
            <p className="text-[var(--foreground)] mt-2 max-w-md">{profile.bio}</p>
          )}
          
          {profile.website && (
            <a
              href={profile.website}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center sm:justify-start gap-1 text-sm text-[var(--accent)] hover:underline mt-1"
            >
              <LinkIcon size={14} />
              {profile.website.replace(/^https?:\/\//, "")}
            </a>
          )}
        </div>
        
        <div className="flex gap-2">
          {isCurrentUser ? (
            <Link href="/settings">
              <Button variant="secondary" size="sm">
                <EditIcon size={16} />
                Edit Profile
              </Button>
            </Link>
          ) : (
            <Button
              variant={isFollowing ? "secondary" : "primary"}
              size="sm"
              onClick={onFollow}
            >
              <UserPlusIcon size={16} />
              {isFollowing ? "Following" : "Follow"}
            </Button>
          )}
        </div>
      </div>

      {stats && (
        <div className="flex justify-center sm:justify-start gap-8 pt-4 border-t border-[var(--border)]">
          <div className="text-center">
            <div className="text-xl font-bold text-[var(--foreground)]">
              {stats.questionsReceived}
            </div>
            <div className="text-sm text-[var(--accent)]">Questions</div>
          </div>
          <div className="text-center">
            <div className="text-xl font-bold text-[var(--foreground)]">
              {stats.questionsAnswered}
            </div>
            <div className="text-sm text-[var(--accent)]">Answers</div>
          </div>
          <div className="text-center">
            <div className="text-xl font-bold text-[var(--foreground)]">
              {stats.likes}
            </div>
            <div className="text-sm text-[var(--accent)]">Likes</div>
          </div>
        </div>
      )}
    </motion.div>
  );
}
