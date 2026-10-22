import type { ComponentProps } from "react";

export type RadioProps = Omit<ComponentProps<"input">, "type" | "size"> & {
  state?: "default" | "selected" | "disabled";
};

export default function Radio({
  className = "",
  state = "default",
  checked,
  defaultChecked,
  disabled,
  ...props
}: RadioProps) {
  const isDisabled = disabled || state === "disabled";

  return (
    <span className={`relative inline-flex size-[calc(var(--spacing-40)+var(--spacing-8))] shrink-0 items-center justify-center ${className}`}>
      <input
        {...props}
        type="radio"
        checked={checked}
        defaultChecked={checked === undefined ? (defaultChecked ?? state === "selected") : undefined}
        disabled={isDisabled}
        className="peer absolute inset-0 size-full cursor-pointer opacity-0 disabled:cursor-not-allowed"
      />
      <span
        aria-hidden="true"
        className="pointer-events-none size-[var(--spacing-20)] rounded-[var(--radius-pill)] border-[length:var(--spacing-2)] border-[color:var(--color-text-tertiary)] bg-[var(--color-surface-default)] peer-checked:border-[length:var(--spacing-6)] peer-checked:border-[color:var(--color-action-primary)] peer-disabled:border-[color:var(--color-text-disabled)] peer-focus-visible:outline-[length:var(--spacing-2)] peer-focus-visible:outline-[color:var(--color-border-accent)] peer-focus-visible:outline-offset-[var(--spacing-2)]"
      />
    </span>
  );
}
