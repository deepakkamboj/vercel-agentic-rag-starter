"use client";

import { useEffect, useState } from "react";
import { models, type Model } from "@/lib/models";

// Default model (first in the list or fallback to Mistral model)
const DEFAULT_MODEL: Model =
  models.length > 0
    ? models[0]
    : {
        model: "mistral-large-latest",
        company: "Mistral AI",
        icon: "mistral",
        provider: "mistral",
      };

export function useModel() {
  const [selectedModel, setSelectedModel] = useState<Model>(DEFAULT_MODEL);
  const [isLoaded, setIsLoaded] = useState(false);

  // Load the selected model from localStorage on component mount
  useEffect(() => {
    const storedModel = localStorage.getItem("selectedModel");
    if (storedModel) {
      try {
        const parsedModel = JSON.parse(storedModel);
        // Validate that the model exists in our list
        const modelExists = models.some(
          (m) =>
            m.model === parsedModel.model && m.provider === parsedModel.provider
        );
        if (modelExists) {
          setSelectedModel(parsedModel);
        }
      } catch (error) {
        console.error("Error parsing stored model:", error);
        // If there's an error, use the default model
        setSelectedModel(DEFAULT_MODEL);
      }
    }
    setIsLoaded(true);
  }, []);

  // Save the selected model to localStorage whenever it changes
  useEffect(() => {
    if (isLoaded) {
      localStorage.setItem("selectedModel", JSON.stringify(selectedModel));
    }
  }, [selectedModel, isLoaded]);

  return {
    selectedModel,
    setSelectedModel,
    isLoaded,
  };
}
