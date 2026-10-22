"use client";

import { useState, type FormEvent } from "react";
import Button from "./Button";
import InfoRow from "./InfoRow";
import Input from "./Input";
import Label from "./Label";
import RadioOption from "./RadioOption";
import Stepper from "./Stepper";
import SuccessIcon from "./SuccessIcon";

export type RSVPResponse = {
  name: string;
  attendance: "yes" | "no";
  companionCount: number;
};

export type RSVPCardProps = {
  className?: string;
  state?: "form" | "done";
  name?: string;
  attendance?: "yes" | "no";
  companionCount?: number;
  doneDescription?: string;
  doneTitle?: string;
  onSubmit?: (response: RSVPResponse) => void;
};

export default function RSVPCard({
  className = "",
  state = "form",
  name = "김허들",
  attendance = "yes",
  companionCount = 1,
  doneDescription = "호스트에게 응답이 전달됐어요.",
  doneTitle = "참석 여부를 보냈어요",
  onSubmit,
}: RSVPCardProps) {
  const [companions, setCompanions] = useState(companionCount);

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    const responseName = String(form.get("guestName") ?? "").trim();
    const responseAttendance = form.get("attendance") === "no" ? "no" : "yes";
    if (!responseName) return;
    onSubmit?.({
      name: responseName,
      attendance: responseAttendance,
      companionCount: responseAttendance === "yes" ? companions : 0,
    });
  }

  return (
    <section className={`flex w-full flex-col gap-[var(--spacing-stack-lg)] overflow-hidden rounded-[var(--radius-card)] bg-[var(--color-surface-default)] px-[var(--spacing-page-horizontal)] py-[var(--spacing-stack-lg)] ${className}`}>
      {state === "form" ? (
        <>
          <div className="flex flex-col items-center gap-[var(--spacing-inline-compact)] text-center">
            <h2 className="typography-heading-lg text-[var(--color-text-strong)]">참석 여부 알려주기</h2>
            <p className="typography-body-md text-[var(--color-text-secondary)]">이름과 참석 여부를 남겨주세요.</p>
          </div>
          <form onSubmit={handleSubmit} className="flex w-full flex-col gap-[var(--spacing-stack-lg)]">
            <Input name="guestName" label="이름" placeholder="이름을 입력해주세요" required />
            <fieldset className="min-w-0">
              <legend><Label label="참석 여부" required /></legend>
              <div className="flex w-full items-center">
                <RadioOption name="attendance" value="yes" label="참석" defaultChecked={attendance === "yes"} required requiredLabel={false} className="min-w-0 flex-1" />
                <RadioOption name="attendance" value="no" label="불참" defaultChecked={attendance === "no"} required requiredLabel={false} className="min-w-0 flex-1" />
              </div>
            </fieldset>
            <div className="flex flex-col items-start gap-[var(--spacing-inline-md)]">
              <Label label="동반 인원" required />
              <Stepper value={companions} onChange={setCompanions} />
              <p className="typography-caption-md text-[var(--color-text-tertiary)]">본인을 제외하고 함께 오는 인원이에요.</p>
            </div>
            <Button size="lg" type="submit" className="w-full">참석 여부 보내기</Button>
          </form>
        </>
      ) : (
        <>
          <div className="flex w-full flex-col items-center gap-[var(--spacing-stack-sm)] py-[var(--spacing-section-lg)] text-center">
            <SuccessIcon />
            <h2 className="typography-title-lg text-[var(--color-text-strong)]">{doneTitle}</h2>
            <p className="typography-body-md text-[var(--color-text-secondary)]">{doneDescription}</p>
          </div>
          <div className="flex w-full flex-col gap-[var(--spacing-inline-md)] rounded-[var(--radius-card)] bg-[var(--color-surface-subtle)] p-[var(--spacing-stack-md)]">
            <InfoRow type="spread" label="이름" value={name} />
            <InfoRow type="spread" label="참석 여부" value={attendance === "yes" ? "참석" : "불참"} />
            {attendance === "yes" && <InfoRow type="spread" label="동반 인원" value={`${companionCount}명`} />}
          </div>
        </>
      )}
    </section>
  );
}
