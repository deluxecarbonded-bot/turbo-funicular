"use client";

import { useEffect, useCallback } from "react";
import { supabase, isSupabaseConfigured } from "@/lib/supabase";
import type { Question, Answer, Notification } from "@/types";

export function useRealtimeQuestions(
  userId: string,
  onNewQuestion: (question: Question) => void
) {
  const subscribe = useCallback(() => {
    if (!isSupabaseConfigured()) return () => {};

    const channel = supabase
      .channel("questions-realtime")
      .on(
        "postgres_changes",
        {
          event: "INSERT",
          schema: "public",
          table: "questions",
          filter: `to_user_id=eq.${userId}`,
        },
        (payload) => {
          onNewQuestion(payload.new as Question);
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [userId, onNewQuestion]);

  useEffect(() => {
    const unsubscribe = subscribe();
    return () => unsubscribe();
  }, [subscribe]);
}

export function useRealtimeAnswers(
  questionIds: string[],
  onNewAnswer: (answer: Answer) => void
) {
  const subscribe = useCallback(() => {
    if (!isSupabaseConfigured() || questionIds.length === 0) return () => {};

    const channel = supabase
      .channel("answers-realtime")
      .on(
        "postgres_changes",
        {
          event: "INSERT",
          schema: "public",
          table: "answers",
        },
        (payload) => {
          const answer = payload.new as Answer;
          if (questionIds.includes(answer.question_id)) {
            onNewAnswer(answer);
          }
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [questionIds, onNewAnswer]);

  useEffect(() => {
    const unsubscribe = subscribe();
    return () => unsubscribe();
  }, [subscribe]);
}

export function useRealtimeLikes(
  questionIds: string[],
  onUpdateLikes: (questionId: string, likesCount: number) => void
) {
  const subscribe = useCallback(() => {
    if (!isSupabaseConfigured() || questionIds.length === 0) return () => {};

    const channel = supabase
      .channel("likes-realtime")
      .on(
        "postgres_changes",
        {
          event: "UPDATE",
          schema: "public",
          table: "questions",
        },
        (payload) => {
          const question = payload.new as Question;
          if (questionIds.includes(question.id)) {
            onUpdateLikes(question.id, question.likes_count);
          }
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [questionIds, onUpdateLikes]);

  useEffect(() => {
    const unsubscribe = subscribe();
    return () => unsubscribe();
  }, [subscribe]);
}

export function useRealtimeNotifications(
  userId: string,
  onNewNotification: (notification: Notification) => void
) {
  const subscribe = useCallback(() => {
    if (!isSupabaseConfigured()) return () => {};

    const channel = supabase
      .channel("notifications-realtime")
      .on(
        "postgres_changes",
        {
          event: "INSERT",
          schema: "public",
          table: "notifications",
          filter: `user_id=eq.${userId}`,
        },
        (payload) => {
          onNewNotification(payload.new as Notification);
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [userId, onNewNotification]);

  useEffect(() => {
    const unsubscribe = subscribe();
    return () => unsubscribe();
  }, [subscribe]);
}
