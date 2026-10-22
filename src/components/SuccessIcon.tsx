import IconCheck from "./IconCheck";

export default function SuccessIcon({ className = "" }: { className?: string }) {
  return (
    <span className={`inline-flex size-[calc(var(--spacing-40)+var(--spacing-24))] shrink-0 items-center justify-center rounded-[var(--radius-pill)] bg-[var(--color-info-subtle)] ${className}`}>
      <IconCheck variant="success" />
    </span>
  );
}
