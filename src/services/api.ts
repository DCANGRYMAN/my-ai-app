export const openAIService = {
  async chat(prompt: string): Promise<string> {
    const apiKey = import.meta.env.VITE_OPENAI_API_KEY;

    if (!apiKey) {
      const responses = [
        "Essa é uma resposta mock da IA.",
        "Simulando a OpenAI aqui!",
        `Você disse: "${prompt}". Resposta de mock.`,
      ];
      return responses[Math.floor(Math.random() * responses.length)];
    }

    try {
      const res = await fetch("https://api.openai.com/v1/chat/completions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${apiKey}`,
        },
        body: JSON.stringify({
          model: "gpt-3.5-turbo",
          messages: [{ role: "user", content: prompt }],
        }),
      });

      if (!res.ok) throw new Error("Request failed");

      const data = await res.json();
      return data.choices?.[0]?.message?.content?.trim() || "[No response]";
    } catch (err) {
      console.warn("❌ OpenAI request failed, usando fallback mock:", err);
      const responses = [
        "Essa é uma resposta mock da IA (erro na API).",
        "Simulando a OpenAI após falha.",
        `Você disse: "${prompt}". Resposta mock por erro.`,
      ];
      return responses[Math.floor(Math.random() * responses.length)];
    }
  },
};
