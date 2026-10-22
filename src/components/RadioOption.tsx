import Radio, { type RadioProps } from "./Radio";

export type RadioOptionProps = Omit<RadioProps, "className"> & {
  className?: string;
  label?: string;
  requiredLabel?: boolean;
};

export default function RadioOption({
  className = "",
  label = "Label",
  requiredLabel = true,
  ...props
}: RadioOptionProps) {
  return (
    <label className={`inline-flex cursor-pointer items-center ${className}`}>
      <Radio {...props} />
      <span className="inline-flex items-center gap-[var(--spacing-inline-sm)] whitespace-nowrap">
        <span className="typography-preserved-semibold-16-7 text-[var(--color-text-strong)]">{label}</span>
        {requiredLabel && <span className="typography-preserved-regular-12-8 text-[var(--color-guide-text-preserved-6)]">필수</span>}
      </span>
    </label>
  );
}
