import type { Metadata } from "next";
import MeonjiInvitation from "@/components/meonji/MeonjiInvitation";
import { meonjiPhotos } from "@/lib/meonji";

export const metadata: Metadata = {
  title: "먼지의 열한 번째 생일 초대장",
  description: "먼지가 너에게 보내는 작은 생일 편지",
};

export default function MeonjiBirthdayPage() {
  return <MeonjiInvitation photos={meonjiPhotos} />;
}
