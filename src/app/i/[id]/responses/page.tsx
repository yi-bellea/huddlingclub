import { notFound } from "next/navigation";
import { getHostResponses, getInvitation } from "@/lib/db";
import ResponsesOverview from "../../_components/ResponsesOverview";

type ResponsesPageProps = {
  params: Promise<{ id: string }>;
  searchParams: Promise<{ key?: string }>;
};

export default async function ResponsesPage({ params, searchParams }: ResponsesPageProps) {
  const { id } = await params;
  const { key } = await searchParams;
  if (!key) return <main className="p-8">응답 현황 링크에 비공개 키가 없습니다.</main>;

  const responses = await getHostResponses(id, key);
  if (!responses) return <main className="p-8">응답 현황 링크가 올바르지 않습니다.</main>;
  const invitation = await getInvitation(id);
  if (!invitation) notFound();

  return <ResponsesOverview invitation={invitation} responses={responses} />;
}
