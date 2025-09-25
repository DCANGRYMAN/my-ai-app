import { useState } from "react";
import { openAIService } from "../services/api";

export function useChat() {
  const [messages, setMessages] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);

  async function sendMessage(prompt: string) {
    setLoading(true);
    const reply = await openAIService.chat(prompt);
    setMessages(prev => [...prev, `You: ${prompt}`, `AI: ${reply}`]);
    setLoading(false);
  }

  return { messages, sendMessage, loading };
}
