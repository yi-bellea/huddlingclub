import type { ComponentProps } from "react";

export type InputFieldProps = Omit<ComponentProps<"input">, "size"> & {
  state?: "default" | "focus" | "active";
};

export default function InputField({
  className = "",
  placeholder = "placeholder",
  state = "default",
  value,
  defaultValue,
  type = "text",
  ...props
}: InputFieldProps) {
  return (
    <input
      {...props}
      type={type}
      value={value}
      defaultValue={value === undefined ? (defaultValue ?? (state === "active" ? placeholder : undefined)) : undefined}
      placeholder={placeholder}
      className={`h-[calc(var(--spacing-40)+var(--spacing-5))] w-full min-w-0 rounded-[var(--radius-control)] border-[length:var(--spacing)] bg-[var(--color-surface-default)] px-[var(--spacing-stack-md)] py-[var(--spacing-control-x)] typography-preserved-regular-16-6 text-[var(--color-guide-text-preserved-1)] placeholder:text-[var(--color-text-disabled)] outline-none focus:border-[color:var(--color-action-primary)] ${
        state === "focus" ? "border-[color:var(--color-action-primary)]" : "border-[color:var(--color-border-subtle)]"
      } ${className}`}
    />
  );
}
