"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Container, PageWrapper } from "@/components/layout/Container";
import { Card } from "@/components/ui/Card";
import { Input } from "@/components/ui/Input";
import { Textarea } from "@/components/ui/Textarea";
import { Button } from "@/components/ui/Button";
import { Toggle } from "@/components/ui/Toggle";
import { Avatar } from "@/components/ui/Avatar";
import { useTheme } from "@/hooks/useTheme";
import { ArrowLeftIcon, LinkIcon } from "@/components/icons";
import Link from "next/link";

export default function SettingsPage() {
  const { isDarkMode, toggleTheme } = useTheme();
  const [username, setUsername] = useState("demo");
  const [displayName, setDisplayName] = useState("Demo User");
  const [bio, setBio] = useState("Welcome to my Exotic profile!");
  const [website, setWebsite] = useState("https://example.com");
  const [isPublic, setIsPublic] = useState(true);
  const [isSaving, setIsSaving] = useState(false);

  const handleSave = async () => {
    setIsSaving(true);
    await new Promise(resolve => setTimeout(resolve, 1000));
    setIsSaving(false);
  };

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
