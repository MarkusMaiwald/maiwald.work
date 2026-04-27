import { generateChatResponse } from '@shared/ai';

if (!process.env.GLM5_API_KEY) {
  console.warn(
    '[ai] GLM5_API_KEY is not set. /api/ai/chat will fail until you add it to .env and restart the dev server.',
  );
} else {
  const baseUrl = process.env.GLM_BASE_URL || 'https://api.z.ai/api/coding/paas/v4';
  const model = process.env.GLM_MODEL || 'glm-5.1';
  console.info(`[ai] AI chat ready: model=${model} baseUrl=${baseUrl}`);
}

export async function generateAIResponse(userMessage: string): Promise<string> {
  const apiKey = process.env.GLM5_API_KEY;
  if (!apiKey) {
    throw new Error(
      'GLM5_API_KEY is not set. Add it to .env (or your deployment secrets) before using the AI chat.',
    );
  }

  return generateChatResponse(userMessage, {
    apiKey,
    baseUrl: process.env.GLM_BASE_URL,
    model: process.env.GLM_MODEL,
    thinking: /^(1|true|on|yes)$/i.test(process.env.GLM_THINKING ?? ''),
  });
}
