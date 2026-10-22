import NextImage from "next/image";

export type IconMinusProps = {
  className?: string;
  variant?: "default" | "step" | "stepDisabled";
};

export default function IconMinus({ className = "", variant = "default" }: IconMinusProps) {
  const step = variant !== "default";
  const src =
    variant === "stepDisabled"
      ? "/figma/minus-step-disabled.svg"
      : step
        ? "/figma/minus-step.svg"
        : "/figma/minus.svg";

  return (
    <NextImage
      src={src}
      alt=""
      aria-hidden="true"
      width={step ? 20 : 24}
      height={step ? 20 : 24}
      className={`${step ? "size-[var(--spacing-20)]" : "size-[var(--spacing-24)]"} shrink-0 ${className}`}
    />
  );
}
