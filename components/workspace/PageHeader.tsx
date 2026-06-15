import { DemoBadge } from "@/components/workspace/DemoBadge";

type PageHeaderProps = {
  description: string;
  eyebrow: string;
  showDemoBadge?: boolean;
  title: string;
};

export function PageHeader({
  description,
  eyebrow,
  showDemoBadge = false,
  title,
}: PageHeaderProps) {
  return (
    <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
      <div className="max-w-3xl">
        <p className="workspace-muted text-xs font-semibold uppercase tracking-[0.28em]">
          {eyebrow}
        </p>
        <h1 className="mt-4 text-3xl font-semibold tracking-[-0.05em] md:text-4xl">{title}</h1>
        <p className="workspace-muted mt-4 text-sm leading-7 md:text-base">{description}</p>
      </div>
      {showDemoBadge ? <DemoBadge /> : null}
    </div>
  );
}
