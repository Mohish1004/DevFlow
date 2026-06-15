type DemoBadgeProps = {
  label?: string;
};

export function DemoBadge({ label = "Demo Workspace" }: DemoBadgeProps) {
  return (
    <span className="workspace-demo-badge inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold uppercase tracking-[0.22em]">
      {label}
    </span>
  );
}
