import NextImage from "next/image";

export type ImageProps = {
  className?: string;
  type?: "character" | "flag";
  alt?: string;
};

export default function Image({ className = "", type = "character", alt = "" }: ImageProps) {
  const flag = type === "flag";

  return (
    <span
      className={`relative block shrink-0 overflow-hidden ${
        flag
          ? "size-[calc(var(--spacing-40)+var(--spacing-8))] rounded-[var(--radius-scaled-media-16-799999237060547)]"
          : "size-[calc(var(--spacing-120)+var(--spacing-80)+var(--spacing))]"
      } ${className}`}
    >
      <NextImage
        src={flag ? "/figma/flag.png" : "/figma/character.png"}
        alt={alt}
        fill
        sizes="100vw"
        className="object-cover"
      />
    </span>
  );
}
