import { createHash, randomBytes, randomUUID } from "node:crypto";
import type { Invitation, InvitationResponse } from "./invitation-types";
import type { InvitationInput, ResponseInput } from "./validation";

function config() {
  const url = process.env.SUPABASE_URL;
  const key = process.env.SUPABASE_PUBLISHABLE_KEY;
  if (!url || !key) throw new Error("Supabase 연결 설정이 없습니다.");
  return { url, key };
}

async function supabaseRequest(path: string, init: RequestInit = {}) {
  const { url, key } = config();
  const response = await fetch(`${url}/rest/v1/${path}`, {
    ...init,
    headers: {
      apikey: key,
      "Content-Type": "application/json",
      ...init.headers,
    },
    cache: "no-store",
  });
  if (!response.ok) throw new Error(`Supabase 요청 실패 (${response.status})`);
  return response;
}

export async function createInvitation(input: InvitationInput): Promise<{ invitation: Invitation; hostSecret: string }> {
  const invitation: Invitation = { id: randomUUID(), ...input };
  const hostSecret = randomBytes(32).toString("hex");
  const hostSecretHash = createHash("sha256").update(hostSecret).digest("hex");
  await supabaseRequest("invitations", {
    method: "POST",
    headers: { Prefer: "return=minimal" },
    body: JSON.stringify({ ...invitation, hostSecretHash }),
  });
  return { invitation, hostSecret };
}

export async function getInvitation(id: string): Promise<Invitation | null> {
  const query = new URLSearchParams({
    select: 'id,title,"dateTime",location,body',
    id: `eq.${id}`,
    limit: "1",
  });
  const response = await supabaseRequest(`invitations?${query}`);
  const rows = await response.json() as Invitation[];
  return rows[0] ?? null;
}

export async function saveResponse(invitationId: string, input: ResponseInput): Promise<InvitationResponse> {
  const response: InvitationResponse = { id: randomUUID(), invitationId, ...input };
  await supabaseRequest("rsvps", {
    method: "POST",
    headers: { Prefer: "return=minimal" },
    body: JSON.stringify(response),
  });
  return response;
}

export async function getHostResponses(invitationId: string, hostSecret: string): Promise<InvitationResponse[] | null> {
  const { url, key } = config();
  const response = await fetch(`${url}/rest/v1/rpc/get_host_responses`, {
    method: "POST",
    headers: { apikey: key, "Content-Type": "application/json" },
    body: JSON.stringify({ p_invitation_id: invitationId, p_host_secret: hostSecret }),
    cache: "no-store",
  });
  if (!response.ok) {
    const error = await response.json().catch(() => null) as { code?: string } | null;
    if (error?.code === "P0001") return null;
    throw new Error(`Supabase 요청 실패 (${response.status})`);
  }
  return await response.json() as InvitationResponse[];
}
