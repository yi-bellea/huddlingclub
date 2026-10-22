import { mockInvitation, mockResponses } from "@/lib/mock";
import ResponsesOverview from "../../_components/ResponsesOverview";

export default function DemoResponsesPage() {
  return <ResponsesOverview invitation={mockInvitation} responses={mockResponses} />;
}
