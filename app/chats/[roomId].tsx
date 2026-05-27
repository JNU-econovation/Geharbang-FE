import { Ionicons } from "@expo/vector-icons";
import { router, useLocalSearchParams } from "expo-router";
import React, { useEffect, useRef, useState } from "react";
import {
  ActivityIndicator,
  Keyboard,
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
import {
  useChatRooms,
  useChatMessages,
  useMarkChatRoomAsRead,
  useSendChatMessage,
} from "@/src/hooks/chat/useChat";
import { useChatWebSocket } from "@/src/hooks/chat/useChatWebSocket";
import { useAuthStore } from "@/src/stores/auth/useAuthStore";
import { ChatMessage } from "@/src/types/models/chat/Chat";
import { COLORS } from "@/src/utils/constants/colors";
import { TOKEN_KEYS } from "@/src/utils/constants/TokenKeys";
import { getAccessToken } from "@/src/utils/login/secureStore";

const formatTime = (value: string) => {
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return "";
  return date.toLocaleTimeString("ko-KR", {
    hour: "2-digit",
    minute: "2-digit",
  });
};

function MessageBubble({
  message,
  isMine,
  opponentName,
  opponentImageUrl,
}: {
  message: ChatMessage;
  isMine: boolean;
  opponentName?: string | null;
  opponentImageUrl?: string | null;
}) {
  if (isMine) {
    return (
      <View className='px-4 py-1.5 items-end'>
        <View className='flex-row items-end justify-end gap-2 max-w-[88%]'>
          <TextSize
            size={11}
            color='#6A7282'
            content={formatTime(message.createdAt)}
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
            content={formatTime(message.createdAt)}
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
  const [keyboardHeight, setKeyboardHeight] = useState(0);
  const [inputBarHeight, setInputBarHeight] = useState(80);
  const scrollRef = useRef<ScrollView>(null);

  const { data, isLoading } = useChatMessages(parsedRoomId);
  const { data: roomsData } = useChatRooms();
  const { mutate: sendMessage, isPending } = useSendChatMessage(parsedRoomId);
  const { mutate: markAsRead } = useMarkChatRoomAsRead();

  useChatWebSocket(isLogined ? parsedRoomId : null);

  const messages = data?.messages ?? [];
  const currentRoom = roomsData?.chatRooms.find(
    (room) => room.id === parsedRoomId,
  );
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
    requestAnimationFrame(() => {
      scrollRef.current?.scrollToEnd({ animated: true });
    });
  }, [messages.length]);

  useEffect(() => {
    if (Platform.OS !== "android") {
      return;
    }

    const showSubscription = Keyboard.addListener("keyboardDidShow", (event) => {
      setKeyboardHeight(event.endCoordinates.height);
      requestAnimationFrame(() => {
        scrollRef.current?.scrollToEnd({ animated: true });
      });
    });
    const hideSubscription = Keyboard.addListener("keyboardDidHide", () => {
      setKeyboardHeight(0);
    });

    return () => {
      showSubscription.remove();
      hideSubscription.remove();
    };
  }, []);

  const handleInputBarLayout = (event: LayoutChangeEvent) => {
    setInputBarHeight(event.nativeEvent.layout.height);
  };

  const handleSend = () => {
    const trimmedContent = content.trim();
    if (!trimmedContent || isPending) {
      return;
    }

    sendMessage(trimmedContent);
    setContent("");
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
                paddingBottom: inputBarHeight + keyboardHeight + 16,
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
                messages.map((message) => (
                  <MessageBubble
                    key={message.id}
                    message={message}
                    isMine={userId === message.senderId}
                    opponentName={currentRoom?.opponentName}
                    opponentImageUrl={currentRoom?.opponentImageUrl}
                  />
                ))
              )}
            </ScrollView>
          )}

          <View
            className='absolute left-0 right-0 px-3 py-3 bg-white border-t border-[#E5E7EB]'
            style={{ bottom: Platform.OS === "android" ? keyboardHeight : 0 }}
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
