"use client";

import NextImage from "next/image";
import { useState, type FormEvent } from "react";
import type { Invitation } from "@/lib/invitation-types";
import type { ResponseInput } from "@/lib/validation";
import styles from "@/components/meonji/InvitationTemplate.module.css";

const weekdays = ["일", "월", "화", "수", "목", "금", "토"];

function formatDateTime(value: string) {
  const match = /^(\d{4})-(\d{2})-(\d{2})T(\d{2}):(\d{2})/.exec(value);
  if (!match) return value;
  const [, year, month, day, hour, minute] = match;
  const weekday = weekdays[new Date(Date.UTC(Number(year), Number(month) - 1, Number(day))).getUTCDay()];
  return `${year}년 ${Number(month)}월 ${Number(day)}일 (${weekday}) ${hour}:${minute}`;
}

export default function GuestInvitation({ invitation }: { invitation: Invitation }) {
  const [attendance, setAttendance] = useState<"yes" | "no">("yes");
  const [companions, setCompanions] = useState(0);
  const [submitted, setSubmitted] = useState<ResponseInput | null>(null);
  const [sending, setSending] = useState(false);
  const [error, setError] = useState("");
  const isDemo = invitation.id === "demo-invitation-1" || invitation.id === "empty";
  const date = formatDateTime(invitation.dateTime);

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (sending) return;
    const form = new FormData(event.currentTarget);
    const response: ResponseInput = {
      name: String(form.get("guestName") ?? "").trim(),
      attendance,
      companionCount: attendance === "yes" ? companions : 0,
    };
    setSending(true);
    setError("");
    try {
      if (!isDemo) {
        const result = await fetch(`/api/invitations/${encodeURIComponent(invitation.id)}/responses`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(response),
        });
        const data = await result.json();
        if (!result.ok) throw new Error(data.error ?? "응답을 저장하지 못했어요.");
      }
      setSubmitted(response);
    } catch (caught) {
      setError(caught instanceof Error ? caught.message : "응답을 저장하지 못했어요.");
    } finally {
      setSending(false);
    }
  }

  return (
    <main className={styles.viewport}>
      <article className={styles.letter}>
        <header className={styles.guestHero}>
          <span className={styles.eyebrow}>A LITTLE INVITATION LETTER</span>
          <div className={styles.guestArt}><NextImage src="/meonji/pomeranian-birthday-cake.png" alt="생일 케이크 옆에 앉은 먼지 일러스트" width={843} height={900} priority /></div>
          <h1 className={styles.guestTitle}>{invitation.title}</h1>
          <p className={styles.guestDate}>{date}</p>
        </header>
        <section className={styles.guestMessage} aria-label="초대하는 말">
          <div className={styles.tape} aria-hidden="true" />
          <span className={styles.eyebrow}>DEAR YOU</span>
          <p>{invitation.body}</p>
        </section>
        <section className={styles.guestInfo}>
          <span className={styles.eyebrow}>THE PARTY</span>
          <h2 className={styles.sectionTitle}>이날 함께해 줘 ♡</h2>
          <dl><div><dt>DATE</dt><dd>{date}</dd></div><div><dt>PLACE</dt><dd>{invitation.location}</dd></div></dl>
        </section>
        <section className={styles.guestRsvp}>
          <span className={styles.eyebrow}>R.S.V.P</span>
          <h2 className={styles.sectionTitle}>올 수 있는지 알려줘</h2>
          {submitted ? (
            <div className={styles.done} role="status">
              <span aria-hidden="true">♡</span>
              <strong>{submitted.name}님, 응답 고마워요!</strong>
              <p>{isDemo ? "예시 화면이라 응답은 저장되지 않았어요." : "응답을 저장했어요."}</p>
              <p>{submitted.attendance === "yes" ? `참석 · 동반 ${submitted.companionCount}명` : "불참"}</p>
            </div>
          ) : (
            <form className={styles.rsvpForm} onSubmit={submit}>
              <fieldset className={styles.choiceGroup}>
                <legend>참석 여부 <b aria-hidden="true">*</b></legend>
                <label><input type="radio" name="attendance" value="yes" checked={attendance === "yes"} onChange={() => setAttendance("yes")} required /> 참석할게요</label>
                <label><input type="radio" name="attendance" value="no" checked={attendance === "no"} onChange={() => setAttendance("no")} required /> 이번에는 어려워요</label>
              </fieldset>
              <label className={styles.field}><span>이름 <b aria-hidden="true">*</b></span><input name="guestName" type="text" autoComplete="name" maxLength={40} placeholder="이름을 적어주세요" required /></label>
              {attendance === "yes" && <div className={styles.companions}><span>동반 인원</span><div><button type="button" disabled={companions === 0} onClick={() => setCompanions(Math.max(0, companions - 1))} aria-label="동반 인원 줄이기">−</button><output aria-live="polite">{companions}명</output><button type="button" disabled={companions === 20} onClick={() => setCompanions(Math.min(20, companions + 1))} aria-label="동반 인원 늘리기">+</button></div><small>본인을 제외한 인원이에요.</small></div>}
              {error && <p className={styles.error} role="alert">{error}</p>}
              <button className={styles.primaryButton} type="submit" disabled={sending}>{sending ? "보내는 중..." : "참석 여부 보내기 ♡"}</button>
              {isDemo && <p className={styles.formFootnote}>예시 초대장의 응답은 저장되지 않아요.</p>}
            </form>
          )}
        </section>
      </article>
    </main>
  );
}
