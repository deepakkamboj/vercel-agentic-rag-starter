"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Link from "next/link";
import { BrainCircuit, MessageSquare, Coffee } from "lucide-react";

export default function Home() {
  const chatOptions = [
    {
      title: "Multi-Model Chat",
      description:
        "Chat with multiple AI models including DeepSeek, Claude, and LLaMA",
      icon: <MessageSquare className="h-7 w-7" />,
      href: "/chat",
      bgColor: "bg-blue-100 dark:bg-blue-900/30",
      iconColor: "text-blue-600 dark:text-blue-400",
    },
    {
      title: "Knowledge Base Chat",
      description: "Chat with your knowledge base stored in Pinecone",
      icon: <BrainCircuit className="h-7 w-7" />,
      href: "/rag",
      bgColor: "bg-purple-100 dark:bg-purple-900/30",
      iconColor: "text-purple-600 dark:text-purple-400",
    },
    {
      title: "AI Agents Chat",
      description: "Interact with AI agents integrated with various tools",
      icon: <Coffee className="h-7 w-7" />,
      href: "/agents",
      bgColor: "bg-amber-100 dark:bg-amber-900/30",
      iconColor: "text-amber-600 dark:text-amber-400",
    },
  ];

  return (
    <div className="container mx-auto py-10">
      <h1 className="text-4xl font-bold mb-6">Welcome to AI Chat Platform</h1>
      <p className="text-muted-foreground mb-10">
        Select a chat type to get started with your AI conversation
      </p>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {chatOptions.map((option) => (
          <Card
            key={option.title}
            className="hover:shadow-md transition-shadow hover:border-gray-400 dark:hover:border-gray-600"
          >
            <CardHeader>
              <div className="flex items-center gap-3">
                <div
                  className={`p-3 rounded-full ${option.bgColor} ${option.iconColor} transition-transform hover:scale-110`}
                >
                  {option.icon}
                </div>
                <CardTitle>{option.title}</CardTitle>
              </div>
              <CardDescription>{option.description}</CardDescription>
            </CardHeader>
            <CardContent>
              <Button asChild className="w-full">
                <Link href={option.href}>Start Chat</Link>
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
