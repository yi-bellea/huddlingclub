import type { ComponentProps } from "react";

export type ButtonProps = Omit<ComponentProps<"button">, "size"> & {
  size?: "sm" | "md" | "lg";
  /** 실습 화면에서 Figma의 hover/disabled 상태를 함께 보여줄 때 사용합니다. */
  previewState?: "default" | "hover" | "disabled";
  label?: string;
};

const sizeClasses = {
  sm: "h-[calc(var(--spacing-20)+var(--spacing-8))] gap-[var(--spacing-control-compact)] py-[var(--spacing-inline-sm)] typography-label-md",
  md: "h-[calc(var(--spacing-40)+var(--spacing-8))] gap-[var(--spacing-inline-compact)] py-[var(--spacing-control-x)] typography-label-md",
  lg: "h-[calc(var(--spacing-40)+var(--spacing-12))] gap-[var(--spacing-control-compact)] py-[var(--spacing-inline-sm)] typography-label-lg",
} satisfies Record<NonNullable<ButtonProps["size"]>, string>;

const hoverOverlay =
  "bg-[linear-gradient(var(--color-action-hover-overlay),var(--color-action-hover-overlay))]";
const hoverOverlayOnPointer =
  "enabled:hover:bg-[linear-gradient(var(--color-action-hover-overlay),var(--color-action-hover-overlay))]";

export default function Button({
  size = "sm",
  previewState = "default",
  label = "Button",
  children,
  className,
  disabled,
  type = "button",
  ...props
}: ButtonProps) {
  const isDisabled = disabled || previewState === "disabled";
  const isPreviewHover = previewState === "hover" && !isDisabled;

  const backgroundClass = isDisabled
    ? "bg-[var(--color-border-subtle)]"
    : size === "md"
      ? `bg-[var(--color-text-secondary)] ${isPreviewHover ? hoverOverlay : hoverOverlayOnPointer}`
      : isPreviewHover
        ? "bg-[var(--color-action-hover-overlay)]"
        : "bg-[var(--color-action-primary)] enabled:hover:bg-[var(--color-action-hover-overlay)]";

  return (
    <button
      {...props}
      type={type}
      disabled={isDisabled}
      className={[
        "inline-flex items-center justify-center whitespace-nowrap rounded-[var(--radius-control)] px-[var(--spacing-control-y)] text-center text-[var(--color-text-inverse)] cursor-pointer focus-visible:outline-[length:var(--spacing-2)] focus-visible:outline-[color:var(--color-border-accent)] focus-visible:outline-offset-[var(--spacing-2)] disabled:cursor-not-allowed",
        sizeClasses[size],
        backgroundClass,
        className,
      ]
        .filter(Boolean)
        .join(" ")}
    >
      {children ?? label}
    </button>
  );
}
