"use client";

import { useParams } from "next/navigation";
import { motion } from "framer-motion";
import { Container, PageWrapper } from "@/components/layout/Container";
import { AskForm } from "@/components/features/AskForm";

export default function AskPage() {
  const params = useParams();
  const username = params.username as string;

  const handleSubmit = async (content: string, isAnonymous: boolean) => {
    console.log("Submit question:", { content, isAnonymous, to: username });
  };

  return (
    <PageWrapper>
      <Container size="sm">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="py-8"
        >
          <AskForm toUsername={username} onSubmit={handleSubmit} />
        </motion.div>
      </Container>
    </PageWrapper>
  );
}
