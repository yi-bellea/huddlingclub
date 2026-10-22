import Image from "./Image";
import SectionHeader from "./SectionHeader";

export type InvitationCoverProps = {
  className?: string;
  date?: string;
  imageAlt?: string;
  location?: string;
  subtitle?: string;
  title?: string;
};

export default function InvitationCover({
  className = "",
  date = "2026년 11월 14일 (토) 09:00",
  imageAlt = "",
  location = "세종 남극 기지",
  subtitle = "Huddling Club 2nd Meetup",
  title = "허들링 클럽 2번째\n오프라인 밋업",
}: InvitationCoverProps) {
  return (
    <section className={`flex w-full max-w-[calc(var(--spacing-120)+var(--spacing-120)+var(--spacing-120)+var(--spacing-10)+var(--spacing-5))] flex-col items-center justify-center gap-[var(--spacing-page-horizontal)] overflow-hidden bg-[linear-gradient(var(--color-cover-gradient-preserved-3),var(--color-cover-gradient-preserved-4))] px-[var(--spacing-page-horizontal)] py-[var(--spacing-cover-inset)] ${className}`}>
      <SectionHeader tone="inverse" subtitle={subtitle} title={title} showDescription={false} />
      <Image type="character" alt={imageAlt} />
      <div className="flex w-full flex-col items-center gap-[var(--spacing-inline-md)] text-center">
        <span className="rounded-[var(--radius-control)] bg-[var(--color-info-subtle)] px-[var(--spacing-inline-compact)] py-[var(--spacing-inline-xs)] typography-preserved-semibold-12-4 text-[var(--color-info-strong)]">일시</span>
        <p className="typography-preserved-medium-14-5 text-[var(--color-text-inverse)]">{date}</p>
      </div>
      <div className="flex w-full flex-col items-center gap-[var(--spacing-inline-md)] text-center">
        <span className="rounded-[var(--radius-control)] bg-[var(--color-info-subtle)] px-[var(--spacing-inline-compact)] py-[var(--spacing-inline-xs)] typography-preserved-semibold-12-4 text-[var(--color-info-strong)]">장소</span>
        <p className="typography-preserved-medium-14-5 text-[var(--color-text-inverse)]">{location}</p>
      </div>
    </section>
  );
}
