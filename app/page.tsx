import ChatWindow from "@/components/chat-window";
import { GuideInfoBox } from "@/components/guide/GuideInfoBox";

export default function Page() {
  const chatBotPrompts = [
    {
      title: "General information",
      label: "Tell me about yourself",
      action:
        "Tell me about your capabilities and what kind of questions I can ask you.",
    },
    {
      title: "Writing help",
      label: "Draft an email",
      action:
        "Can you help me draft a professional email to schedule a meeting with a client?",
    },
    {
      title: "Explain concept",
      label: "What is machine learning?",
      action: "Could you explain what machine learning is in simple terms?",
    },
    {
      title: "Creative ideas",
      label: "Brainstorm project ideas",
      action:
        "Brainstorm some creative project ideas for a web app that uses AI.",
    },
    {
      title: "Knowledge question",
      label: "How does photosynthesis work?",
      action: "How does the process of photosynthesis work in plants?",
    },
    {
      title: "Problem solving",
      label: "Debug an issue",
      action:
        "How can I debug this error: 'TypeError: Cannot read property 'value' of undefined'?",
    },
  ];

  const InfoCard = (
    <GuideInfoBox>
      <h2 className="text-2xl font-semibold mb-4">AI Assistant</h2>
      <p className="mb-4">
        Welcome to the AI Assistant! This is a general-purpose AI chat interface
        powered by state-of-the-art language models.
      </p>
      <ul className="space-y-2 mb-4">
        <li className="flex items-start">
          <span className="mr-2">💬</span>
          <span>
            Ask questions, get explanations, or request help with various tasks
          </span>
        </li>
        <li className="flex items-start">
          <span className="mr-2">📝</span>
          <span>
            Get assistance with writing, brainstorming, or creative content
          </span>
        </li>
        <li className="flex items-start">
          <span className="mr-2">🧩</span>
          <span>Solve problems, debug code, or explore new concepts</span>
        </li>
        <li className="flex items-start">
          <span className="mr-2">🔍</span>
          <span>
            The more specific your questions, the better the responses
          </span>
        </li>
      </ul>
      <p className="text-sm text-gray-500 italic">
        This chat interface uses the AI SDK to connect with powerful language
        models
      </p>
    </GuideInfoBox>
  );

  return (
    <ChatWindow
      endpoint="api/chat"
      suggestedPrompts={chatBotPrompts}
      emptyStateComponent={InfoCard}
    />
  );
}
