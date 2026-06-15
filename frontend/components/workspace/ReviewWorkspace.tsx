"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { ExternalLink, GitPullRequest, MessageSquare } from "lucide-react";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { EmptyState } from "@/components/workspace/EmptyState";
import { PageHeader } from "@/components/workspace/PageHeader";
import type { ReviewStatus } from "@/lib/workspace-types";
import { useAuthStore } from "@/stores/auth-store";
import { useReviewStore } from "@/stores/review-store";

const statuses: ReviewStatus[] = [
  "Waiting for Review",
  "Reviewing",
  "Changes Required",
  "Approved",
  "Rejected",
  "Merged",
];

const reviewSchema = z.object({
  githubLink: z.string().url("GitHub URL is required"),
  message: z.string().min(12, "Add enough context for the reviewer"),
  reviewer: z.string().min(2, "Reviewer name is required"),
  taskTitle: z.string().min(3, "Task title is required"),
});

type ReviewFormValues = z.infer<typeof reviewSchema>;

export function ReviewWorkspace() {
  const { reviews, createReview, updateReviewStatus } = useReviewStore();
  const { user } = useAuthStore();
  const {
    formState: { errors },
    handleSubmit,
    register,
    reset,
  } = useForm<ReviewFormValues>({
    resolver: zodResolver(reviewSchema),
  });

  return (
    <div className="space-y-6">
      <PageHeader
        description="Review Zone is a core differentiator: submit work with a GitHub link, keep review status visible, and preserve history locally until the backend is connected."
        eyebrow="Review"
        showDemoBadge
        title="Review submissions and decisions"
      />
      <div className="grid gap-4 xl:grid-cols-[0.9fr,1.1fr]">
        <form
          className="workspace-card rounded-[1.75rem] p-6"
          onSubmit={handleSubmit((values) => {
            createReview({
              ...values,
              submittedBy: user?.displayName ?? "Demo User",
            });
            reset();
          })}
        >
          <p className="text-xl font-semibold tracking-[-0.04em]">Submit work for review</p>
          <div className="mt-5 grid gap-4">
            <input className="rounded-2xl border border-white/10 bg-black/20 px-4 py-3 text-sm outline-none" placeholder="Task title" {...register("taskTitle")} />
            {errors.taskTitle ? <span className="text-xs text-rose-300">{errors.taskTitle.message}</span> : null}
            <input className="rounded-2xl border border-white/10 bg-black/20 px-4 py-3 text-sm outline-none" placeholder="Reviewer" {...register("reviewer")} />
            {errors.reviewer ? <span className="text-xs text-rose-300">{errors.reviewer.message}</span> : null}
            <input className="rounded-2xl border border-white/10 bg-black/20 px-4 py-3 text-sm outline-none" placeholder="https://github.com/..." {...register("githubLink")} />
            {errors.githubLink ? <span className="text-xs text-rose-300">{errors.githubLink.message}</span> : null}
            <textarea className="min-h-28 rounded-2xl border border-white/10 bg-black/20 px-4 py-3 text-sm outline-none" placeholder="What changed? What should the reviewer focus on?" {...register("message")} />
            {errors.message ? <span className="text-xs text-rose-300">{errors.message.message}</span> : null}
            <button className="rounded-full bg-white px-5 py-3 text-sm font-semibold text-zinc-950" type="submit">
              Create review
            </button>
          </div>
        </form>
        <div className="workspace-card rounded-[1.75rem] p-6">
          <p className="text-xl font-semibold tracking-[-0.04em]">Review history</p>
          <div className="mt-5 grid gap-3">
            {reviews.map((review) => (
              <div className="rounded-[1.25rem] border border-white/10 bg-black/20 p-4" key={review.id}>
                <div className="flex flex-wrap items-start justify-between gap-3">
                  <div>
                    <div className="flex items-center gap-2">
                      <GitPullRequest className="h-4 w-4 text-white/70" />
                      <p className="text-sm font-semibold">{review.taskTitle}</p>
                    </div>
                    <p className="workspace-muted mt-2 text-sm leading-7">{review.message}</p>
                  </div>
                  <select
                    className="rounded-full border border-white/10 bg-transparent px-3 py-2 text-sm"
                    onChange={(event) => updateReviewStatus(review.id, event.target.value as ReviewStatus)}
                    value={review.status}
                  >
                    {statuses.map((status) => (
                      <option className="bg-zinc-950" key={status} value={status}>
                        {status}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="mt-4 flex flex-wrap gap-2 text-xs text-white/65">
                  <span>{review.submittedBy}</span>
                  <span>•</span>
                  <span>{review.reviewer}</span>
                  <span>•</span>
                  <span>{new Date(review.submittedAt).toLocaleDateString()}</span>
                </div>
                <Link
                  className="mt-4 inline-flex items-center gap-2 text-sm text-white/80"
                  href={review.githubLink}
                  target="_blank"
                >
                  Open GitHub link
                  <ExternalLink className="h-4 w-4" />
                </Link>
              </div>
            ))}
          </div>
          {!reviews.length ? (
            <div className="mt-4">
              <EmptyState
                description="Submit work with a GitHub link so the reviewer can move between code and context without losing the decision trail."
                title="No reviews yet"
              />
            </div>
          ) : null}
        </div>
      </div>
      <div className="workspace-card rounded-[1.75rem] p-6">
        <div className="flex items-center gap-3">
          <MessageSquare className="h-5 w-5 text-white/70" />
          <p className="text-xl font-semibold tracking-[-0.04em]">Reviewer/member distinction</p>
        </div>
        <p className="workspace-muted mt-3 text-sm leading-7">
          Reviewer workflows and member submission flows should remain visually distinct. This demo
          keeps the state machine honest while the backend review history is still pending.
        </p>
      </div>
    </div>
  );
}
