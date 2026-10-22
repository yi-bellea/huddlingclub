"use client";

import NextImage from "next/image";
import { useEffect, useRef, useState, type FormEvent } from "react";
import {
  getBirthdayLabel,
  getBirthdayCountdown,
  meonjiInvitation,
  type BirthdayCountdown,
} from "@/lib/meonji";
import styles from "./MeonjiInvitation.module.css";

export type MeonjiPhoto = { src: string; alt: string };
export type MeonjiRsvp = {
  name: string;
  attendance: "yes" | "no";
  companionCount: number;
  note: string;
};

type Props = {
  photos?: readonly MeonjiPhoto[];
  onRsvpSubmit?: (response: MeonjiRsvp) => Promise<void>;
};

function Paw({ className = "" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 56 56" fill="currentColor" aria-hidden="true">
      <ellipse cx="13" cy="15" rx="4.3" ry="6.2" transform="rotate(-25 13 15)" />
      <ellipse cx="24" cy="10" rx="4.2" ry="6.5" transform="rotate(-8 24 10)" />
      <ellipse cx="36" cy="12" rx="4.2" ry="6.5" transform="rotate(12 36 12)" />
      <ellipse cx="46" cy="20" rx="4.1" ry="5.8" transform="rotate(32 46 20)" />
      <path d="M28 22c-5 0-7.4 3.1-10.2 6.5-2.7 3.4-6.1 5.9-6.1 9.5 0 4.9 4.3 8.4 8.6 8.4 3.1 0 5.4-1.9 7.7-1.9s4.6 1.9 7.7 1.9c4.3 0 8.6-3.5 8.6-8.4 0-3.6-3.4-6.1-6.1-9.5C35.4 25.1 33 22 28 22Z" />
    </svg>
  );
}

function Countdown() {
  const [countdown, setCountdown] = useState<BirthdayCountdown | null>(null);

  useEffect(() => {
    const update = () => setCountdown(getBirthdayCountdown());
    update();
    const timer = window.setInterval(update, 60_000);
    return () => window.clearInterval(timer);
  }, []);

  if (!countdown) return <p className={styles.countdownPending}>생일까지 남은 시간을 세는 중...</p>;
  if (countdown.state === "birthday") {
    return <p className={styles.countdownMessage}>오늘은 내 생일이야! 🎉</p>;
  }
  if (countdown.state === "past") {
    return <p className={styles.countdownMessage}>내 생일을 함께 기억해 줘서 고마워! 🎂</p>;
  }

  return (
    <div className={styles.countdown} aria-label={`생일까지 ${countdown.days}일 ${countdown.hours}시간 ${countdown.minutes}분 남음`}>
      <span className={styles.countdownBadge}>D-{countdown.days}</span>
      <span className={styles.countdownTime}>{String(countdown.hours).padStart(2, "0")} : {String(countdown.minutes).padStart(2, "0")}</span>
      <span className={styles.countdownCaption}>내 생일까지</span>
    </div>
  );
}

function Gallery({ photos }: { photos: readonly MeonjiPhoto[] }) {
  const [active, setActive] = useState<number | null>(null);
  const dialogRef = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;
    if (active === null) {
      if (dialog.open) dialog.close();
    } else if (!dialog.open) {
      dialog.showModal();
    }
  }, [active]);

  if (photos.length === 0) return null;

  return (
    <section className={`${styles.section} ${styles.gallerySection}`} data-reveal aria-label="먼지 사진">
      <p className={styles.eyebrow}>MEONJI&apos;S MOMENTS</p>
      <h2 className={styles.sectionTitle}>내 사진도 보고 가</h2>
      <div className={styles.galleryRail} aria-label="사진을 좌우로 넘겨 볼 수 있어요">
        {photos.map((photo, index) => (
          <button
            className={styles.photoButton}
            type="button"
            key={`${photo.src}-${index}`}
            onClick={() => setActive(index)}
            aria-label={`${photo.alt} 크게 보기`}
          >
            {/* 등록된 사용자 사진 경로는 행사 설정에서만 전달합니다. */}
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={photo.src} alt={photo.alt} loading="lazy" />
          </button>
        ))}
      </div>
      <p className={styles.galleryHint}>옆으로 넘기고, 누르면 크게 볼 수 있어.</p>
      <dialog ref={dialogRef} className={styles.photoDialog} onClose={() => setActive(null)} onClick={(event) => {
        if (event.target === dialogRef.current) setActive(null);
      }}>
        {active !== null && (
          <>
            <button type="button" className={styles.dialogClose} onClick={() => setActive(null)} aria-label="사진 닫기">×</button>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={photos[active].src} alt={photos[active].alt} />
          </>
        )}
      </dialog>
    </section>
  );
}

function Rsvp({ onSubmit }: { onSubmit?: Props["onRsvpSubmit"] }) {
  const [attendance, setAttendance] = useState<"yes" | "no" | null>(null);
  const [companions, setCompanions] = useState(0);
  const [submitted, setSubmitted] = useState<MeonjiRsvp | null>(null);
  const [sending, setSending] = useState(false);
  const [error, setError] = useState("");

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!onSubmit || !attendance) return;
    const form = new FormData(event.currentTarget);
    const response: MeonjiRsvp = {
      name: String(form.get("guestName") ?? "").trim().slice(0, 40),
      attendance,
      companionCount: attendance === "yes" ? companions : 0,
      note: String(form.get("note") ?? "").trim().slice(0, 500),
    };
    if (!response.name) {
      setError("이름을 적어줘.");
      return;
    }
    setSending(true);
    setError("");
    try {
      await onSubmit(response);
      setSubmitted(response);
    } catch {
      setError("응답을 보내지 못했어. 잠시 후 다시 시도해 줘.");
    } finally {
      setSending(false);
    }
  }

  return (
    <section className={`${styles.section} ${styles.rsvpSection}`} data-reveal id="rsvp">
      <p className={styles.eyebrow}>R.S.V.P</p>
      <h2 className={styles.sectionTitle}>{meonjiInvitation.rsvp.title}</h2>
      <div className={styles.bodyCopy}>
        {meonjiInvitation.rsvp.paragraphs.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
      </div>
      {submitted ? (
        <div className={styles.rsvpDone} role="status">
          <Paw className={styles.donePaw} />
          <p>{submitted.attendance === "yes" ? meonjiInvitation.rsvp.attendingMessage : meonjiInvitation.rsvp.notAttendingMessage}</p>
        </div>
      ) : (
        <form className={styles.rsvpForm} onSubmit={handleSubmit}>
          <fieldset className={styles.choiceGroup}>
            <legend className={styles.fieldLabel}>참석 여부 <span className={styles.requiredMark} aria-hidden="true">*</span></legend>
            <label className={`${styles.choice} ${attendance === "yes" ? styles.choiceSelected : ""}`}>
              <input type="radio" name="attendance" value="yes" checked={attendance === "yes"} onChange={() => setAttendance("yes")} required />
              <span>{meonjiInvitation.rsvp.attendingLabel}</span>
            </label>
            <label className={`${styles.choice} ${attendance === "no" ? styles.choiceSelected : ""}`}>
              <input type="radio" name="attendance" value="no" checked={attendance === "no"} onChange={() => setAttendance("no")} required />
              <span>{meonjiInvitation.rsvp.notAttendingLabel}</span>
            </label>
          </fieldset>
          <label className={styles.field}>
            <span className={styles.fieldLabel}>이름 <span className={styles.requiredMark} aria-hidden="true">*</span></span>
            <input name="guestName" type="text" autoComplete="name" maxLength={40} placeholder="이름을 적어줘" required />
          </label>
          {attendance === "yes" && (
            <div className={styles.field}>
              <span className={styles.fieldLabel} id="companions-label">동반 인원</span>
              <div className={styles.stepper} role="group" aria-labelledby="companions-label">
                <button type="button" disabled={companions === 0} onClick={() => setCompanions((value) => Math.max(0, value - 1))} aria-label="동반 인원 줄이기">−</button>
                <output aria-live="polite">{companions}명</output>
                <button type="button" disabled={companions === 20} onClick={() => setCompanions((value) => Math.min(20, value + 1))} aria-label="동반 인원 늘리기">+</button>
              </div>
              <small>너를 제외하고 함께 오는 사람 수야.</small>
            </div>
          )}
          <label className={styles.field}>
            <span className={styles.fieldLabel}>먼지에게 한마디 <span className={styles.optional}>(선택)</span></span>
            <textarea name="note" rows={3} maxLength={500} placeholder="하고 싶은 말을 남겨줘" />
          </label>
          {error && <p className={styles.formError} role="alert">{error}</p>}
          {!onSubmit && <p className={styles.formNotice}>참석 회신은 아직 준비 중이에요.</p>}
          <button className={styles.primaryButton} type="submit" disabled={!onSubmit || !attendance || sending}>
            {sending ? "보내는 중..." : "먼지에게 답장 보내기"}
          </button>
        </form>
      )}
    </section>
  );
}

export default function MeonjiInvitation({ photos = [], onRsvpSubmit }: Props) {
  const rootRef = useRef<HTMLElement>(null);
  const [shareMessage, setShareMessage] = useState("");
  const [copyMessage, setCopyMessage] = useState("");
  const address = meonjiInvitation.address;
  const mapUrl = address ? `https://map.kakao.com/link/search/${encodeURIComponent(address)}` : null;

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;
    const sections = root.querySelectorAll<HTMLElement>("[data-reveal]");
    if (!window.IntersectionObserver || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const observer = new IntersectionObserver((entries) => {
      for (const entry of entries) {
        if (entry.isIntersecting) {
          entry.target.classList.add(styles.visible);
          observer.unobserve(entry.target);
        }
      }
    }, { threshold: 0.12 });
    sections.forEach((section) => {
      section.classList.add(styles.reveal);
      observer.observe(section);
    });
    return () => observer.disconnect();
  }, []);

  async function copyAddress() {
    if (!address) return;
    try {
      await navigator.clipboard.writeText(address);
      setCopyMessage("주소를 복사했어.");
    } catch {
      setCopyMessage("주소를 복사하지 못했어.");
    }
  }

  async function shareInvitation() {
    const url = window.location.href;
    const data = { title: meonjiInvitation.title, text: "나랑 생일 같이 보내줄래?", url };
    try {
      if (navigator.share) {
        await navigator.share(data);
        setShareMessage("");
      } else {
        await navigator.clipboard.writeText(url);
        setShareMessage("초대장 링크를 복사했어.");
      }
    } catch (error) {
      if (error instanceof DOMException && error.name === "AbortError") return;
      setShareMessage("공유하지 못했어. 다시 시도해 줘.");
    }
  }

  return (
    <main className={styles.viewport} ref={rootRef}>
      <article className={styles.letter}>
        <section className={styles.cover} aria-labelledby="invitation-title">
          <div className={styles.coverTop}>
            <span>TO. 나를 아껴주는 너에게</span>
            <span className={styles.coverStar} aria-hidden="true">✳</span>
          </div>
          <div className={styles.coverArt}>
            <span className={styles.doodleStar} aria-hidden="true">✳</span>
            <NextImage
              className={styles.birthdayIllustration}
              src="/meonji/pomeranian-birthday-cake.png"
              alt="생일 케이크 옆에 앉은 포메라니안 일러스트"
              width={843}
              height={900}
              priority
            />
            <span className={styles.doodleHeart} aria-hidden="true">♡</span>
          </div>
          <p className={styles.eyebrow}>A LITTLE BIRTHDAY LETTER</p>
          <h1 className={styles.coverTitle} id="invitation-title">먼지의<br />열한 번째 생일</h1>
          <p className={styles.coverSub}>나랑 생일 같이 보내줄래?</p>
          <p className={styles.coverDate}>{getBirthdayLabel()}</p>
          <a className={styles.scrollCue} href="#invitation">편지 열어보기 <span aria-hidden="true">↓</span></a>
        </section>

        <section className={`${styles.section} ${styles.invitationSection}`} data-reveal id="invitation">
          <div className={styles.tape} aria-hidden="true" />
          <p className={styles.eyebrow}>DEAR YOU</p>
          <h2 className={styles.sectionTitle}>{meonjiInvitation.invitation.title}</h2>
          <div className={styles.bodyCopy}>
            {meonjiInvitation.invitation.paragraphs.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
          </div>
          <p className={styles.emphasis}>{meonjiInvitation.invitation.emphasis}</p>
          <div className={styles.signature}>FROM. 먼지 <Paw className={styles.signaturePaw} /></div>
        </section>

        <section className={`${styles.section} ${styles.infoSection}`} data-reveal id="party-info">
          <p className={styles.eyebrow}>THE PARTY</p>
          <h2 className={styles.sectionTitle}>내 생일에 초대할게! 🎂</h2>
          <Countdown />
          <dl className={styles.details}>
            <div><dt>PARTY</dt><dd>{meonjiInvitation.title}</dd></div>
            <div><dt>DATE</dt><dd>{getBirthdayLabel()}</dd></div>
            <div><dt>TIME</dt><dd>{meonjiInvitation.partyTime ?? "추후 입력"}</dd></div>
            <div><dt>PLACE</dt><dd>{meonjiInvitation.place ?? "추후 입력"}{address && <small>{address}</small>}</dd></div>
            <div><dt>DRESS CODE</dt><dd>{meonjiInvitation.dressCode}</dd></div>
          </dl>
          <p className={styles.infoPostscript}>이날은 내가 주인공이래.<br />조금 설레는 중이야.</p>
          {mapUrl && (
            <div className={styles.locationActions}>
              <a href={mapUrl} target="_blank" rel="noopener noreferrer">카카오맵에서 보기 ↗</a>
              <button type="button" onClick={copyAddress}>주소 복사하기</button>
            </div>
          )}
          {copyMessage && <p className={styles.actionMessage} role="status">{copyMessage}</p>}
        </section>

        <Gallery photos={photos} />
        <Rsvp onSubmit={onRsvpSubmit} />

        <section className={`${styles.section} ${styles.closingSection}`} data-reveal>
          <div className={styles.closingRibbon} aria-hidden="true">⌁</div>
          <Paw className={styles.closingPaw} />
          <p className={styles.eyebrow}>LOVE, MEONJI</p>
          <h2 className={styles.sectionTitle}>{meonjiInvitation.closing.title}</h2>
          <div className={styles.bodyCopy}>
            {meonjiInvitation.closing.paragraphs.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
          </div>
          <button className={styles.shareButton} type="button" onClick={shareInvitation}>초대장 공유하기 ↗</button>
          {shareMessage && <p className={styles.actionMessage} role="status">{shareMessage}</p>}
          <p className={styles.footerMark}>WITH LOVE, MEONJI · 2027</p>
        </section>
      </article>
    </main>
  );
}
