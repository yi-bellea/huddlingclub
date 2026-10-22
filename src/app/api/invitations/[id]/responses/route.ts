import { getInvitation, saveResponse } from "@/lib/db";
import { validateResponseInput } from "@/lib/validation";

export const runtime = "nodejs";

export async function POST(request: Request, context: { params: Promise<{ id: string }> }) {
  const { id } = await context.params;
  try {
    if (!await getInvitation(id)) return Response.json({ error: "초대장을 찾을 수 없어요." }, { status: 404 });
  } catch {
    return Response.json({ error: "초대장을 확인하지 못했어요. 다시 시도해 주세요." }, { status: 500 });
  }
  let input;
  try {
    input = validateResponseInput(await request.json());
  } catch (error) {
    return Response.json({ error: error instanceof SyntaxError ? "응답 내용을 확인해 주세요." : (error as Error).message }, { status: 400 });
  }
  try {
    return Response.json(await saveResponse(id, input), { status: 201 });
  } catch {
    return Response.json({ error: "응답을 저장하지 못했어요. 다시 시도해 주세요." }, { status: 500 });
  }
}
