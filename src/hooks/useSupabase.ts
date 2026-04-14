"use client";

import { useEffect, useState } from "react";
import { supabase, isSupabaseConfigured } from "@/lib/supabase";
import type { User, Profile } from "@/types";

export function useSupabase() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!isSupabaseConfigured()) {
      setTimeout(() => setLoading(false), 0);
      return;
    }

    supabase.auth.getUser().then(({ data }) => {
      setUser(data.user as User | null);
      setTimeout(() => setLoading(false), 0);
    });

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user as User | null);
    });

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  const signUp = async (email: string, password: string, username: string) => {
    if (!isSupabaseConfigured()) {
      throw new Error("Supabase not configured");
    }

    const { data, error } = await supabase.auth.signUp({
      email,
      password,
    });

    if (error) throw error;

    if (data.user) {
      await supabase.from("profiles").insert({
        id: data.user.id,
        username,
        display_name: username,
      });
    }

    return data;
  };

  const signIn = async (email: string, password: string) => {
    if (!isSupabaseConfigured()) {
      throw new Error("Supabase not configured");
    }

    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) throw error;
    return data;
  };

  const signOut = async () => {
    if (!isSupabaseConfigured()) {
      throw new Error("Supabase not configured");
    }

    const { error } = await supabase.auth.signOut();
    if (error) throw error;
  };

  return {
    user,
    profile: null as Profile | null,
    loading,
    signUp,
    signIn,
    signOut,
    isConfigured: isSupabaseConfigured(),
  };
}
