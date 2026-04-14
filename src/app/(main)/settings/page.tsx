"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { Container, PageWrapper } from "@/components/layout/Container";
import { Card } from "@/components/ui/Card";
import { Input } from "@/components/ui/Input";
import { Textarea } from "@/components/ui/Textarea";
import { Button } from "@/components/ui/Button";
import { Toggle } from "@/components/ui/Toggle";
import { Avatar } from "@/components/ui/Avatar";
import { Skeleton } from "@/components/ui/Skeleton";
import { useTheme } from "@/hooks/useTheme";
import { supabase } from "@/lib/supabase";
import { useAuth } from "@/contexts/AuthContext";
import { ArrowLeftIcon, LinkIcon } from "@/components/icons";
import Link from "next/link";

export default function SettingsPage() {
  const router = useRouter();
  const { isDarkMode, toggleTheme } = useTheme();
  const { user, signOut } = useAuth();
  const [username, setUsername] = useState("");
  const [displayName, setDisplayName] = useState("");
  const [bio, setBio] = useState("");
  const [website, setWebsite] = useState("");
  const [isPublic, setIsPublic] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadProfile() {
      if (!user) {
        router.push("/login");
        return;
      }

      const { data } = await supabase
        .from("profiles")
        .select("*")
        .eq("id", user.id)
        .single();

      if (data) {
        setUsername(data.username);
        setDisplayName(data.display_name);
        setBio(data.bio || "");
        setWebsite(data.website || "");
        setIsPublic(data.is_public ?? true);
      }
      setLoading(false);
    }

    loadProfile();
  }, [user, router]);

  const handleSave = async () => {
    if (!user) return;
    setIsSaving(true);

    const { error } = await supabase
      .from("profiles")
      .update({
        username,
        display_name: displayName,
        bio,
        website,
        is_public: isPublic,
        updated_at: new Date().toISOString(),
      })
      .eq("id", user.id);

    setIsSaving(false);
  };

  const handleDeleteAccount = async () => {
    if (!user) return;
    await signOut();
    router.push("/");
  };

  if (loading) {
    return (
      <PageWrapper>
        <Container size="sm">
          <div className="space-y-6 py-6">
            <Skeleton className="h-10 w-40" />
            <Skeleton className="h-64" />
          </div>
        </Container>
      </PageWrapper>
    );
  }

  return (
    <PageWrapper>
      <Container size="sm">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-6 py-6"
        >
          <div className="flex items-center gap-4 mb-6">
            <Link href="/">
              <motion.button
                className="p-2 hover:bg-[var(--muted)] rounded-full transition-colors"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <ArrowLeftIcon size={20} />
              </motion.button>
            </Link>
            <h1 className="text-2xl font-bold text-[var(--foreground)]">
              Settings
            </h1>
          </div>

          <Card className="p-6 space-y-6">
            <div>
              <h2 className="text-lg font-semibold text-[var(--foreground)] mb-4">
                Profile
              </h2>
              
              <div className="flex items-center gap-4 mb-6">
                <Avatar src={null} alt={username} size="xl" />
                <Button variant="secondary" size="sm">
                  Change Avatar
                </Button>
              </div>

              <div className="space-y-4">
                <Input
                  label="Username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                />
                <Input
                  label="Display Name"
                  value={displayName}
                  onChange={(e) => setDisplayName(e.target.value)}
                />
                <Textarea
                  label="Bio"
                  value={bio}
                  onChange={(e) => setBio(e.target.value)}
                  rows={3}
                />
                <Input
                  label="Website"
                  type="url"
                  value={website}
                  onChange={(e) => setWebsite(e.target.value)}
                />
              </div>
            </div>

            <div className="pt-4 border-t border-[var(--border)]">
              <h2 className="text-lg font-semibold text-[var(--foreground)] mb-4">
                Privacy
              </h2>
              <Toggle
                checked={isPublic}
                onChange={setIsPublic}
                label="Public profile"
              />
              <p className="text-sm text-[var(--accent)] mt-2">
                Allow anyone to send you questions
              </p>
            </div>

            <div className="pt-4 border-t border-[var(--border)]">
              <h2 className="text-lg font-semibold text-[var(--foreground)] mb-4">
                Appearance
              </h2>
              <Toggle
                checked={isDarkMode}
                onChange={toggleTheme}
                label="Dark mode"
              />
            </div>

            <div className="pt-4 border-t border-[var(--border)]">
              <Button
                onClick={handleSave}
                isLoading={isSaving}
              >
                Save Changes
              </Button>
            </div>
          </Card>

          <Card className="p-6">
            <h2 className="text-lg font-semibold text-[var(--foreground)] mb-4">
              Danger Zone
            </h2>
            <Button variant="ghost" className="text-red-500 hover:text-red-600 hover:bg-red-50">
              Delete Account
            </Button>
          </Card>
        </motion.div>
      </Container>
    </PageWrapper>
  );
}
