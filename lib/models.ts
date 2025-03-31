export const models = [
  // Special Groq Models with custom configurations
  {
    model: "llama-3.1-8b-instant",
    company: "Groq",
    icon: "groq",
    provider: "groq",
    special: true,
  },
  {
    model: "deepseek-r1-distill-llama-70b",
    company: "Groq",
    icon: "groq",
    provider: "groq",
    special: true,
    middleware: "reasoning",
  },
  {
    model: "llama-3.3-70b-versatile",
    company: "Groq",
    icon: "groq",
    provider: "groq",
    special: true,
  },

  // Anthropic Models
  {
    model: "claude-3-opus-20240229",
    company: "Anthropic",
    icon: "anthropic",
    provider: "anthropic",
  },
  {
    model: "claude-3-sonnet-20240229",
    company: "Anthropic",
    icon: "anthropic",
    provider: "anthropic",
  },
  {
    model: "claude-3-haiku-20240307",
    company: "Anthropic",
    icon: "anthropic",
    provider: "anthropic",
  },
  {
    model: "claude-3.5-sonnet-20240620 (new)",
    company: "Anthropic",
    icon: "anthropic",
    provider: "anthropic",
  },
  {
    model: "claude-3-5-sonnet-v2-20241022 (new)",
    company: "Anthropic",
    icon: "anthropic",
    provider: "anthropic",
  },
  {
    model: "claude-3-5-haiku-20241022 (new)",
    company: "Anthropic",
    icon: "anthropic",
    provider: "anthropic",
  },
  {
    model: "claude-3-7-sonnet-20250219 (new)",
    company: "Anthropic",
    icon: "anthropic",
    provider: "anthropic",
  },

  // OpenAI Models
  {
    model: "gpt-4o",
    company: "OpenAI",
    icon: "openai",
    provider: "openai",
  },
  {
    model: "gpt-4-turbo",
    company: "OpenAI",
    icon: "openai",
    provider: "openai",
  },
  {
    model: "gpt-4",
    company: "OpenAI",
    icon: "openai",
    provider: "openai",
  },
  {
    model: "gpt-3.5-turbo",
    company: "OpenAI",
    icon: "openai",
    provider: "openai",
  },
  {
    model: "gpt-4o-mini (new)",
    company: "OpenAI",
    icon: "openai",
    provider: "openai",
  },
  {
    model: "gpt-4-vision (new)",
    company: "OpenAI",
    icon: "openai",
    provider: "openai",
  },

  // Mistral AI Models
  {
    model: "mistral-large-latest",
    company: "Mistral AI",
    icon: "mistral",
    provider: "mistral",
  },
  {
    model: "mistral-small-latest",
    company: "Mistral AI",
    icon: "mistral",
    provider: "mistral",
  },
  {
    model: "mistral-medium-latest (new)",
    company: "Mistral AI",
    icon: "mistral",
    provider: "mistral",
  },
  {
    model: "mistral-large-2-2405 (new)",
    company: "Mistral AI",
    icon: "mistral",
    provider: "mistral",
  },

  // Chrome AI Models
  {
    model: "text",
    company: "Chrome AI",
    icon: "chrome",
    provider: "chromeai",
  },

  // Groq Models
  {
    model: "gemma2-9b-it",
    company: "Groq",
    icon: "groq",
    provider: "groq",
  },
  {
    model: "gemma2-13b-it",
    company: "Groq",
    icon: "groq",
    provider: "groq",
  },
  {
    model: "gemma2-20b-it",
    company: "Groq",
    icon: "groq",
    provider: "groq",
  },
  {
    model: "llama3-70b-8192 (new)",
    company: "Groq",
    icon: "groq",
    provider: "groq",
  },
  {
    model: "llama3-8b-8192 (new)",
    company: "Groq",
    icon: "groq",
    provider: "groq",
  },

  // Cohere Models
  {
    model: "command-r (new)",
    company: "Cohere",
    icon: "cohere",
    provider: "cohere",
  },
  {
    model: "command-r+ (new)",
    company: "Cohere",
    icon: "cohere",
    provider: "cohere",
  },

  // Anthropic Models on AWS
  {
    model: "claude-3-sonnet-20240229-v1:0 (new)",
    company: "Anthropic on AWS",
    icon: "anthropic",
    provider: "aws",
  },
  {
    model: "claude-3-haiku-20240307-v1:0 (new)",
    company: "Anthropic on AWS",
    icon: "anthropic",
    provider: "aws",
  },

  // Azure OpenAI Models
  {
    model: "gpt-4-turbo (new)",
    company: "Azure OpenAI",
    icon: "openai",
    provider: "azure",
  },
  {
    model: "gpt-4o (new)",
    company: "Azure OpenAI",
    icon: "openai",
    provider: "azure",
  },
];

export type Model = {
  model: string;
  company: string;
  icon: string;
  provider: string;
  special?: boolean;
  middleware?: string;
};

export { models as Models };
