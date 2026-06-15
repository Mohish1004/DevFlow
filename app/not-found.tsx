import Link from "next/link";

export default function NotFound() {
  return (
    <div className="workspace-shell workspace-pattern flex min-h-screen items-center justify-center p-6">
      <div className="liquid-glass max-w-xl rounded-[2rem] p-8 text-center">
        <p className="text-sm font-semibold uppercase tracking-[0.26em] text-white/60">404</p>
        <h1 className="mt-4 text-4xl font-semibold tracking-[-0.05em] text-white">
          This route is out of flow.
        </h1>
        <p className="workspace-muted mt-4 text-sm leading-7">
          The page you requested does not exist or has moved. Use the workspace routes or return to
          the landing page.
        </p>
        <div className="mt-6 flex justify-center gap-3">
          <Link
            className="rounded-full bg-white px-5 py-3 text-sm font-semibold text-zinc-950"
            href="/"
          >
            Landing
          </Link>
          <Link
            className="rounded-full border border-white/12 px-5 py-3 text-sm font-semibold text-white"
            href="/app/dashboard"
          >
            Dashboard
          </Link>
        </div>
      </div>
    </div>
  );
}
