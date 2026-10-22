export type EmptyStateProps = {
  className?: string;
  description?: string;
  title?: string;
};

export default function EmptyState({
  className = "",
  description = "초대장 링크를 공유하면 응답이 여기에 쌓여요.",
  title = "아직 응답이 없어요",
}: EmptyStateProps) {
  return (
    <div className={`flex w-full flex-col items-center justify-center gap-[var(--spacing-inline-md)] rounded-[var(--radius-card)] bg-[var(--color-surface-subtle)] px-[var(--spacing-page-horizontal)] py-[var(--spacing-section-lg)] text-center ${className}`}>
      <strong className="typography-heading-md text-[var(--color-text-strong)]">{title}</strong>
      <p className="typography-body-md text-[var(--color-text-tertiary)]">{description}</p>
    </div>
  );
}
