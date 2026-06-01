import {
  createChatRoom,
  getChatMessages,
  getChatRooms,
  markChatRoomAsRead,
  sendChatMessage,
} from "@/src/services/chat/chat";
import { useAuthStore } from "@/src/stores/auth/useAuthStore";
import { ChatMessage } from "@/src/types/models/chat/Chat";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

export const CHAT_QUERY_KEYS = {
  rooms: ["chats", "rooms"] as const,
  messages: (roomId: number, pageNumber = 0) =>
    ["chats", "rooms", roomId, "messages", pageNumber] as const,
};

export const useChatRooms = () => {
  const isLogined = useAuthStore((state) => Boolean(state.accessToken));

  return useQuery({
    queryKey: CHAT_QUERY_KEYS.rooms,
    queryFn: getChatRooms,
    enabled: isLogined,
  });
};

export const useChatMessages = (roomId: number, pageNumber = 0) => {
  const isLogined = useAuthStore((state) => Boolean(state.accessToken));

  return useQuery({
    queryKey: CHAT_QUERY_KEYS.messages(roomId, pageNumber),
    queryFn: () => getChatMessages(roomId, pageNumber),
    enabled: isLogined && Number.isFinite(roomId) && roomId > 0,
  });
};

export const useCreateChatRoom = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createChatRoom,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: CHAT_QUERY_KEYS.rooms });
    },
  });
};

export const useSendChatMessage = (roomId: number) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (content: string) => sendChatMessage({ roomId, content }),
    onSuccess: (message: ChatMessage) => {
      queryClient.setQueryData<{ messages: ChatMessage[] }>(
        CHAT_QUERY_KEYS.messages(roomId, 0),
        (current) => {
          if (!current) {
            return { messages: [message] };
          }
          if (current.messages.some((item) => item.id === message.id)) {
            return current;
          }
          return { messages: [...current.messages, message] };
        },
      );
      queryClient.invalidateQueries({ queryKey: CHAT_QUERY_KEYS.rooms });
    },
  });
};

export const useMarkChatRoomAsRead = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: markChatRoomAsRead,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: CHAT_QUERY_KEYS.rooms });
      queryClient.invalidateQueries({ queryKey: ["notifications"] });
    },
  });
};
