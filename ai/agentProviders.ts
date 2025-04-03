import { groq } from "@ai-sdk/groq";
import { anthropic, AnthropicProviderOptions } from "@ai-sdk/anthropic";
import { mistral } from "@ai-sdk/mistral";
import {
  customProvider,
  defaultSettingsMiddleware,
  extractReasoningMiddleware,
  wrapLanguageModel,
} from "ai";

// custom provider with different model settings:
export const agentModel = customProvider({
  languageModels: {
    "llama-3.1-8b-instant": groq("llama-3.1-8b-instant"),
    "deepseek-r1-distill-llama-70b": wrapLanguageModel({
      middleware: extractReasoningMiddleware({
        tagName: "think",
      }),
      model: groq("deepseek-r1-distill-llama-70b"),
    }),
    "llama-3.3-70b-versatile": groq("llama-3.3-70b-versatile"),

    // Claude
    "claude-3-7-sonnet-20250219": anthropic("claude-3-7-sonnet-20250219"),

    "claude-3-7-sonnet-20250219-reasoning": wrapLanguageModel({
      model: anthropic("claude-3-7-sonnet-20250219"),
      middleware: defaultSettingsMiddleware({
        settings: {
          maxTokens: 100000, // example default setting
          providerMetadata: {
            anthropic: {
              thinking: {
                type: "enabled",
                budgetTokens: 32000,
              },
            } satisfies AnthropicProviderOptions,
          },
        },
      }),
    }),
    // Mistral
    "mistral-large-latest": mistral("mistral-large-latest"),
    "mistral-small-latest": mistral("mistral-small-latest"),
    "ministral-3b-latest": mistral("ministral-3b-latest"),
  },
});

export type agentModelID = Parameters<
  (typeof agentModel)["languageModel"]
>["0"];
