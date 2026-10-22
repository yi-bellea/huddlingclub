"use client";

import { useState } from "react";
import Button from "./Button";
import InputField from "./InputField";

export type CopyLinkFieldProps = {
  className?: string;
  description?: string;
  title?: string;
  url?: string;
};

export default function CopyLinkField({
  className = "",
  description = "게스트에게 공유하는 링크예요.",
  title = "초대장 링크",
  url = "…/i/k3f9x2a7",
}: CopyLinkFieldProps) {
  const [copyMessage, setCopyMessage] = useState("");

  async function copy() {
    try {
      const copyValue = url.startsWith("/") ? new URL(url, window.location.origin).toString() : url;
      await navigator.clipboard.writeText(copyValue);
      setCopyMessage("링크를 복사했어요.");
    } catch {
      setCopyMessage("링크를 복사하지 못했어요.");
    }
  }

  return (
    <div className={`flex w-full flex-col items-start gap-[var(--spacing-inline-md)] rounded-[var(--radius-card)] bg-[var(--color-surface-subtle)] p-[var(--spacing-stack-md)] ${className}`}>
      <p className="typography-label-lg text-[var(--color-text-strong)]">{title}</p>
      <div className="flex w-full min-w-0 items-center gap-[var(--spacing-inline-md)]">
        <InputField value={url} readOnly aria-label={`${title} 주소`} className="min-w-0 flex-1 truncate" />
        <Button size="sm" onClick={copy} disabled={!url} className="shrink-0">복사</Button>
      </div>
      <p aria-live="polite" className="typography-caption-md text-[var(--color-text-tertiary)]">
        {copyMessage || description}
      </p>
    </div>
  );
}
