import {
  convertToModelMessages,
  streamText,
  type UIMessage,
} from "ai";
import { createOpenAI } from "@ai-sdk/openai";
import { buildAssistantSystemPrompt } from "@/lib/assistant-knowledge";

export const maxDuration = 30;

const ALLOWED_LOCALES = new Set(["en", "ru", "tr", "de", "az"]);

type ChatBody = {
  messages?: UIMessage[];
  locale?: string;
};

export async function POST(req: Request) {
  const apiKey = process.env.OPENAI_API_KEY;
  if (!apiKey) {
    return Response.json(
      {
        error:
          "Assistant is not configured yet. Add OPENAI_API_KEY in the project environment.",
      },
      { status: 503 },
    );
  }

  let body: ChatBody;
  try {
    body = (await req.json()) as ChatBody;
  } catch {
    return Response.json({ error: "Invalid request body." }, { status: 400 });
  }

  const messages = body.messages ?? [];
  if (!Array.isArray(messages) || messages.length === 0) {
    return Response.json({ error: "Messages are required." }, { status: 400 });
  }

  if (messages.length > 24) {
    return Response.json(
      { error: "Conversation is too long. Please start a new chat." },
      { status: 400 },
    );
  }

  const locale =
    typeof body.locale === "string" && ALLOWED_LOCALES.has(body.locale)
      ? body.locale
      : "en";

  const openai = createOpenAI({ apiKey });
  const modelId = process.env.OPENAI_MODEL ?? "gpt-4.1-mini";

  const result = streamText({
    model: openai(modelId),
    system: buildAssistantSystemPrompt(locale),
    messages: await convertToModelMessages(messages),
    temperature: 0.4,
  });

  return result.toUIMessageStreamResponse();
}
