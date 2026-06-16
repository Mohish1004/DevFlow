import { api } from "./api-client";

type AssistantResponse = {
  reply: string;
};

export async function getAssistantResponse(prompt: string): Promise<string> {
  try {
    const data = await api.post<AssistantResponse>("/api/assistant", { prompt });
    return data.reply;
  } catch {
    return "AI assistant is unavailable right now. Please try again later.";
  }
}
