import "dotenv/config";
import { openai } from "@ai-sdk/openai";
import { streamText } from "ai";

const apiKey = process.env.AI_GATEWAY_API_KEY || process.env.OPENAI_API_KEY;

if (!apiKey) {
  console.error("Missing AI_GATEWAY_API_KEY or OPENAI_API_KEY in .env.local");
  process.exit(1);
}

async function main() {
  const result = streamText({
    model: openai("gpt-5.4", { apiKey }),
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
