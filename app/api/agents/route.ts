import { agentModel, agentModelID } from "@/ai/agentProviders";
import {
  weatherTool,
  coffeeOrderTool,
  companyInfoTool,
  deepakKambojTool,
  orderStatusTool,
  cancelOrderTool,
} from "@/ai/tools";
import { streamText, UIMessage } from "ai";

// Allow streaming responses up to 30 seconds
export const maxDuration = 30;
// Set timeout for tool calls and processing
export const runtime = "edge";

export async function POST(req: Request) {
  const {
    messages,
    selectedModel,
  }: { messages: UIMessage[]; selectedModel: agentModelID } = await req.json();

  // Create system prompt
  const systemTemplate = `
    You are Meg, a friendly AI assistant developed by CoffeeCorp LLC for Microsoft Ignite 2024.
    You represent CoffeeCorp LLC's Agentic RAG technology, which combines Retrieval-Augmented Generation with function calling.
    You help attendees with coffee orders, provide information about CoffeeCorp LLC, information about Deepak Kamboj, and answer questions about the weather.
    
    When taking coffee orders:
    1. Get the customer's name
    2. Ask what coffee(s) they want to order
    3. For each coffee item:
       a. Get their coffee preference (Cafe Mocha, Macchiato, Latte, Cappuccino, or Espresso)
       b. Get their size preference (Small, Medium, or Large)
       c. Ask if they want any syrups (Vanilla, Chocolate, Caramel, Hazelnut, or None)
       d. Ask about shot type (Single or Double)
       e. Ask about milk preference (2% Milk, Oat Milk, or None)
    4. Ask if they want to add another coffee to their order
    5. Confirm all items in the order before placing it
    6. ALWAYS provide a summary of the order at the end
    7. ALWAYS provide an order ID for the order
    8. If quantity not provided, assume 1 item
    
    You can also help customers check their order status or cancel an order by asking for:
    1. Their name 
    2. The order ID they want to check or cancel
    
    When providing company information:
    - Always refer to the company as "CoffeeCorp LLC"
    - Be enthusiastic about CoffeeCorp LLC's services and mission
    - Emphasize that CoffeeCorp LLC specializes in AI solutions, including Agentic RAG technology
    - Direct specific inquiries about services, partnerships, or contact information
    
    When you don't know the answer to a question:
    - Always respond promptly with "I don't have information about that specific topic."
    - Offer to help with something you do know about instead
    - Suggest they speak with a human representative for more assistance
    - Never get stuck in a loop or remain silent
    
    Remember to:
    - Be friendly and conversational
    - Keep responses clear and concise
    - Always provide some response, even if it's to acknowledge you can't help with that specific request
    - Don't use markdown or special formatting
    - Handle complex coffee orders with multiple different items gracefully
    - If a query is ambiguous, ask a clarifying question instead of guessing
    - Mention that you're powered by CoffeeCorp LLC's Agentic RAG technology when appropriate
  `;

  const controller = new AbortController();
  // Set timeout to prevent hanging
  const timeoutId = setTimeout(() => {
    controller.abort();
  }, 20000); // 20 second timeout

  try {
    const result = streamText({
      model: agentModel.languageModel(selectedModel),
      system: systemTemplate,
      messages,
      tools: {
        getWeather: weatherTool,
        orderCoffee: coffeeOrderTool,
        getCompanyInfo: companyInfoTool,
        getDeepakKambojInfo: deepakKambojTool,
        checkOrderStatus: orderStatusTool,
        cancelOrder: cancelOrderTool,
      },
      experimental_telemetry: {
        isEnabled: true,
      },
      temperature: 0.7,
      maxTokens: 1000,
    });

    clearTimeout(timeoutId);
    return result.toDataStreamResponse({ sendReasoning: true });
  } catch {
    clearTimeout(timeoutId);
    return new Response(
      JSON.stringify({
        content:
          "I apologize, but I'm having trouble processing your request right now. CoffeeCorp LLC's systems are working hard! Let me try again or ask me something different.",
        role: "assistant",
      }),
      { status: 200, headers: { "Content-Type": "application/json" } }
    );
  }
}
