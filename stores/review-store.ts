"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";

import { initialReviews } from "@/lib/workspace-data";
import type { ReviewItem, ReviewStatus } from "@/lib/workspace-types";

type CreateReviewPayload = {
  githubLink: string;
  message: string;
  reviewer: string;
  submittedBy: string;
  taskTitle: string;
};

type ReviewState = {
  createReview: (payload: CreateReviewPayload) => void;
  reviews: ReviewItem[];
  updateReviewStatus: (reviewId: string, status: ReviewStatus) => void;
};

function timestamp() {
  return new Date().toISOString();
}

export const useReviewStore = create<ReviewState>()(
  persist(
    (set) => ({
      createReview: (payload) =>
        set((state) => ({
          reviews: [
            {
              ...payload,
              id: `review-${crypto.randomUUID()}`,
              status: "Waiting for Review",
              submittedAt: timestamp(),
            },
            ...state.reviews,
          ],
        })),
      reviews: initialReviews,
      updateReviewStatus: (reviewId, status) =>
        set((state) => ({
          reviews: state.reviews.map((review) =>
            review.id === reviewId ? { ...review, status } : review,
          ),
        })),
    }),
    {
      name: "devflow-reviews",
    },
  ),
);
