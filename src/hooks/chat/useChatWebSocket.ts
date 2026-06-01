import { getChatWebSocketUrl } from "@/src/services/chat/chat";
import { CHAT_QUERY_KEYS } from "@/src/hooks/chat/useChat";
import { useActiveChatRoomStore } from "@/src/stores/chat/useActiveChatRoomStore";
import { ChatMessage, ChatRoomsResponse } from "@/src/types/models/chat/Chat";
import { useQueryClient } from "@tanstack/react-query";
import { useEffect, useRef } from "react";

const updateChatRoomPreview = (
  current: ChatRoomsResponse | undefined,
  message: ChatMessage,
  activeRoomId: number | null,
) => {
  if (!current) {
    return current;
  }

  const targetRoom = current.chatRooms.find(
    (room) => room.id === message.chatRoomId,
  );
  if (!targetRoom) {
    return current;
  }

  const nextRoom = {
    ...targetRoom,
    lastMessage: message.content,
    lastMessageAt: message.createdAt,
    unreadCount:
      message.chatRoomId === activeRoomId
        ? 0
        : message.senderId === targetRoom.opponentId
        ? targetRoom.unreadCount + 1
        : targetRoom.unreadCount,
  };

  return {
    chatRooms: [
      nextRoom,
      ...current.chatRooms.filter((room) => room.id !== message.chatRoomId),
    ],
  };
};

export const useChatWebSocket = (roomId?: number | null) => {
  const queryClient = useQueryClient();
  const activeRoomId = useActiveChatRoomStore((state) => state.activeRoomId);
  const activeRoomIdRef = useRef(activeRoomId);

  // activeRoomId가 바뀔 때마다 ref를 동기화 — 소켓은 재연결하지 않음
  useEffect(() => {
    activeRoomIdRef.current = activeRoomId;
  }, [activeRoomId]);

  useEffect(() => {
    if (roomId === null) {
      return;
    }

    let socket: WebSocket | null = null;
    let isClosed = false;
    let reconnectTimer: ReturnType<typeof setTimeout> | null = null;

    const connect = async () => {
      try {
        const url = await getChatWebSocketUrl(roomId);
        if (!url || isClosed) {
          return;
        }

        socket = new WebSocket(url);
        socket.onopen = () => {
          queryClient.invalidateQueries({ queryKey: CHAT_QUERY_KEYS.rooms });
        };
        socket.onmessage = (event) => {
          let message: ChatMessage;
          try {
            message = JSON.parse(event.data) as ChatMessage;
          } catch {
            return;
          }

          const currentActiveRoomId = activeRoomIdRef.current;
          queryClient.setQueryData<ChatRoomsResponse>(
            CHAT_QUERY_KEYS.rooms,
            (current) => updateChatRoomPreview(current, message, currentActiveRoomId),
          );
          // 현재 보고 있지 않은 방의 메시지만 알림 카운트에 영향을 줌
          if (message.chatRoomId !== currentActiveRoomId) {
            queryClient.invalidateQueries({ queryKey: ["notifications"] });
          }

          if (!roomId || message.chatRoomId !== roomId) {
            queryClient.invalidateQueries({ queryKey: CHAT_QUERY_KEYS.rooms });
            return;
          }

          queryClient.setQueryData<{ messages: ChatMessage[] }>(
            CHAT_QUERY_KEYS.messages(roomId, 0),
            (current) => {
              const messages = current?.messages ?? [];
              if (messages.some((item) => item.id === message.id)) {
                return current;
              }
              return { messages: [...messages, message] };
            },
          );
          queryClient.invalidateQueries({ queryKey: CHAT_QUERY_KEYS.rooms });
        };
        socket.onerror = () => {
          if (roomId) {
            queryClient.invalidateQueries({
              queryKey: CHAT_QUERY_KEYS.messages(roomId, 0),
            });
          }
          queryClient.invalidateQueries({ queryKey: CHAT_QUERY_KEYS.rooms });
        };
        socket.onclose = () => {
          if (isClosed) {
            return;
          }
          if (roomId) {
            queryClient.invalidateQueries({
              queryKey: CHAT_QUERY_KEYS.messages(roomId, 0),
            });
          }
          queryClient.invalidateQueries({ queryKey: CHAT_QUERY_KEYS.rooms });
          reconnectTimer = setTimeout(connect, 1500);
        };
      } catch {
        if (!isClosed) {
          reconnectTimer = setTimeout(connect, 1500);
        }
      }
    };

    connect();

    return () => {
      isClosed = true;
      if (reconnectTimer) {
        clearTimeout(reconnectTimer);
      }
      socket?.close();
    };
  }, [queryClient, roomId]);
};
