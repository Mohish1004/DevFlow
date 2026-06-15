"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Sparkles } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { DemoBadge } from "@/components/workspace/DemoBadge";
import { EmptyState } from "@/components/workspace/EmptyState";
import { PageHeader } from "@/components/workspace/PageHeader";
import { suggestedAssistantPrompts } from "@/lib/workspace-data";
import { getAssistantResponse } from "@/services/assistant-service";

const assistantSchema = z.object({
  prompt: z.string().min(6, "Enter a prompt for the assistant"),
});

type AssistantFormValues = z.infer<typeof assistantSchema>;

export function AssistantWorkspace() {
  const [response, setResponse] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const {
    formState: { errors },
    handleSubmit,
    register,
    setValue,
  } = useForm<AssistantFormValues>({
    defaultValues: { prompt: "" },
    resolver: zodResolver(assistantSchema),
  });

  return (
    <div className="space-y-6">
      <PageHeader
        description="Assistant replies are clearly labeled demo until backend retrieval and a real LLM provider are connected."
        eyebrow="Assistant"
        showDemoBadge
        title="Ask the workspace assistant"
      />
      <div className="grid gap-4 xl:grid-cols-[0.9fr,1.1fr]">
        <form
          className="workspace-card rounded-[1.75rem] p-6"
          onSubmit={handleSubmit(async (values) => {
            setLoading(true);
            try {
              const nextResponse = await getAssistantResponse(values.prompt);
              setResponse(nextResponse);
            } finally {
              setLoading(false);
            }
          })}
        >
          <p className="text-xl font-semibold tracking-[-0.04em]">Suggested prompts</p>
          <div className="mt-5 flex flex-wrap gap-2">
            {suggestedAssistantPrompts.map((prompt) => (
              <button
                className="rounded-full border border-white/10 px-3 py-2 text-sm text-white/80"
                key={prompt}
                onClick={() => setValue("prompt", prompt)}
                type="button"
              >
                {prompt}
              </button>
            ))}
          </div>
          <textarea
            className="mt-5 min-h-32 w-full rounded-[1.5rem] border border-white/10 bg-black/20 px-4 py-3 text-sm outline-none"
            placeholder="Ask for review guidance, release risks, or sprint summaries"
            {...register("prompt")}
          />
          {errors.prompt ? <span className="mt-2 block text-xs text-rose-300">{errors.prompt.message}</span> : null}
          <button className="mt-5 rounded-full bg-white px-5 py-3 text-sm font-semibold text-zinc-950" disabled={loading} type="submit">
            {loading ? "Thinking…" : "Send prompt"}
          </button>
        </form>
        <div className="workspace-card rounded-[1.75rem] p-6">
          <div className="flex items-center justify-between gap-3">
            <div className="flex items-center gap-3">
              <Sparkles className="h-5 w-5 text-white/70" />
              <p className="text-xl font-semibold tracking-[-0.04em]">Assistant reply</p>
            </div>
            <DemoBadge label="Demo AI" />
          </div>
          {response ? (
            <div className="mt-5 rounded-[1.5rem] border border-white/10 bg-black/20 p-5 text-sm leading-8 text-white/84">
              {response}
            </div>
          ) : (
            <div className="mt-5">
              <EmptyState
                description="Responses must show loading, empty, and demo labeling until a real backend assistant endpoint exists."
                title="No assistant response yet"
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
