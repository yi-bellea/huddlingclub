"use client";

import { useState } from "react";
import Image from "@/components/Image";
import InfoRow from "@/components/InfoRow";
import InvitationCover from "@/components/InvitationCover";
import RSVPCard, { type RSVPResponse } from "@/components/RSVPCard";
import type { Invitation } from "@/lib/mock";

const weekdays = ["일", "월", "화", "수", "목", "금", "토"];

function formatDateTime(value: string) {
  const match = /^(\d{4})-(\d{2})-(\d{2})T(\d{2}):(\d{2})/.exec(value);
  if (!match) return value;

  const [, year, month, day, hour, minute] = match;
  const weekday = weekdays[new Date(Date.UTC(Number(year), Number(month) - 1, Number(day))).getUTCDay()];
  return `${year}년 ${Number(month)}월 ${Number(day)}일 (${weekday}) ${hour}:${minute}`;
}

export default function GuestInvitation({ invitation }: { invitation: Invitation }) {
  const [response, setResponse] = useState<RSVPResponse | null>(null);
  const date = formatDateTime(invitation.dateTime);

  return (
    <main className="mx-auto w-full max-w-[calc(var(--spacing-120)+var(--spacing-120)+var(--spacing-120)+var(--spacing-10)+var(--spacing-5))] bg-[var(--color-surface-default)]">
      <InvitationCover title={invitation.title} date={date} location={invitation.location} />

      <section className="flex flex-col items-center px-[var(--spacing-page-horizontal)] py-[var(--spacing-cover-inset)]">
        <div className="flex w-full flex-col items-center gap-[calc(var(--spacing-40)+var(--spacing-12))]">
          <Image type="flag" />
          <p className="w-full whitespace-pre-wrap break-words text-center typography-preserved-regular-15-10 text-[var(--color-guide-text-preserved-1)]">
            {invitation.body}
          </p>
        </div>
      </section>

      <section className="px-[var(--spacing-page-horizontal)] pb-[var(--spacing-section-lg)] pt-[var(--spacing-stack-lg)]">
        <div className="flex flex-col gap-[var(--spacing-control-compact)] rounded-[var(--radius-card)] bg-[var(--color-surface-subtle)] p-[var(--spacing-page-horizontal)]">
          <InfoRow label="일시" value={date} />
          <InfoRow label="장소" value={invitation.location} />
        </div>
      </section>

      <section className="bg-[var(--color-background-subtle)] px-[var(--spacing-page-horizontal)] pb-[var(--spacing-section-xl)] pt-[var(--spacing-section-lg)]">
        <RSVPCard
          state={response ? "done" : "form"}
          name={response?.name}
          attendance={response?.attendance}
          companionCount={response?.companionCount}
          doneTitle="입력 완료"
          doneDescription="이 화면의 응답은 저장되지 않았어요."
          onSubmit={setResponse}
        />
      </section>
    </main>
  );
}
