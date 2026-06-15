"use client";

import Link from "next/link";
import { X } from "lucide-react";
import { useEffect } from "react";

import { useUiStore } from "@/stores/ui-store";

export function ContextPanel() {
  const { closeContextPanel, contextPanel, contextPanelOpen } = useUiStore();

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        closeContextPanel();
      }
    };

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [closeContextPanel]);

  if (!contextPanelOpen || !contextPanel) {
    return null;
  }

  return (
    <div className="fixed inset-y-0 right-0 z-[80] w-full max-w-md p-4">
      <div className="liquid-glass flex h-full flex-col rounded-[1.75rem] p-5">
        <div className="flex items-start justify-between gap-4">
          <div>
            <p className="text-2xl font-semibold tracking-[-0.05em]">{contextPanel.title}</p>
            {contextPanel.body ? (
              <p className="workspace-muted mt-3 text-sm leading-7">{contextPanel.body}</p>
            ) : null}
          </div>
          <button
            aria-label="Close context panel"
            className="rounded-full border border-white/10 p-2 text-white/70 transition hover:bg-white/10 hover:text-white"
            onClick={closeContextPanel}
            type="button"
          >
            <X className="h-4 w-4" />
          </button>
        </div>
        {contextPanel.meta?.length ? (
          <div className="mt-6 grid gap-2">
            {contextPanel.meta.map((item) => (
              <div className="workspace-card rounded-2xl px-4 py-3 text-sm" key={item}>
                {item}
              </div>
            ))}
          </div>
        ) : null}
        {contextPanel.links?.length ? (
          <div className="mt-6 grid gap-2">
            {contextPanel.links.map((link) => (
              <Link
                className="rounded-2xl border border-white/10 px-4 py-3 text-sm text-white/80 transition hover:bg-white/10 hover:text-white"
                href={link.href}
                key={link.href}
                target={link.href.startsWith("http") ? "_blank" : undefined}
              >
                {link.label}
              </Link>
            ))}
          </div>
        ) : null}
      </div>
    </div>
  );
}
