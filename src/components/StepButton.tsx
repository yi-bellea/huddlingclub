import type { ComponentProps, ReactNode } from "react";
import IconMinus from "./IconMinus";

export type StepButtonProps = ComponentProps<"button"> & {
  icon?: ReactNode;
  state?: "default" | "disabled";
};

export default function StepButton({
  className = "",
  icon,
  state = "default",
  disabled,
  type = "button",
  ...props
}: StepButtonProps) {
  const isDisabled = disabled || state === "disabled";

  return (
    <button
      {...props}
      type={type}
      disabled={isDisabled}
      className={`inline-flex size-[calc(var(--spacing-40)+var(--spacing-4))] shrink-0 items-center justify-center rounded-[var(--radius-control)] border-[length:var(--spacing)] border-[color:var(--color-border-default)] bg-[var(--color-surface-default)] focus-visible:outline-[length:var(--spacing-2)] focus-visible:outline-[color:var(--color-border-accent)] focus-visible:outline-offset-[var(--spacing-2)] disabled:cursor-not-allowed ${className}`}
    >
      {icon ?? <IconMinus variant={isDisabled ? "stepDisabled" : "step"} />}
    </button>
  );
}
