import { customProvider } from "ai";
import { extractLanguageModels, DEFAULT_MODELS } from "./modelUtils";

// Custom provider with models from models.ts
export const model = customProvider({
  languageModels: extractLanguageModels(),
});

// Export default models
export { DEFAULT_MODELS };

// Define provider type
export type AIProvider = keyof typeof DEFAULT_MODELS;

// Define model ID type
export type modelID = Parameters<(typeof model)["languageModel"]>["0"];
