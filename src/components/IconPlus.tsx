import NextImage from "next/image";

export type IconPlusProps = {
  className?: string;
  variant?: "default" | "step";
};

export default function IconPlus({ className = "", variant = "default" }: IconPlusProps) {
  const step = variant === "step";

  return (
    <NextImage
      src={step ? "/figma/plus-stepper.svg" : "/figma/plus.svg"}
      alt=""
      aria-hidden="true"
      width={step ? 20 : 24}
      height={step ? 20 : 24}
      className={`${step ? "size-[var(--spacing-20)]" : "size-[var(--spacing-24)]"} shrink-0 ${className}`}
    />
  );
}
