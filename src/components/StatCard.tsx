export type StatCardProps = {
  className?: string;
  fluid?: boolean;
  highlight?: boolean;
  label?: string;
  value?: string;
};

export default function StatCard({ className = "", fluid = false, highlight = false, label = "참석", value = "2명" }: StatCardProps) {
  return (
    <div
      className={`flex flex-col items-center gap-[var(--spacing-inline-sm)] overflow-hidden rounded-[var(--radius-card)] px-[var(--spacing-control-x)] py-[var(--spacing-stack-md)] text-center ${
        fluid ? "min-w-0 flex-1" : "w-[calc(var(--spacing-80)+var(--spacing-28)-var(--spacing))] shrink-0"
      } ${
        highlight ? "bg-[var(--color-info-subtle)]" : "bg-[var(--color-surface-subtle)]"
      } ${className}`}
    >
      <span className="typography-caption-md text-[var(--color-text-secondary)]">{label}</span>
      <strong className={`typography-title-lg ${highlight ? "text-[var(--color-info-strong)]" : "text-[var(--color-text-strong)]"}`}>
        {value}
      </strong>
    </div>
  );
}
