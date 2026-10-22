import { mockEmptyInvitation, mockResponses } from "@/lib/mock";
import ResponsesOverview from "../../_components/ResponsesOverview";

export default function EmptyResponsesPage() {
  return <ResponsesOverview invitation={mockEmptyInvitation} responses={mockResponses} />;
}
