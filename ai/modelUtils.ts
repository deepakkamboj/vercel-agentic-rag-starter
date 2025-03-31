import { groq } from "@ai-sdk/groq";
import { openai } from "@ai-sdk/openai";
import { anthropic } from "@ai-sdk/anthropic";
import { mistral } from "@ai-sdk/mistral";
import { extractReasoningMiddleware, wrapLanguageModel } from "ai";
import { Models, Model } from "@/lib/models";

// Helper to get provider function
export function getProviderFunction(provider: string, modelName: string) {
  switch (provider) {
    case "openai":
      return openai(modelName);
    case "anthropic":
      return anthropic(modelName);
    case "groq":
      return groq(modelName);
    case "mistral":
      return mistral(modelName);
    case "aws":
      return anthropic(modelName); // Using Anthropic for AWS models
    case "azure":
      return openai(modelName); // Using OpenAI for Azure models
    case "cohere":
      return mistral(modelName); // Temporary fallback
    case "chromeai":
      return openai(modelName); // Temporary fallback
    default:
      return null;
  }
}

// Special model handling
export function getSpecialModelConfig(model: Model) {
  const modelName = model.model.replace(/ \(new\)$/, "");

  if (modelName === "deepseek-r1-distill-llama-70b") {
    return wrapLanguageModel({
      middleware: extractReasoningMiddleware({
        tagName: "think",
      }),
      model: groq(modelName),
    });
  }

  return getProviderFunction(model.provider, modelName);
}

// Generate language models from models.ts
export function extractLanguageModels() {
  const languageModels: Record<string, any> = {};

  Models.forEach((model) => {
    // Clean the model name by removing any " (new)" suffix
    const modelName = model.model.replace(/ \(new\)$/, "");

    if (model.special) {
      if (model.middleware === "reasoning") {
        languageModels[modelName] = wrapLanguageModel({
          middleware: extractReasoningMiddleware({
            tagName: "think",
          }),
          model: groq(modelName),
        });
      } else {
        languageModels[modelName] = groq(modelName);
      }
    } else {
      const providerFn = getProviderFunction(model.provider, modelName);
      if (providerFn) {
        languageModels[modelName] = providerFn;
      }
    }
  });

  return languageModels;
}

// Default models for each provider
export const DEFAULT_MODELS = {
  openai: "gpt-4o",
  anthropic: "claude-3-opus-20240229",
  groq: "deepseek-r1-distill-llama-70b",
  mistral: "mistral-large-latest",
  aws: "claude-3-sonnet-20240229-v1:0",
  azure: "gpt-4o",
  cohere: "command-r+",
  chromeai: "text",
};

// Function to determine provider from model name using models.ts
export function getProviderFromModelName(modelName: string): AIProvider {
  // Clean the model name by removing any "(new)" suffix
  const cleanModelName = modelName.replace(/ \(new\)$/, "");

  // Find the model in our models list
  const modelEntry = Models.find(
    (model) => model.model === cleanModelName || model.model === modelName
  );

  if (modelEntry) {
    return modelEntry.provider as AIProvider;
  }

  // Fallback logic if the model isn't in our list
  if (modelName.includes("claude")) {
    return modelName.includes("aws") ? "aws" : "anthropic";
  } else if (modelName.includes("gpt") || modelName.includes("text-davinci")) {
    return modelName.includes("azure") ? "azure" : "openai";
  } else if (modelName.includes("mistral") || modelName.includes("mixtral")) {
    return "mistral";
  } else if (
    modelName.includes("llama") ||
    modelName.includes("gemma") ||
    modelName.includes("deepseek")
  ) {
    return "groq";
  } else if (modelName.includes("command")) {
    return "cohere";
  }

  // Default fallback
  return "groq";
}

// Types
export type AIProvider =
  | "openai"
  | "anthropic"
  | "groq"
  | "mistral"
  | "aws"
  | "azure"
  | "cohere"
  | "chromeai";
