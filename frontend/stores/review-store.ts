"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";
import { api } from "@/services/api-client";
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
  fetchReviews: () => Promise<void>;
  reviews: ReviewItem[];
  updateReviewStatus: (reviewId: string, status: ReviewStatus) => void;
};

function timestamp() {
  return new Date().toISOString();
}

export const useReviewStore = create<ReviewState>()(
  persist(
    (set) => ({
      reviews: initialReviews,

      fetchReviews: async () => {
        try {
          const serverReviews = await api.get<ReviewItem[]>("/api/reviews");
          set({ reviews: serverReviews });
        } catch {
          /* keep local */
        }
      },

      createReview: (payload) => {
        const newReview: ReviewItem = {
          ...payload,
          id: `review-${crypto.randomUUID()}`,
          status: "Waiting for Review",
          submittedAt: timestamp(),
        };
        set((state) => ({ reviews: [newReview, ...state.reviews] }));
        api.post("/api/reviews", newReview).catch(() => {});
      },

      updateReviewStatus: (reviewId, status) => {
        set((state) => ({
          reviews: state.reviews.map((review) =>
            review.id === reviewId ? { ...review, status } : review,
          ),
        }));
        api.patch(`/api/reviews/${reviewId}/status?status=${status}`).catch(() => {});
      },
    }),
    {
      name: "devflow-reviews",
    },
  ),
);
