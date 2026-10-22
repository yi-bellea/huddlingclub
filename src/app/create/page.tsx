"use client";

import NextImage from "next/image";
import Link from "next/link";
import { useState, type FormEvent } from "react";
import CopyLinkField from "@/components/CopyLinkField";
import styles from "@/components/meonji/InvitationTemplate.module.css";

type PublishedLinks = { invitation: string; responses: string };

export default function CreatePage() {
  const [title, setTitle] = useState("");
  const [dateTime, setDateTime] = useState("");
  const [location, setLocation] = useState("");
  const [body, setBody] = useState("");
  const [links, setLinks] = useState<PublishedLinks | null>(null);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  async function publish(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (saving) return;
    setSaving(true);
    setError("");
    try {
      const response = await fetch("/api/invitations", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title, dateTime, location, body }),
      });
      const result = await response.json();
      if (!response.ok) throw new Error(result.error ?? "초대장을 저장하지 못했어요.");
      const id = encodeURIComponent(result.invitation.id);
      setLinks({
        invitation: `/i/${id}`,
        responses: `/i/${id}/responses?key=${encodeURIComponent(result.hostSecret)}`,
      });
    } catch (caught) {
      setError(caught instanceof Error ? caught.message : "초대장을 저장하지 못했어요.");
    } finally {
      setSaving(false);
    }
  }

  return (
    <main className={styles.viewport}>
      <div className={styles.letter}>
        <header className={styles.header}>
          <Link href="/i/meonji-11" className={styles.backLink}>← 먼지 초대장 보기</Link>
          <span className={styles.headerStar} aria-hidden="true">✳</span>
        </header>
        {links ? (
          <div className={styles.published}>
            <span className={styles.eyebrow}>YOUR LETTER IS READY</span>
            <h1 className={styles.pageTitle}>초대장이<br />준비됐어요!</h1>
            <p className={styles.intro}>작성한 초대장이 저장됐어요. 아래 링크로 확인해 보세요.</p>
            <div className={styles.publishedArt} aria-hidden="true">♡ ✳ ♡</div>
            <CopyLinkField title="게스트 초대장 링크" description="게스트에게 공유할 주소예요." url={links.invitation} />
            <CopyLinkField title="호스트 응답 현황 링크" description="응답자 이름이 보이는 비공개 주소예요. 게스트에게 공유하지 마세요." url={links.responses} />
            <p className={styles.notice}>호스트 응답 현황 링크는 따로 보관하고 게스트에게 공유하지 마세요.</p>
            <Link className={styles.primaryLink} href={links.invitation}>초대장 열어보기 ↗</Link>
            <button className={styles.secondaryButton} type="button" onClick={() => setLinks(null)}>다른 초대장 만들기</button>
          </div>
        ) : (
          <>
            <div className={styles.hero}>
              <span className={styles.eyebrow}>WRITE A LITTLE LETTER</span>
              <h1 className={styles.pageTitle}>마음을 담아<br />초대장을 만들어요</h1>
              <p className={styles.intro}>먼지의 생일 편지처럼, 전하고 싶은 이야기를 적어주세요.</p>
              <div className={styles.heroArt}>
                <span aria-hidden="true" className={styles.heroDoodle}>♡</span>
                <NextImage src="/meonji/pomeranian-birthday-cake.png" alt="생일 케이크 옆에 앉은 먼지 일러스트" width={843} height={900} priority />
                <span aria-hidden="true" className={styles.heroStar}>✳</span>
              </div>
            </div>
            <form className={styles.form} onSubmit={publish}>
              <span className={styles.eyebrow}>THE PARTY</span>
              <h2 className={styles.sectionTitle}>어떤 날인지 알려줘</h2>
              <label className={styles.field}><span>초대장 제목 <b aria-hidden="true">*</b></span><input name="title" value={title} onChange={(event) => setTitle(event.target.value)} maxLength={100} placeholder="예) 먼지의 11번째 생일파티" required /></label>
              <label className={styles.field}><span>일시 <b aria-hidden="true">*</b></span><input name="dateTime" value={dateTime} onChange={(event) => setDateTime(event.target.value)} maxLength={120} placeholder="예) 2027년 9월 15일 오후 3시" required /></label>
              <label className={styles.field}><span>장소 <b aria-hidden="true">*</b></span><input name="location" value={location} onChange={(event) => setLocation(event.target.value)} maxLength={200} placeholder="예) 서울 마포구 ○○카페" required /></label>
              <label className={styles.field}><span>초대하는 말 <b aria-hidden="true">*</b></span><textarea name="body" value={body} onChange={(event) => setBody(event.target.value)} maxLength={3000} rows={5} placeholder="함께하고 싶은 마음을 적어주세요." required /></label>
              <section className={styles.preview} aria-label="실시간 미리보기">
                <div className={styles.tape} aria-hidden="true" />
                <span className={styles.eyebrow}>DEAR YOU · 미리보기</span>
                <h3>{title.trim() || "초대장 제목"}</h3>
                <p className={styles.previewBody}>{body.trim() || "여기에 초대하는 말이 보여요."}</p>
                <dl><div><dt>DATE</dt><dd>{dateTime.trim() || "일시"}</dd></div><div><dt>PLACE</dt><dd>{location.trim() || "장소"}</dd></div></dl>
              </section>
              {error && <p className={styles.error} role="alert">{error}</p>}
              <button className={styles.primaryButton} type="submit" disabled={saving || !title.trim() || !dateTime.trim() || !location.trim() || !body.trim()}>{saving ? "편지를 저장하는 중..." : "초대장 발행하기 ♡"}</button>
              <p className={styles.formFootnote}>발행하면 입력한 내용이 저장됩니다.</p>
            </form>
          </>
        )}
      </div>
    </main>
  );
}
