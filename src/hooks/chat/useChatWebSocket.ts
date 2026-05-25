import { getChatWebSocketUrl } from "@/src/services/chat/chat";
import { CHAT_QUERY_KEYS } from "@/src/hooks/chat/useChat";
import { ChatMessage } from "@/src/types/models/chat/Chat";
import { useQueryClient } from "@tanstack/react-query";
import { useEffect } from "react";

export const useChatWebSocket = (roomId: number) => {
  const queryClient = useQueryClient();

  useEffect(() => {
    let socket: WebSocket | null = null;
    let isClosed = false;

    const connect = async () => {
      const url = await getChatWebSocketUrl(roomId);
      if (!url || isClosed) {
        return;
      }

      socket = new WebSocket(url);
      socket.onmessage = (event) => {
        const message = JSON.parse(event.data) as ChatMessage;
        if (message.chatRoomId !== roomId) {
          queryClient.invalidateQueries({ queryKey: CHAT_QUERY_KEYS.rooms });
          return;
        }

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
      };
    };

    connect();

    return () => {
      isClosed = true;
      socket?.close();
    };
  }, [queryClient, roomId]);
};
