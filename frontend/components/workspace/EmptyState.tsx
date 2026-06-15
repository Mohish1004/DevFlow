type EmptyStateProps = {
  description: string;
  title: string;
};

export function EmptyState({ description, title }: EmptyStateProps) {
  return (
    <div className="workspace-card rounded-[1.5rem] p-6">
      <p className="text-lg font-semibold">{title}</p>
      <p className="workspace-muted mt-2 text-sm leading-7">{description}</p>
    </div>
  );
}
