import {
  axiosOptionalAuth,
  axiosPrivate,
} from "@/src/services/api/customAxios";
import { File } from "@/src/types/File";

export interface AiChatResponse {
  sessionId: string;
  answer: string;
  domain: "guesthouse" | "staff_step" | "jeju_travel" | "geharbang_service" | "greeting" | "out_of_scope";
  confidence: number;
}

export interface AiConversationSummary {
  sessionId: string;
  title: string;
  lastMessage: string;
  createdAt: string;
  updatedAt: string;
}

export interface AiConversationMessage {
  id: number;
  role: "user" | "assistant";
  content: string;
  imageUrl: string | null;
  domain: AiChatResponse["domain"] | null;
  confidence: number | null;
  createdAt: string;
}

export interface AiConversationDetail {
  sessionId: string;
  title: string;
  messages: AiConversationMessage[];
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

export const postAiChatWithImage = async (
  message: string,
  image: File,
  sessionId?: string,
): Promise<AiChatResponse> => {
  const formData = new FormData();
  formData.append("message", message);
  if (sessionId) {
    formData.append("sessionId", sessionId);
  }
  formData.append("image", image as unknown as Blob);

  const response = await axiosOptionalAuth.post<AiChatResponse>(
    "/api/v1/ai/chat/image",
    formData,
    {
      headers: { "Content-Type": "multipart/form-data" },
      timeout: 90_000,
    },
  );
  return response.data;
};

export const getAiConversations = async (): Promise<AiConversationSummary[]> => {
  const response = await axiosPrivate.get<AiConversationSummary[]>(
    "/api/v1/ai/conversations",
  );
  return response.data;
};

export const getAiConversation = async (
  sessionId: string,
): Promise<AiConversationDetail> => {
  const response = await axiosPrivate.get<AiConversationDetail>(
    `/api/v1/ai/conversations/${encodeURIComponent(sessionId)}`,
  );
  return response.data;
};

export const deleteAiConversation = async (sessionId: string): Promise<void> => {
  await axiosPrivate.delete(
    `/api/v1/ai/conversations/${encodeURIComponent(sessionId)}`,
  );
};
