"use client";

import { useState } from "react";

import { Button } from "@/components/ui/Button";

type SignupFormProps = {
  mode?: "signup" | "sales";
};

const copy = {
  sales: {
    button: "Contact Sales",
    eyebrow: "Contact Sales",
    headline: "Talk through rollout, pricing, and team fit.",
    intro:
      "Tell us about your org, workflows, and collaboration pain points so we can shape the right DevFlow plan.",
    successEyebrow: "Sales request received",
    successHeadline: "Your DevFlow sales request is in.",
    successText:
      "Thanks. We would normally route this to our sales and onboarding team so they can prepare a pricing walkthrough, rollout recommendation, and workspace demo for you.",
  },
  signup: {
    button: "Request Access",
    eyebrow: "Sign Up",
    headline: "Bring your team into one workflow.",
    intro:
      "Start with product planning, review workflows, documentation, and release visibility in one place.",
    successEyebrow: "Request received",
    successHeadline: "Your DevFlow demo request is in.",
    successText:
      "Thanks. We would normally route this to onboarding and sales so your team can review the workspace, pricing fit, and rollout plan.",
  },
} as const;

export function SignupForm({ mode = "signup" }: SignupFormProps) {
  const [submitted, setSubmitted] = useState(false);
  const content = copy[mode];

  if (submitted) {
    return (
      <div className="rounded-[2rem] border border-zinc-200 bg-zinc-50 p-8">
        <p className="text-sm uppercase tracking-[0.24em] text-zinc-500">
          {content.successEyebrow}
        </p>
        <h2 className="mt-4 text-3xl font-medium tracking-[-0.05em] text-zinc-950">
          {content.successHeadline}
        </h2>
        <p className="mt-4 max-w-xl text-base leading-8 text-zinc-600">
          {content.successText}
        </p>
      </div>
    );
  }

  return (
    <div className="grid gap-6 lg:grid-cols-[0.9fr,1.1fr]">
      <div className="rounded-[2rem] bg-[#ebe9e5] p-8">
        <p className="text-sm uppercase tracking-[0.24em] text-zinc-500">{content.eyebrow}</p>
        <h2 className="mt-4 text-3xl font-medium tracking-[-0.05em] text-zinc-950">
          {content.headline}
        </h2>
        <p className="mt-4 text-base leading-8 text-zinc-600">{content.intro}</p>
        <div className="mt-8 space-y-3 text-sm text-zinc-600">
          <p>Included in the walkthrough:</p>
          <p>Project planning and task tracking</p>
          <p>Review Zone and docs workflows</p>
          <p>Release readiness and sprint visibility</p>
        </div>
      </div>
      <form
        className="rounded-[2rem] border border-zinc-200 bg-white p-8 shadow-[0_20px_45px_rgba(24,24,27,0.06)]"
        onSubmit={(event) => {
          event.preventDefault();
          setSubmitted(true);
        }}
      >
        <div className="grid gap-5">
          <label className="grid gap-2">
            <span className="text-sm font-medium text-zinc-700">Name</span>
            <input
              className="h-12 rounded-2xl border border-zinc-200 px-4 outline-none transition focus:border-zinc-950"
              name="name"
              required
              type="text"
            />
          </label>
          <label className="grid gap-2">
            <span className="text-sm font-medium text-zinc-700">Work Email</span>
            <input
              className="h-12 rounded-2xl border border-zinc-200 px-4 outline-none transition focus:border-zinc-950"
              name="email"
              required
              type="email"
            />
          </label>
          <label className="grid gap-2">
            <span className="text-sm font-medium text-zinc-700">Team Size</span>
            <select
              className="h-12 rounded-2xl border border-zinc-200 px-4 outline-none transition focus:border-zinc-950"
              name="team-size"
              required
            >
              <option value="">Select a team size</option>
              <option value="1-5">1-5</option>
              <option value="6-25">6-25</option>
              <option value="26-100">26-100</option>
              <option value="100+">100+</option>
            </select>
          </label>
          <label className="grid gap-2">
            <span className="text-sm font-medium text-zinc-700">What are you replacing?</span>
            <textarea
              className="min-h-32 rounded-2xl border border-zinc-200 px-4 py-3 outline-none transition focus:border-zinc-950"
              name="stack"
              placeholder="Project planning tools, docs tools, review tools, release tracking..."
              required
            />
          </label>
          <Button className="w-full" type="submit" variant="primary">
            {content.button}
          </Button>
        </div>
      </form>
    </div>
  );
}
