import AttendanceBadge, { type AttendanceBadgeProps } from "./AttendanceBadge";

export type ResponseRowProps = {
  className?: string;
  meta?: string;
  name?: string;
  status?: AttendanceBadgeProps["status"];
};

export default function ResponseRow({
  className = "",
  meta = "010-****-1234 · 굿즈 M",
  name = "김허들",
  status = "yes",
}: ResponseRowProps) {
  return (
    <div className={`flex h-[calc(var(--spacing-80)-var(--spacing-2))] w-full min-w-0 items-center gap-[var(--spacing-stack-sm)] rounded-[var(--radius-card)] border-[length:var(--spacing)] border-[color:var(--color-border-subtle)] bg-[var(--color-surface-default)] p-[var(--spacing-stack-md)] ${className}`}>
      <div className="flex min-w-0 flex-1 flex-col gap-[var(--spacing-inline-sm)]">
        <p className="truncate typography-label-lg text-[var(--color-guide-text-preserved-1)]">{name}</p>
        {meta && <p className="truncate typography-caption-md text-[var(--color-text-tertiary)]">{meta}</p>}
      </div>
      <AttendanceBadge status={status} />
    </div>
  );
}
