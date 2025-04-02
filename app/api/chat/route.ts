import { openai } from "@ai-sdk/openai";
import { anthropic } from "@ai-sdk/anthropic";
import { groq } from "@ai-sdk/groq";
import { mistral } from "@ai-sdk/mistral";

import { streamText, UIMessage } from "ai";
import { NextResponse } from "next/server";
import { modelID } from "@/ai/providers";
import { getProviderFromModelName } from "@/ai/modelUtils";

// Allow streaming responses up to 30 seconds
export const maxDuration = 30;
export const runtime = "edge";

export async function POST(req: Request) {
  try {
    // Parse and validate request
    const {
      messages,
      selectedModel,
    }: { messages: UIMessage[]; selectedModel: modelID } = await req.json();

    console.log(
      `Request: ${JSON.stringify({ messages, selectedModel }, null, 2)}`
    );

    // Determine provider based on model name using our models.ts data
    const provider = getProviderFromModelName(selectedModel);
    console.log(`Using provider: ${provider} for model: ${selectedModel}`);

    // Select provider based on detected provider type
    const providerMap = {
      openai: () => openai(selectedModel),
      anthropic: () => anthropic(selectedModel),
      groq: () => groq(selectedModel),
      mistral: () => mistral(selectedModel),
      aws: () => anthropic(selectedModel), // Using anthropic for AWS models
      azure: () => openai(selectedModel), // Using openai for Azure models
      cohere: () => mistral(selectedModel), // Temporary fallback
      chromeai: () => openai(selectedModel), // Temporary fallback
    };

    const selectedProvider = providerMap[provider]();

    if (!selectedProvider) {
      throw new Error(`Invalid provider: ${provider}`);
    }

    // Stream response
    const result = await streamText({
      model: selectedProvider,
      messages,
      temperature: 0.7,
      maxTokens: 1000,
      experimental_telemetry: {
        isEnabled: true,
      },
    });

    console.log("Response initiated from AI provider");

    return result.toDataStreamResponse({ sendReasoning: true });
  } catch (error) {
    console.error("Error in chat endpoint:", error);
    const errorMessage =
      error instanceof Error ? error.message : "Unknown error";
    return NextResponse.json(
      { error: "Failed to process chat request. " + errorMessage },
      { status: 500 }
    );
  }
}
