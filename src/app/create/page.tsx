"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Button from "@/components/Button";
import CopyLinkField from "@/components/CopyLinkField";
import Image from "@/components/Image";
import InfoRow from "@/components/InfoRow";
import Input from "@/components/Input";
import InvitationCover from "@/components/InvitationCover";
import Label from "@/components/Label";
import NavBar from "@/components/NavBar";
import SuccessIcon from "@/components/SuccessIcon";
import Textarea from "@/components/Textarea";

export default function CreatePage() {
  const router = useRouter();
  const [title, setTitle] = useState("");
  const [date, setDate] = useState("");
  const [location, setLocation] = useState("");
  const [body, setBody] = useState("");
  const [showDemoLinks, setShowDemoLinks] = useState(false);
  const isComplete = [title, date, location, body].every((value) => value.trim().length > 0);

  useEffect(() => {
    if (new URLSearchParams(window.location.search).get("preview") === "published") {
      setShowDemoLinks(true);
    }
  }, []);

  if (showDemoLinks) {
    return (
      <main className="mx-auto flex min-h-dvh w-full max-w-[calc(var(--spacing-120)+var(--spacing-120)+var(--spacing-120)+var(--spacing-10)+var(--spacing-5))] flex-col gap-[var(--spacing-page-horizontal)] bg-[var(--color-surface-default)]">
        <NavBar title="데모 링크 준비" />

        <div className="flex flex-col gap-[var(--spacing-section-lg)] px-[var(--spacing-page-horizontal)] pb-[var(--spacing-cover-inset)]">
          <section className="flex w-full flex-col items-center gap-[var(--spacing-stack-sm)] py-[var(--spacing-stack-lg)] text-center">
            <SuccessIcon />
            <h1 className="typography-title-lg text-[var(--color-text-strong)]">데모 링크가 준비됐어요</h1>
            <p className="typography-body-md text-[var(--color-text-secondary)]">아래 두 링크를 복사해 확인해 보세요.</p>
            <p className="typography-caption-md text-[var(--color-text-tertiary)]">
              입력한 내용은 저장되지 않았어요. 두 링크에는 예시 초대장과 예시 응답이 표시됩니다.
            </p>
          </section>

          <CopyLinkField
            title="초대장 링크"
            description="게스트에게 보여줄 예시 초대장 링크예요."
            url="/i/demo"
          />
          <CopyLinkField
            title="응답 현황 링크"
            description="예시 응답 목록이에요. 실제 응답은 저장되지 않아요."
            url="/i/demo/responses"
          />

          <Button size="lg" className="w-full" onClick={() => router.push("/i/demo")}>
            데모 초대장 보기
          </Button>
        </div>
      </main>
    );
  }

  return (
    <main className="mx-auto min-h-dvh w-full max-w-[calc(var(--spacing-120)+var(--spacing-120)+var(--spacing-120)+var(--spacing-10)+var(--spacing-5))] bg-[var(--color-surface-default)]">
      <NavBar title="초대장 만들기" />

      <div className="flex flex-col gap-[var(--spacing-section-lg)] px-[var(--spacing-page-horizontal)] pb-[calc(var(--spacing-80)+var(--spacing-80))] pt-[var(--spacing-control-compact)]">
        <div className="flex flex-col gap-[var(--spacing-stack-lg)]">
          <Textarea
            label="제목"
            name="title"
            rows={2}
            value={title}
            onChange={(event) => setTitle(event.target.value.split("\n").slice(0, 2).join("\n"))}
            placeholder={"예) 허들링 클럽 2번째\n오프라인 밋업"}
            helper="엔터로 줄을 나눌 수 있어요 · 최대 2줄"
            showHelper
          />
          <Input
            label="일시"
            name="date"
            value={date}
            onChange={(event) => setDate(event.target.value)}
            placeholder="예) 2026년 11월 14일 (토) 09:00"
          />
          <Input
            label="장소"
            name="location"
            value={location}
            onChange={(event) => setLocation(event.target.value)}
            placeholder="예) 세종 남극 기지"
          />
          <Textarea
            label="본문"
            name="body"
            rows={4}
            value={body}
            onChange={(event) => setBody(event.target.value)}
            placeholder="게스트에게 전할 초대 글을 적어주세요"
          />
        </div>

        <section aria-label="실시간 미리보기" className="flex min-w-0 flex-col gap-[var(--spacing-inline-md)]">
          <Label label="미리보기" required={false} />
          <div className="h-[calc(var(--spacing-120)+var(--spacing-120)+var(--spacing-120)+var(--spacing-120)+var(--spacing-8))] w-full overflow-y-auto overscroll-contain rounded-[var(--radius-control)] border-[length:var(--spacing)] border-[color:var(--color-border-subtle)] bg-[var(--color-surface-default)]">
            <InvitationCover title={title} date={date} location={location} />
            <div className="flex flex-col items-center px-[var(--spacing-page-horizontal)] py-[var(--spacing-cover-inset)]">
              <div className="flex w-full flex-col items-center gap-[calc(var(--spacing-40)+var(--spacing-12))]">
                <Image type="flag" />
                <p className="w-full whitespace-pre-wrap break-words text-center typography-preserved-regular-15-10 text-[var(--color-guide-text-preserved-1)]">
                  {body}
                </p>
              </div>
            </div>
            <div className="px-[var(--spacing-page-horizontal)] pb-[var(--spacing-section-lg)] pt-[var(--spacing-stack-lg)]">
              <div className="flex flex-col gap-[var(--spacing-control-compact)] rounded-[var(--radius-card)] bg-[var(--color-surface-subtle)] p-[var(--spacing-page-horizontal)]">
                <InfoRow label="일시" value={date} />
                <InfoRow label="장소" value={location} />
              </div>
            </div>
            <p className="px-[var(--spacing-page-horizontal)] pb-[var(--spacing-inline-md)] typography-caption-md text-[var(--color-text-tertiary)]">
              입력하는 내용이 바로 미리보기에 반영돼요.
            </p>
          </div>
        </section>
      </div>

      <div className="fixed inset-x-0 bottom-0 mx-auto w-full max-w-[calc(var(--spacing-120)+var(--spacing-120)+var(--spacing-120)+var(--spacing-10)+var(--spacing-5))] bg-[var(--color-surface-default)] p-[var(--spacing-page-horizontal)]">
        <Button size="lg" className="w-full" disabled={!isComplete} onClick={() => setShowDemoLinks(true)}>
          발행하기
        </Button>
      </div>
    </main>
  );
}
