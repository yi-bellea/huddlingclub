import type { InvitationResponse } from "./invitation-types";

export type InvitationInput = {
  title: string;
  dateTime: string;
  location: string;
  body: string;
};

export type ResponseInput = Pick<InvitationResponse, "name" | "attendance" | "companionCount">;

function readText(value: unknown, label: string, maxLength: number): string {
  if (typeof value !== "string") throw new Error(`${label}을(를) 입력해 주세요.`);
  const trimmed = value.trim();
  if (!trimmed) throw new Error(`${label}을(를) 입력해 주세요.`);
  if (trimmed.length > maxLength) throw new Error(`${label}은(는) ${maxLength}자 이내로 입력해 주세요.`);
  return trimmed;
}

export function validateInvitationInput(value: unknown): InvitationInput {
  if (!value || typeof value !== "object") throw new Error("초대장 내용을 확인해 주세요.");
  const input = value as Record<string, unknown>;
  return {
    title: readText(input.title, "제목", 100),
    dateTime: readText(input.dateTime, "일시", 120),
    location: readText(input.location, "장소", 200),
    body: readText(input.body, "본문", 3000),
  };
}

export function validateResponseInput(value: unknown): ResponseInput {
  if (!value || typeof value !== "object") throw new Error("응답 내용을 확인해 주세요.");
  const input = value as Record<string, unknown>;
  const attendance = input.attendance;
  if (attendance !== "yes" && attendance !== "no") throw new Error("참석 여부를 선택해 주세요.");
  const companionCount = input.companionCount;
  if (!Number.isInteger(companionCount) || (companionCount as number) < 0 || (companionCount as number) > 20) {
    throw new Error("동반 인원은 0명부터 20명까지 입력해 주세요.");
  }
  return {
    name: readText(input.name, "이름", 40),
    attendance,
    companionCount: attendance === "yes" ? companionCount as number : 0,
  };
}
