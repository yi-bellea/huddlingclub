"use client";

import { useState } from "react";
import Button from "@/components/Button";

export default function CopyInvitationLinkButton({ invitationId }: { invitationId: string }) {
  const [message, setMessage] = useState("");

  async function copyLink() {
    const link = new URL(`/i/${invitationId}`, window.location.origin).toString();

    try {
      await navigator.clipboard.writeText(link);
      setMessage("초대장 링크를 복사했어요.");
    } catch {
      setMessage(`복사하지 못했어요. 주소를 직접 복사해 주세요: ${link}`);
    }
  }

  return (
    <div className="flex w-full flex-col gap-[var(--spacing-inline-md)]">
      <Button size="lg" className="w-full" onClick={copyLink}>
        초대장 링크 복사하기
      </Button>
      {message && <p role="status" className="break-all typography-caption-md text-[var(--color-text-tertiary)]">{message}</p>}
    </div>
  );
}
