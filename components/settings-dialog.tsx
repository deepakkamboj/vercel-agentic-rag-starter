"use client";

import { useState, useMemo, useEffect } from "react";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Models } from "@/lib/models";
import { ModelIcon } from "@/components/model-icon";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Badge } from "@/components/ui/badge";
import { useModel } from "@/hooks/use-model";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { AlertCircle } from "lucide-react";

interface SettingsDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function SettingsDialog({ open, onOpenChange }: SettingsDialogProps) {
  const [apiUrl, setApiUrl] = useState("https://api.openai.com/v1");
  const [apiKey, setApiKey] = useState("");
  const { selectedModel, setSelectedModel } = useModel();
  const [tempSelectedModel, setTempSelectedModel] = useState(
    selectedModel.model
  );
  const [apiKeyStatus, setApiKeyStatus] = useState<Record<string, boolean>>({});

  // Update tempSelectedModel when selectedModel changes or dialog opens
  useEffect(() => {
    if (open) {
      setTempSelectedModel(selectedModel.model);
      checkApiKeys();
    }
  }, [selectedModel, open]);

  // Check which API keys are available
  const checkApiKeys = () => {
    // This is a client-side component, so we can't directly access process.env
    // Instead, we'll make a lightweight API call to check each provider
    const checkProviders = async () => {
      try {
        const response = await fetch("/api/check-api-keys");
        if (response.ok) {
          const data = await response.json();
          setApiKeyStatus(data);
        }
      } catch (error) {
        console.error("Failed to check API keys:", error);
      }
    };

    checkProviders();
  };

  // Group models by company
  const modelsByCompany = useMemo(() => {
    const grouped = Models.reduce((acc, model) => {
      if (!acc[model.company]) {
        acc[model.company] = [];
      }
      acc[model.company].push(model);
      return acc;
    }, {} as Record<string, typeof Models>);

    // Sort companies alphabetically
    return Object.keys(grouped)
      .sort()
      .reduce((acc, company) => {
        acc[company] = grouped[company];
        return acc;
      }, {} as Record<string, typeof Models>);
  }, []);

  // Check if model name contains "(new)" to highlight it
  const isNewModel = (modelName: string) => {
    return modelName.includes("(new)");
  };

  // Handle save changes
  const handleSaveChanges = () => {
    // Find the full model object from the selected model ID
    const modelToSave = Models.find(
      (model) => model.model === tempSelectedModel
    );
    if (modelToSave) {
      setSelectedModel(modelToSave);
    }
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Settings</DialogTitle>
          <DialogDescription>
            Configure your API settings and preferences
          </DialogDescription>
        </DialogHeader>
        <Tabs defaultValue="api">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="api">API Settings</TabsTrigger>
            <TabsTrigger value="models">Models</TabsTrigger>
          </TabsList>
          <TabsContent value="api" className="space-y-4 pt-4">
            <div className="space-y-2">
              <Label htmlFor="api-url">API URL</Label>
              <Input
                id="api-url"
                value={apiUrl}
                onChange={(e) => setApiUrl(e.target.value)}
                placeholder="https://api.openai.com/v1"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="api-key">API Key</Label>
              <Input
                id="api-key"
                type="password"
                value={apiKey}
                onChange={(e) => setApiKey(e.target.value)}
                placeholder="Enter your API key"
              />
            </div>
            <Alert>
              <AlertCircle className="h-4 w-4" />
              <AlertTitle>API Keys</AlertTitle>
              <AlertDescription>
                API keys are configured in your .env.local file. The following
                providers have keys configured:
                <ul className="mt-2 list-disc pl-5">
                  {Object.entries(apiKeyStatus).map(
                    ([provider, isAvailable]) => (
                      <li
                        key={provider}
                        className={
                          isAvailable ? "text-green-600" : "text-red-600"
                        }
                      >
                        {provider} -{" "}
                        {isAvailable ? "Available" : "Not configured"}
                      </li>
                    )
                  )}
                </ul>
              </AlertDescription>
            </Alert>
          </TabsContent>
          <TabsContent value="models" className="space-y-4 pt-4">
            <div className="space-y-2">
              <Label htmlFor="model">Default Model</Label>
              <Select
                value={tempSelectedModel}
                onValueChange={setTempSelectedModel}
              >
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select a model">
                    {tempSelectedModel && (
                      <div className="flex items-center gap-2">
                        <ModelIcon
                          provider={
                            Models.find((m) => m.model === tempSelectedModel)
                              ?.provider || "openai"
                          }
                          className="h-4 w-4"
                        />
                        <span>{tempSelectedModel.replace(" (new)", "")}</span>
                        {isNewModel(tempSelectedModel) && (
                          <Badge
                            variant="outline"
                            className="ml-2 bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-100 text-[10px] py-0 px-1.5"
                          >
                            NEW
                          </Badge>
                        )}
                      </div>
                    )}
                  </SelectValue>
                </SelectTrigger>
                <SelectContent>
                  <ScrollArea className="h-80">
                    {Object.entries(modelsByCompany).map(
                      ([company, models]) => (
                        <SelectGroup key={company}>
                          <SelectLabel>{company}</SelectLabel>
                          {models.map((model) => (
                            <SelectItem key={model.model} value={model.model}>
                              <div className="flex items-center gap-2">
                                <ModelIcon
                                  provider={model.provider}
                                  className="h-4 w-4"
                                />
                                <span>{model.model.replace(" (new)", "")}</span>
                                {isNewModel(model.model) && (
                                  <Badge
                                    variant="outline"
                                    className="ml-2 bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-100 text-[10px] py-0 px-1.5"
                                  >
                                    NEW
                                  </Badge>
                                )}
                              </div>
                            </SelectItem>
                          ))}
                        </SelectGroup>
                      )
                    )}
                  </ScrollArea>
                </SelectContent>
              </Select>
              <p className="text-xs text-muted-foreground mt-2">
                The selected model will be used for all chat conversations. Make
                sure you have the appropriate API keys configured for the
                selected model provider.
              </p>
            </div>
            <div className="space-y-2">
              <Label>API Provisioning</Label>
              <div className="rounded-md border p-4">
                <p className="text-sm text-muted-foreground">
                  Your current plan:{" "}
                  <span className="font-medium">Free Tier</span>
                </p>
                <Button className="mt-4" variant="outline" size="sm">
                  Upgrade Plan
                </Button>
              </div>
            </div>
          </TabsContent>
        </Tabs>
        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button onClick={handleSaveChanges}>Save Changes</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
