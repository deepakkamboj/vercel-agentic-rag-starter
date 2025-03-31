import { AnthropicIcon } from "@/components/icons/anthropic-icon"
import { GoogleIcon } from "@/components/icons/google-icon"
import { MistralIcon } from "@/components/icons/mistral-icon"
import { OpenAIIcon } from "@/components/icons/openai-icon"
import { GroqIcon } from "@/components/icons/groq-icon"
import { CohereIcon } from "@/components/icons/cohere-icon"
import { AwsIcon } from "@/components/icons/aws-icon"
import { AzureIcon } from "@/components/icons/azure-icon"
import { ChromeIcon } from "@/components/icons/chrome-icon"

type ModelIconProps = {
  provider: string
  className?: string
}

export function ModelIcon({ provider, className }: ModelIconProps) {
  switch (provider.toLowerCase()) {
    case "openai":
      return <OpenAIIcon className={className} />
    case "anthropic":
      return <AnthropicIcon className={className} />
    case "vertex":
    case "google":
      return <GoogleIcon className={className} />
    case "mistral":
      return <MistralIcon className={className} />
    case "groq":
      return <GroqIcon className={className} />
    case "cohere":
      return <CohereIcon className={className} />
    case "aws":
      return <AwsIcon className={className} />
    case "azure":
      return <AzureIcon className={className} />
    case "chromeai":
      return <ChromeIcon className={className} />
    default:
      return <OpenAIIcon className={className} />
  }
}

