import NextImage from "next/image";

export type IconCheckProps = {
  className?: string;
  variant?: "default" | "success";
};

export default function IconCheck({ className = "", variant = "default" }: IconCheckProps) {
  const success = variant === "success";

  return (
    <NextImage
      src={success ? "/figma/check-success.svg" : "/figma/check.svg"}
      alt=""
      aria-hidden="true"
      width={success ? 32 : 24}
      height={success ? 32 : 24}
      className={`${success ? "size-[var(--spacing-32)]" : "size-[var(--spacing-24)]"} shrink-0 ${className}`}
    />
  );
}
