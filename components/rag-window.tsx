"use client";

import { modelID } from "@/ai/providers";
import { useChat } from "@ai-sdk/react";
import { useState } from "react";
import { Textarea } from "./textarea";
import { MessageList } from "./message-list";
import { toast } from "sonner";
import { Button } from "./ui/button";
import { motion } from "motion/react";

// Define the action structure for suggested prompts
export interface SuggestedPrompt {
  title: string;
  label: string;
  action: string;
}

interface RagChatWindowProps {
  endpoint: string;
  emptyStateComponent?: React.ReactNode;
  suggestedPrompts?: SuggestedPrompt[];
}

export default function RagChatWindow({
  endpoint,
  emptyStateComponent,
  suggestedPrompts,
}: RagChatWindowProps) {
  const [selectedModel, setSelectedModel] = useState<modelID>(
    "deepseek-r1-distill-llama-70b"
  );

  const {
    messages,
    input,
    handleInputChange,
    handleSubmit,
    error,
    status,
    stop,
    append,
  } = useChat({
    api: endpoint,
    maxSteps: 5,
    body: {
      selectedModel,
    },
    onError: (e) =>
      toast.error(`Error while processing your request`, {
        description: e.message,
      }),
  });

  const isLoading = status === "streaming" || status === "submitted";

  const sendMessage = (input: string) => {
    append({
      role: "user",
      content: input,
    });
  };

  if (error) return <div>{error.message}</div>;

  // Render suggested prompts component
  const renderSuggestedPrompts = () => {
    if (!suggestedPrompts) return null;

    return (
      <div
        data-testid="suggested-actions"
        className="grid sm:grid-cols-2 gap-2 w-full py-10"
      >
        {suggestedPrompts.map((suggestedPrompt, index) => (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            transition={{ delay: 0.05 * index }}
            key={`suggested-action-${suggestedPrompt.title}-${index}`}
            className={index > 3 ? "hidden sm:block" : "block"}
          >
            <Button
              variant="ghost"
              onClick={() => sendMessage(suggestedPrompt.action)}
              className="text-left border rounded-xl px-4 py-3.5 text-sm flex-1 gap-1 sm:flex-col w-full h-auto justify-start items-start"
            >
              <span className="font-medium">{suggestedPrompt.title}</span>
              <span className="text-muted-foreground">
                {suggestedPrompt.label}
              </span>
            </Button>
          </motion.div>
        ))}
      </div>
    );
  };

  const renderEmptyState = () => {
    if (!emptyStateComponent) return null;

    return <div>{emptyStateComponent}</div>;
  };

  return (
    <div className="h-dvh flex flex-col justify-center w-full stretch">
      {messages.length === 0 ? (
        <div className="max-w-3xl mx-auto w-full">
          {renderEmptyState()}

          {renderSuggestedPrompts()}
        </div>
      ) : (
        <MessageList
          messages={messages}
          isLoading={isLoading}
          status={status}
        />
      )}
      <form
        onSubmit={handleSubmit}
        className="pb-20 bg-white dark:bg-black w-full max-w-3xl mx-auto px-4 sm:px-0"
      >
        <Textarea
          selectedModel={selectedModel}
          setSelectedModel={setSelectedModel}
          handleInputChange={handleInputChange}
          input={input}
          isLoading={isLoading}
          status={status}
          stop={stop}
        />
      </form>
    </div>
  );
}
