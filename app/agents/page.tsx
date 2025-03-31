import AgentWindow from "@/components/agent-window";
import { GuideInfoBox } from "@/components/guide/GuideInfoBox";

export default function Page() {
  const agentPrompts = [
    {
      title: "Coffee order",
      label: "Place a new order",
      action: "I'd like to order a large latte with oat milk and vanilla syrup",
    },
    {
      title: "Weather question",
      label: "Check current weather",
      action: "What's the weather like in Seattle today?",
    },
    {
      title: "Company info",
      label: "About CoffeeCorp LLC",
      action: "Tell me about CoffeeCorp LLC and their AI services",
    },
    {
      title: "Order status",
      label: "Check my order",
      action: "Can you check the status of my order #123?",
    },
    {
      title: "Cancel order",
      label: "Cancel my coffee order",
      action: "I need to cancel my coffee order #456",
    },
    {
      title: "About founder",
      label: "Who is Deepak Kamboj?",
      action: "Can you tell me about Deepak Kamboj?",
    },
  ];

  const AgentInfoCard = (
    <GuideInfoBox>
      <h1 className="text-3xl font-semibold mb-4">Chat with Agents</h1>
      <p className="mb-4 text-xl">
        Meet Meg, your AI assistant for coffee orders and more, powered by
        CoffeeCorp LLC&apos;s Agentic RAG technology.
      </p>
      <ul className="space-y-2 mb-4">
        <li className="flex items-start">
          <span className="mr-2">☕</span>
          <span>
            <strong>Coffee Orders:</strong> Order coffee with customized
            preferences
          </span>
        </li>
        <li className="flex items-start">
          <span className="mr-2">🔍</span>
          <span>
            <strong>Order Management:</strong> Check status or cancel existing
            orders
          </span>
        </li>
        <li className="flex items-start">
          <span className="mr-2">☁️</span>
          <span>
            <strong>Weather Updates:</strong> Get current weather conditions for
            any location
          </span>
        </li>
        <li className="flex items-start">
          <span className="mr-2">ℹ️</span>
          <span>
            <strong>Company Info:</strong> Learn about CoffeeCorp LLC and its
            founder
          </span>
        </li>
      </ul>
      <p className="mt-4 font-medium">
        Try ordering coffee, checking the weather, or asking about CoffeeCorp
        LLC!
      </p>
      <p className="text-sm text-gray-500 italic mt-5">
        Developed by CoffeeCorp LLC for Microsoft Ignite 2024
      </p>
    </GuideInfoBox>
  );

  return (
    <AgentWindow
      suggestedPrompts={agentPrompts}
      emptyStateComponent={AgentInfoCard}
      endpoint="api/agents"
    />
  );
}
