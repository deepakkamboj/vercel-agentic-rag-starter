"use client";
import { modelID } from "@/ai/providers";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";

interface ModelPickerProps {
  selectedModel: modelID;
  setSelectedModel: (model: modelID) => void;
}

const MODELS: Record<modelID, string> = {
  "llama-3.1-8b-instant": "A fast cheap model",
  "deepseek-r1-distill-llama-70b": "A reasoning model",
  "llama-3.3-70b-versatile": "A large model",
  "claude-3-7-sonnet-20250219": "Claude 3.7 Sonnet",
  "claude-3-7-sonnet-20250219-reasoning": "Claude 3.7 Sonnet (Reasoning)",
  "mistral-large-latest": "Mistral Large",
  "mistral-small-latest": "Mistral Small",
  "ministral-3b-latest": "Ministral 3B",
};

export const ModelPicker = ({
  selectedModel,
  setSelectedModel,
}: ModelPickerProps) => {
  return (
    <div className="absolute bottom-2 left-2 flex flex-col gap-2">
      <Select value={selectedModel} onValueChange={setSelectedModel}>
        <SelectTrigger className="">
          <SelectValue placeholder="Select a model" />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            {Object.entries(MODELS).map(([modelId]) => (
              <SelectItem key={modelId} value={modelId}>
                {modelId}
              </SelectItem>
            ))}
          </SelectGroup>
        </SelectContent>
      </Select>
    </div>
  );
};
