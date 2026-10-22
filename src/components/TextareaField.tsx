import type { ComponentProps } from "react";

export type TextareaFieldProps = ComponentProps<"textarea"> & {
  state?: "default" | "focus" | "active";
};

export default function TextareaField({
  className = "",
  placeholder = "게스트에게 전할 초대 글을 적어주세요",
  state = "default",
  rows,
  value,
  defaultValue,
  ...props
}: TextareaFieldProps) {
  const heightClass =
    rows === 4
      ? "h-[var(--spacing-120)]"
      : rows === 2
        ? "h-[calc(var(--spacing-60)+var(--spacing-12))]"
        : "h-[calc(var(--spacing-40)+var(--spacing-5))]";

  return (
    <textarea
      {...props}
      rows={rows}
      value={value}
      defaultValue={value === undefined ? (defaultValue ?? (state === "active" ? placeholder : undefined)) : undefined}
      placeholder={placeholder}
      className={`${heightClass} w-full min-w-0 resize-none rounded-[var(--radius-control)] border-[length:var(--spacing)] bg-[var(--color-surface-default)] px-[var(--spacing-stack-md)] py-[var(--spacing-control-x)] typography-preserved-regular-16-6 text-[var(--color-guide-text-preserved-1)] placeholder:text-[var(--color-text-disabled)] outline-none focus:border-[color:var(--color-action-primary)] ${
        state === "focus" ? "border-[color:var(--color-action-primary)]" : "border-[color:var(--color-border-subtle)]"
      } ${className}`}
    />
  );
}
