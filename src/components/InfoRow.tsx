export type InfoRowProps = {
  className?: string;
  label?: string;
  type?: "inline" | "spread";
  value?: string;
};

export default function InfoRow({
  className = "",
  label = "일시",
  type = "inline",
  value = "2026년 11월 14일 (토) 09:00",
}: InfoRowProps) {
  return (
    <div className={`flex min-w-0 items-center gap-[var(--spacing-control-compact)] ${type === "spread" ? "w-full" : ""} ${className}`}>
      {type === "inline" ? (
        <>
          <span className="shrink-0 typography-label-lg text-[var(--color-text-secondary)]">{label}</span>
          <span aria-hidden="true" className="h-[calc(var(--spacing-12)+var(--spacing-2))] w-[var(--spacing)] shrink-0 bg-[var(--color-border-default)]" />
          <span className="min-w-0 typography-label-lg text-[var(--color-text-strong)]">{value}</span>
        </>
      ) : (
        <>
          <span className="shrink-0 typography-body-md text-[var(--color-text-secondary)]">{label}</span>
          <span className="min-w-0 flex-1 text-right typography-label-md text-[var(--color-text-strong)]">{value}</span>
        </>
      )}
    </div>
  );
}
