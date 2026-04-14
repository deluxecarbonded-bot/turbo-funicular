"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/Button";
import { Textarea } from "@/components/ui/Textarea";
import { Toggle } from "@/components/ui/Toggle";
import { SendIcon } from "@/components/icons";

interface AskFormProps {
  toUsername: string;
  onSubmit: (content: string, isAnonymous: boolean) => void;
}

export function AskForm({ toUsername, onSubmit }: AskFormProps) {
  const [content, setContent] = useState("");
  const [isAnonymous, setIsAnonymous] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async () => {
    if (!content.trim()) return;
    
    setIsSubmitting(true);
    try {
      await onSubmit(content, isAnonymous);
      setContent("");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-4"
    >
      <div className="text-center mb-6">
        <h1 className="text-2xl font-bold text-[var(--foreground)]">Ask @{toUsername}</h1>
        <p className="text-[var(--accent)] mt-1">Send an anonymous question</p>
      </div>

      <Textarea
        value={content}
        onChange={(e) => setContent(e.target.value)}
        placeholder="Ask a question..."
        rows={5}
        className="min-h-[120px] text-lg"
      />

      <div className="flex items-center justify-between">
        <Toggle
          checked={isAnonymous}
          onChange={setIsAnonymous}
          label="Send anonymously"
        />

        <Button
          onClick={handleSubmit}
          disabled={!content.trim() || isSubmitting}
          isLoading={isSubmitting}
        >
          <SendIcon size={18} />
          Send Question
        </Button>
      </div>
    </motion.div>
  );
}
