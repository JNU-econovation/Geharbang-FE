import { API_BASE_URL } from "@/src/config/url";
import { axiosPrivate } from "@/src/services/api/customAxios";
import {
  ChatMessage,
  ChatMessagesResponse,
  ChatRoomCreateResponse,
  ChatRoomsResponse,
} from "@/src/types/models/chat/Chat";
import { TOKEN_KEYS } from "@/src/utils/constants/TokenKeys";
import { getAccessToken } from "@/src/utils/login/secureStore";

export const createChatRoom = async (
  applicationRecordId: number,
): Promise<ChatRoomCreateResponse> => {
  const response = await axiosPrivate.post<ChatRoomCreateResponse>(
    "/api/v1/chats/rooms",
    { applicationRecordId },
  );
  return response.data;
};

export const getChatRooms = async (): Promise<ChatRoomsResponse> => {
  const response = await axiosPrivate.get<ChatRoomsResponse>(
    "/api/v1/chats/rooms",
  );
  return response.data;
};

export const getChatMessages = async (
  roomId: number,
  pageNumber = 0,
): Promise<ChatMessagesResponse> => {
  const response = await axiosPrivate.get<ChatMessagesResponse>(
    `/api/v1/chats/rooms/${roomId}/messages`,
    {
      params: {
        pageNumber,
      },
    },
  );
  return {
    messages: [...response.data.messages].reverse(),
  };
};

export const sendChatMessage = async ({
  roomId,
  content,
}: {
  roomId: number;
  content: string;
}): Promise<ChatMessage> => {
  const response = await axiosPrivate.post<ChatMessage>(
    `/api/v1/chats/rooms/${roomId}/messages`,
    { content },
  );
  return response.data;
};

export const markChatRoomAsRead = async (roomId: number): Promise<void> => {
  await axiosPrivate.patch(`/api/v1/chats/rooms/${roomId}/read`);
};

export const getChatWebSocketUrl = async () => {
  const token = await getAccessToken(TOKEN_KEYS.ACCESS_TOKEN);
  if (!token) {
    return null;
  }

  const wsBaseUrl = API_BASE_URL.replace(/^https/, "wss").replace(
    /^http/,
    "ws",
  );
  return `${wsBaseUrl}/ws/chats?token=${encodeURIComponent(token)}`;
};
