export default function IconNone({ className = "" }: { className?: string }) {
  return <span aria-hidden="true" className={`block size-[var(--spacing-24)] shrink-0 ${className}`} />;
}
