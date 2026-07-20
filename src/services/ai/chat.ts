import { axiosOptionalAuth } from "@/src/services/api/customAxios";

export interface AiChatResponse {
  sessionId: string;
  answer: string;
  domain: "guesthouse" | "staff_step" | "jeju_travel" | "geharbang_service" | "greeting" | "out_of_scope";
  confidence: number;
}

export const postAiChat = async (
  message: string,
  sessionId?: string,
): Promise<AiChatResponse> => {
  const response = await axiosOptionalAuth.post<AiChatResponse>(
    "/api/v1/ai/chat",
    {
      message,
      sessionId: sessionId ?? null,
    },
    { timeout: 90_000 },
  );
  return response.data;
};
