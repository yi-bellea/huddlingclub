import { notFound } from "next/navigation";
import { getInvitation } from "@/lib/db";
import { mockEmptyInvitation, mockInvitation } from "@/lib/mock";
import GuestInvitation from "./GuestInvitation";

type GuestPageProps = {
  params: Promise<{ id: string }>;
};

export default async function GuestPage({ params }: GuestPageProps) {
  const { id } = await params;

  const invitation = id === "demo" || id === mockInvitation.id
    ? mockInvitation
    : id === mockEmptyInvitation.id ? mockEmptyInvitation : await getInvitation(id);
  if (!invitation) notFound();

  return <GuestInvitation invitation={invitation} />;
}
