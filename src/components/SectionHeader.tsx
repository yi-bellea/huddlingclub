export type SectionHeaderProps = {
  className?: string;
  description?: string;
  showDescription?: boolean;
  showSubtitle?: boolean;
  showTitle?: boolean;
  subtitle?: string;
  title?: string;
  tone?: "default" | "inverse";
};

export default function SectionHeader({
  className = "",
  description = "Description",
  showDescription = true,
  showSubtitle = true,
  showTitle = true,
  subtitle = "Subtitle",
  title = "title",
  tone = "default",
}: SectionHeaderProps) {
  return (
    <div className={`flex w-full flex-col items-center gap-[var(--spacing-stack-md)] text-center ${className}`}>
      {showSubtitle && <p className={`w-full typography-preserved-medium-14-2 ${tone === "inverse" ? "text-[var(--color-text-inverse)] opacity-60" : "text-[var(--color-action-secondary)]"}`}>{subtitle}</p>}
      {showTitle && <h2 className={`w-full whitespace-pre-line typography-preserved-semibold-25-3 ${tone === "inverse" ? "text-[var(--color-text-inverse)]" : "text-[var(--color-guide-text-preserved-1)]"}`}>{title}</h2>}
      {showDescription && <p className={`w-full typography-preserved-regular-14-9 ${tone === "inverse" ? "text-[var(--color-text-inverse)]" : "text-[var(--color-guide-text-preserved-1)]"}`}>{description}</p>}
    </div>
  );
}
