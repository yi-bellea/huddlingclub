export type AttendanceBadgeProps = {
  className?: string;
  status?: "yes" | "no" | boolean;
};

export default function AttendanceBadge({ className = "", status = "yes" }: AttendanceBadgeProps) {
  const attending = status === "yes" || status === true;

  return (
    <span
      className={`inline-flex shrink-0 items-center rounded-[var(--radius-pill)] px-[var(--spacing-control-compact)] py-[var(--spacing-inline-sm)] typography-label-md ${
        attending
          ? "bg-[var(--color-info-subtle)] text-[var(--color-info-strong)]"
          : "bg-[var(--color-background-subtle)] text-[var(--color-text-secondary)]"
      } ${className}`}
    >
      {attending ? "참석" : "불참"}
    </span>
  );
}
