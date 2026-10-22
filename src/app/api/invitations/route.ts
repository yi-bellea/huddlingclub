import { createInvitation } from "@/lib/db";
import { validateInvitationInput } from "@/lib/validation";

export const runtime = "nodejs";

export async function POST(request: Request) {
  let input;
  try {
    input = validateInvitationInput(await request.json());
  } catch (error) {
    return Response.json({ error: error instanceof SyntaxError ? "초대장 내용을 확인해 주세요." : (error as Error).message }, { status: 400 });
  }
  try {
    return Response.json(await createInvitation(input), { status: 201 });
  } catch {
    return Response.json({ error: "초대장을 저장하지 못했어요. 다시 시도해 주세요." }, { status: 500 });
  }
}
