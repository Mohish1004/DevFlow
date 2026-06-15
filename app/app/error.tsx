"use client";

type AppErrorProps = {
  error: Error & { digest?: string };
  reset: () => void;
};

export default function AppError({ error, reset }: AppErrorProps) {
  return (
    <div className="workspace-shell workspace-pattern flex min-h-screen items-center justify-center p-6">
      <div className="liquid-glass max-w-xl rounded-[2rem] p-8">
        <p className="text-sm font-semibold uppercase tracking-[0.26em] text-white/60">Error</p>
        <h1 className="mt-4 text-3xl font-semibold tracking-[-0.05em] text-white">
          Something interrupted the workspace.
        </h1>
        <p className="workspace-muted mt-4 text-sm leading-7">
          {error.message || "An unexpected error occurred while rendering this app route."}
        </p>
        <button
          className="mt-6 rounded-full bg-white px-5 py-3 text-sm font-semibold text-zinc-950"
          onClick={reset}
          type="button"
        >
          Try again
        </button>
      </div>
    </div>
  );
}
