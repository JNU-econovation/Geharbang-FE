import { Ionicons } from "@expo/vector-icons";
import { router, useLocalSearchParams } from "expo-router";
import React, { useEffect, useRef, useState } from "react";
import {
  ActivityIndicator,
  KeyboardAvoidingView,
  LayoutChangeEvent,
  Platform,
  Pressable,
  ScrollView,
  TextInput,
  View,
} from "react-native";

import CustomSafeAreaView from "@/src/components/layout/CustomSafeAreaView";
import Flex from "@/src/components/layout/Flex";
import BackArrorHeader from "@/src/components/ui/BackArrowHeader";
import CachedImage from "@/src/components/ui/CachedImage";
import TextSize from "@/src/components/ui/TextSize";
import { buildAssetUrl } from "@/src/config/url";
import {
  useChatRooms,
  useChatMessages,
  useMarkChatRoomAsRead,
  useSendChatMessage,
} from "@/src/hooks/chat/useChat";
import { useChatWebSocket } from "@/src/hooks/chat/useChatWebSocket";
import { useAuthStore } from "@/src/stores/auth/useAuthStore";
import { useActiveChatRoomStore } from "@/src/stores/chat/useActiveChatRoomStore";
import { ChatMessage } from "@/src/types/models/chat/Chat";
import { COLORS } from "@/src/utils/constants/colors";
import { TOKEN_KEYS } from "@/src/utils/constants/TokenKeys";
import { getAccessToken } from "@/src/utils/login/secureStore";

const formatTime = (value?: string | null, showDate = false) => {
  if (!value) return "";

  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return "";

  const time = date.toLocaleTimeString("ko-KR", {
    hour: "2-digit",
    minute: "2-digit",
  });

  if (!showDate) return time;

  const dateLabel = date.toLocaleDateString("ko-KR", {
    month: "numeric",
    day: "numeric",
  });

  return `${dateLabel} ${time}`;
};

const isSameDate = (left: Date, right: Date) =>
  left.getFullYear() === right.getFullYear() &&
  left.getMonth() === right.getMonth() &&
  left.getDate() === right.getDate();

const getDateKey = (value?: string | null) => {
  if (!value) return "";

  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return "";
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
};

const formatDateLabel = (value?: string | null) => {
  if (!value) return "";

  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return "";

  const today = new Date();
  const yesterday = new Date(today);
  yesterday.setDate(today.getDate() - 1);

  if (isSameDate(date, today)) return "오늘";
  if (isSameDate(date, yesterday)) return "어제";

  return date.toLocaleDateString("ko-KR", {
    year: "numeric",
    month: "long",
    day: "numeric",
    weekday: "short",
  });
};

function DateSeparator({ createdAt }: { createdAt: string }) {
  const label = formatDateLabel(createdAt);
  if (!label) return null;

  return (
    <View className='flex-row items-center px-4 py-4 gap-3'>
      <View className='flex-1 h-[1px] bg-[#D1D5DB]' />
      <View className='px-3 py-1.5 rounded-full bg-[#374151]'>
        <TextSize size={12} color='#FFFFFF' content={label} />
      </View>
      <View className='flex-1 h-[1px] bg-[#D1D5DB]' />
    </View>
  );
}

function MessageBubble({
  message,
  isMine,
  opponentName,
  opponentImageUrl,
  showDateInTime,
}: {
  message: ChatMessage;
  isMine: boolean;
  opponentName?: string | null;
  opponentImageUrl?: string | null;
  showDateInTime: boolean;
}) {
  if (isMine) {
    return (
      <View className='px-4 py-1.5 items-end'>
        <View className='flex-row items-end justify-end gap-2 max-w-[88%]'>
          <TextSize
            size={11}
            color='#6A7282'
            content={formatTime(message.createdAt, showDateInTime)}
          />
          <View className='max-w-[82%] px-4 py-3 rounded-2xl rounded-br-md bg-[#0EA5E9]'>
            <TextSize size={15} color='#FFFFFF' content={message.content} />
          </View>
        </View>
      </View>
    );
  }

  return (
    <View className='px-4 py-1.5 items-start'>
      <View className='flex-row items-start gap-2 max-w-[88%]'>
        {opponentImageUrl ? (
          <CachedImage
            uri={opponentImageUrl}
            className='w-9 h-9 rounded-full'
          />
        ) : (
          <View className='w-9 h-9 rounded-full bg-[#DDEBFF] items-center justify-center'>
            <Ionicons name='person' size={18} color={COLORS.PRIMARY.BLUE} />
          </View>
        )}
        <View className='max-w-[82%]'>
          <TextSize
            size={12}
            color='#4B5563'
            content={opponentName ?? "상대방"}
          />
          <View className='pt-1' />
          <View className='px-4 py-3 rounded-2xl rounded-bl-md bg-white border border-[#E5E7EB]'>
            <TextSize size={15} color='#101828' content={message.content} />
          </View>
          <View className='pt-1' />
          <TextSize
            size={11}
            color='#6A7282'
            content={formatTime(message.createdAt, showDateInTime)}
          />
        </View>
      </View>
    </View>
  );
}

export default function ChatRoomScreen() {
  const { roomId, title } = useLocalSearchParams<{
    roomId: string;
    title?: string;
  }>();
  const isLogined = useAuthStore((state) => Boolean(state.accessToken));
  const isAuthReady = useAuthStore((state) => state.isAuthReady);
  const parsedRoomId = Number(roomId);
  const [content, setContent] = useState("");
  const [userId, setUserId] = useState<number | null>(null);
  const [inputBarHeight, setInputBarHeight] = useState(80);
  const scrollRef = useRef<ScrollView>(null);

  const { data, isLoading } = useChatMessages(parsedRoomId);
  const { data: roomsData } = useChatRooms();
  const { mutate: sendMessage, isPending } = useSendChatMessage(parsedRoomId);
  const { mutate: markAsRead } = useMarkChatRoomAsRead();
  const setActiveRoomId = useActiveChatRoomStore(
    (state) => state.setActiveRoomId,
  );

  useChatWebSocket(isLogined ? parsedRoomId : null);

  const messages = data?.messages ?? [];
  const currentRoom = roomsData?.chatRooms.find(
    (room) => room.id === parsedRoomId,
  );
  const opponentImageUri = buildAssetUrl(currentRoom?.opponentImageUrl);
  const roomTitle =
    title ??
    currentRoom?.opponentName ??
    "채팅";

  useEffect(() => {
    getAccessToken(TOKEN_KEYS.USER_ID).then((value) => {
      setUserId(value ? Number(value) : null);
    });
  }, []);

  useEffect(() => {
    if (isAuthReady && !isLogined) {
      router.replace("/login" as any);
    }
  }, [isAuthReady, isLogined]);

  useEffect(() => {
    if (isLogined && parsedRoomId) {
      markAsRead(parsedRoomId);
    }
  }, [isLogined, markAsRead, parsedRoomId]);

  useEffect(() => {
    if (!Number.isFinite(parsedRoomId) || parsedRoomId <= 0) {
      return;
    }

    setActiveRoomId(parsedRoomId);
    return () => {
      setActiveRoomId(null);
    };
  }, [parsedRoomId, setActiveRoomId]);

  useEffect(() => {
    requestAnimationFrame(() => {
      scrollRef.current?.scrollToEnd({ animated: true });
    });
  }, [messages.length]);

  const handleInputBarLayout = (event: LayoutChangeEvent) => {
    setInputBarHeight(event.nativeEvent.layout.height);
  };

  const handleSend = () => {
    const trimmedContent = content.trim();
    if (!trimmedContent || isPending) {
      return;
    }

    sendMessage(trimmedContent, {
      onSuccess: () => {
        setContent((currentContent) =>
          currentContent.trim() === trimmedContent ? "" : currentContent,
        );
      },
    });
  };

  return (
    <CustomSafeAreaView pageColor='bg-[#F9FAFB]'>
      <KeyboardAvoidingView
        className='flex-1'
        behavior={Platform.OS === "ios" ? "padding" : undefined}
        keyboardVerticalOffset={0}
      >
        <View className='flex-1'>
          <View className='px-3 pt-3 pb-4 border-b border-[#E5E5E5] bg-white'>
            <BackArrorHeader content={roomTitle} />
          </View>

          {isLoading ? (
            <View className='flex-1 items-center justify-center'>
              <ActivityIndicator size={64} color={COLORS.PRIMARY.BLUE} />
            </View>
          ) : (
            <ScrollView
              ref={scrollRef}
              className='flex-1 py-3'
              contentContainerStyle={{
                flexGrow: 1,
                paddingBottom: inputBarHeight + 16,
              }}
              keyboardShouldPersistTaps='handled'
              onContentSizeChange={() => {
                scrollRef.current?.scrollToEnd({ animated: true });
              }}
            >
              {messages.length === 0 ? (
                <View className='h-64 items-center justify-center'>
                  <TextSize
                    size={15}
                    color={COLORS.GRAY.TEXT}
                    content='첫 메시지를 보내보세요'
                  />
                </View>
              ) : (
                messages.map((message, index) => {
                  const previousMessage = messages[index - 1];
                  const messageDateKey = getDateKey(message.createdAt);
                  const shouldShowDate =
                    !previousMessage ||
                    getDateKey(previousMessage.createdAt) !== messageDateKey;
                  const showDateInTime =
                    messageDateKey !== getDateKey(new Date().toISOString());

                  return (
                    <React.Fragment key={message.id}>
                      {shouldShowDate && (
                        <DateSeparator createdAt={message.createdAt} />
                      )}
                      <MessageBubble
                        message={message}
                        isMine={userId === message.senderId}
                        opponentName={currentRoom?.opponentName}
                        opponentImageUrl={opponentImageUri}
                        showDateInTime={showDateInTime}
                      />
                    </React.Fragment>
                  );
                })
              )}
            </ScrollView>
          )}

          <View
            className='absolute left-0 right-0 px-3 py-3 bg-white border-t border-[#E5E7EB]'
            style={{ bottom: 0 }}
            onLayout={handleInputBarLayout}
          >
            <Flex dir='row' items='center' justify='between' gap={8}>
              <TextInput
                className='flex-1 min-h-11 max-h-28 px-4 py-3 rounded-full bg-[#F3F4F6] text-[15px] text-[#101828]'
                placeholder='메시지를 입력하세요'
                placeholderTextColor='#9CA3AF'
                value={content}
                onChangeText={setContent}
                onFocus={() => {
                  setTimeout(() => {
                    scrollRef.current?.scrollToEnd({ animated: true });
                  }, 80);
                }}
                multiline
                textAlignVertical='top'
              />
              <Pressable
                className={`w-11 h-11 rounded-full items-center justify-center ${
                  content.trim() ? "bg-[#0EA5E9]" : "bg-[#D1D5DB]"
                }`}
                onPress={handleSend}
                disabled={!content.trim() || isPending}
              >
                <Ionicons name='send' size={19} color='#FFFFFF' />
              </Pressable>
            </Flex>
          </View>
        </View>
      </KeyboardAvoidingView>
    </CustomSafeAreaView>
  );
}
