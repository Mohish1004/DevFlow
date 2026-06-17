import dotenv from "dotenv";
dotenv.config({ path: ".env.local" });
import { streamText } from "ai";

if (!process.env.AI_GATEWAY_API_KEY && !process.env.OPENAI_API_KEY) {
  console.error("Missing AI_GATEWAY_API_KEY or OPENAI_API_KEY in .env.local");
  process.exit(1);
}

async function main() {
  const result = streamText({
    // AI SDK auto-detects the AI Gateway provider when model is a "provider/model" string
    model: "openai/gpt-5.4",
    prompt: "Write a short poem about building software with AI.",
    onFinish: ({ usage }) => {
      console.log("\n--- Token Usage ---");
      console.log(`Prompt tokens:      ${usage.promptTokens}`);
      console.log(`Completion tokens:  ${usage.completionTokens}`);
      console.log(`Total tokens:       ${usage.totalTokens}`);
    },
  });

  console.log("Response:\n");
  for await (const chunk of result.textStream) {
    process.stdout.write(chunk);
  }
  console.log("\n");
}

main().catch(console.error);
