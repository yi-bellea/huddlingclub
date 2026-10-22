export type Invitation = {
  id: string;
  title: string;
  dateTime: string;
  location: string;
  body: string;
};

export type InvitationResponse = {
  id: string;
  invitationId: string;
  name: string;
  attendance: "yes" | "no";
  companionCount: number;
};

export const mockInvitation: Invitation = {
  id: "demo-invitation-1",
  title: "허들링 클럽 두 번째 모임",
  dateTime: "2026-11-14T09:00:00+09:00",
  location: "서울특별시 마포구 예시로 12",
  body: "함께 만들고 배운 내용을 나누는 오프라인 모임입니다. 편한 마음으로 참석해 주세요.",
};

export const mockEmptyInvitation: Invitation = {
  ...mockInvitation,
  id: "empty",
};

export const mockResponses: InvitationResponse[] = [
  {
    id: "demo-response-1",
    invitationId: mockInvitation.id,
    name: "김하늘",
    attendance: "yes",
    companionCount: 2,
  },
  {
    id: "demo-response-2",
    invitationId: mockInvitation.id,
    name: "이서준",
    attendance: "no",
    companionCount: 0,
  },
  {
    id: "demo-response-3",
    invitationId: mockInvitation.id,
    name: "박지민",
    attendance: "yes",
    companionCount: 0,
  },
];
