export type LabelProps = {
  className?: string;
  htmlFor?: string;
  label?: string;
  required?: boolean;
  variant?: "default" | "field";
};

export default function Label({
  className = "",
  htmlFor,
  label = "Label",
  required = true,
  variant = "default",
}: LabelProps) {
  return (
    <label htmlFor={htmlFor} className={`inline-flex items-center gap-[var(--spacing-inline-sm)] whitespace-nowrap ${className}`}>
      <span className={`${variant === "field" ? "typography-label-lg" : "typography-preserved-semibold-16-7"} text-[var(--color-text-strong)]`}>{label}</span>
      {required && (
        <span className={`${variant === "field" ? "typography-caption-md" : "typography-preserved-regular-12-8"} text-[var(--color-guide-text-preserved-6)]`}>
          필수
        </span>
      )}
    </label>
  );
}
