import EmptyState from "@/components/EmptyState";
import NavBar from "@/components/NavBar";
import ResponseRow from "@/components/ResponseRow";
import SectionHeader from "@/components/SectionHeader";
import StatCard from "@/components/StatCard";
import type { Invitation, InvitationResponse } from "@/lib/mock";
import CopyInvitationLinkButton from "../demo/responses/CopyInvitationLinkButton";

const weekdays = ["일", "월", "화", "수", "목", "금", "토"];

function formatDateTime(value: string) {
  const match = /^(\d{4})-(\d{2})-(\d{2})T(\d{2}):(\d{2})/.exec(value);
  if (!match) return value;

  const [, year, month, day, hour, minute] = match;
  const weekday = weekdays[new Date(Date.UTC(Number(year), Number(month) - 1, Number(day))).getUTCDay()];
  return `${year}년 ${Number(month)}월 ${Number(day)}일 (${weekday}) ${hour}:${minute}`;
}

export default function ResponsesOverview({
  invitation,
  responses,
}: {
  invitation: Invitation;
  responses: InvitationResponse[];
}) {
  const invitationResponses = responses.filter((response) => response.invitationId === invitation.id);
  const attending = invitationResponses.filter((response) => response.attendance === "yes");
  const notAttendingCount = invitationResponses.length - attending.length;
  const attendeeTotal = attending.reduce((total, response) => total + 1 + response.companionCount, 0);
  const date = formatDateTime(invitation.dateTime);

  return (
    <main className="mx-auto flex min-h-dvh w-full max-w-[calc(var(--spacing-120)+var(--spacing-120)+var(--spacing-120)+var(--spacing-10)+var(--spacing-5))] flex-col gap-[var(--spacing-page-horizontal)] bg-[var(--color-surface-default)]">
      <NavBar title="응답 현황" />

      <div className="flex flex-col gap-[var(--spacing-section-lg)] px-[var(--spacing-page-horizontal)] pb-[var(--spacing-cover-inset)]">
        <SectionHeader
          subtitle="Responses"
          title={invitation.title}
          description={`${date} · ${invitation.location}`}
        />

        <div className="flex w-full min-w-0 gap-[var(--spacing-inline-md)]">
          <StatCard fluid label="참석" value={`${attending.length}명`} />
          <StatCard fluid label="불참" value={`${notAttendingCount}명`} />
          <StatCard fluid highlight label="참석 인원 합계" value={`${attendeeTotal}명`} />
        </div>

        <p className="typography-caption-md text-[var(--color-text-tertiary)]">
          참석 인원 합계 = 참석한 사람 + 동반 인원
        </p>

        <section className="flex w-full flex-col gap-[var(--spacing-inline-md)]" aria-label="응답 목록">
          <h3 className="typography-heading-md text-[var(--color-text-strong)]">응답 목록</h3>
          {invitationResponses.length === 0 ? (
            <EmptyState />
          ) : (
            invitationResponses.map((response) => (
              <ResponseRow
                key={response.id}
                name={response.name}
                status={response.attendance}
                meta={response.attendance === "yes" ? `동반 ${response.companionCount}명` : ""}
              />
            ))
          )}
        </section>

        <CopyInvitationLinkButton invitationId={invitation.id} />
      </div>
    </main>
  );
}
