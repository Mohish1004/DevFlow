const demoResponses: Record<string, string> = {
  default:
    "Demo mode: I can summarize visible mock workspace data and suggest next steps, but I do not have real backend retrieval or live repository context yet.",
  release:
    "Demo mode: release risk is concentrated around auth verification, persistent task state, and honest integration status messaging.",
  review:
    "Demo mode: a strong review checklist should confirm GitHub link validity, status transitions, required comments, and explicit approve/changes-required outcomes.",
};

export async function getAssistantResponse(prompt: string) {
  await new Promise((resolve) => setTimeout(resolve, 600));

  const lower = prompt.toLowerCase();

  if (lower.includes("release")) {
    return demoResponses.release;
  }

  if (lower.includes("review")) {
    return demoResponses.review;
  }

  return demoResponses.default;
}
