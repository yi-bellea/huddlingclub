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
