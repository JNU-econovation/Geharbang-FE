import { Ionicons } from "@expo/vector-icons";
import { useLocalSearchParams } from "expo-router";
import React, { useEffect, useRef, useState } from "react";
import {
  ActivityIndicator,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  ScrollView,
  TextInput,
  View,
} from "react-native";

import CustomSafeAreaView from "@/src/components/layout/CustomSafeAreaView";
import Flex from "@/src/components/layout/Flex";
import BackArrorHeader from "@/src/components/ui/BackArrowHeader";
import TextSize from "@/src/components/ui/TextSize";
import {
  useChatMessages,
  useMarkChatRoomAsRead,
  useSendChatMessage,
} from "@/src/hooks/chat/useChat";
import { useChatWebSocket } from "@/src/hooks/chat/useChatWebSocket";
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
}: {
  message: ChatMessage;
  isMine: boolean;
}) {
  return (
    <View className={`px-4 py-1 ${isMine ? "items-end" : "items-start"}`}>
      <View
        className={`max-w-[78%] px-4 py-3 rounded-2xl ${
          isMine ? "bg-[#0EA5E9]" : "bg-white border border-[#E5E7EB]"
        }`}
      >
        <TextSize
          size={15}
          color={isMine ? "#FFFFFF" : "#101828"}
          content={message.content}
        />
      </View>
      <View className='pt-1' />
      <TextSize size={11} color='#6A7282' content={formatTime(message.createdAt)} />
    </View>
  );
}

export default function ChatRoomScreen() {
  const { roomId, title } = useLocalSearchParams<{
    roomId: string;
    title?: string;
  }>();
  const parsedRoomId = Number(roomId);
  const [content, setContent] = useState("");
  const [userId, setUserId] = useState<number | null>(null);
  const scrollRef = useRef<ScrollView>(null);

  const { data, isLoading } = useChatMessages(parsedRoomId);
  const { mutate: sendMessage, isPending } = useSendChatMessage(parsedRoomId);
  const { mutate: markAsRead } = useMarkChatRoomAsRead();

  useChatWebSocket(parsedRoomId);

  const messages = data?.messages ?? [];

  useEffect(() => {
    getAccessToken(TOKEN_KEYS.USER_ID).then((value) => {
      setUserId(value ? Number(value) : null);
    });
  }, []);

  useEffect(() => {
    if (parsedRoomId) {
      markAsRead(parsedRoomId);
    }
  }, [markAsRead, parsedRoomId]);

  useEffect(() => {
    requestAnimationFrame(() => {
      scrollRef.current?.scrollToEnd({ animated: true });
    });
  }, [messages.length]);

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
      >
        <View className='px-3 pt-3 pb-4 border-b border-[#E5E5E5] bg-white'>
          <BackArrorHeader content={title ?? "채팅"} />
        </View>

        {isLoading ? (
          <View className='flex-1 items-center justify-center'>
            <ActivityIndicator size={64} color={COLORS.PRIMARY.BLUE} />
          </View>
        ) : (
          <ScrollView
            ref={scrollRef}
            className='flex-1 py-3'
            keyboardShouldPersistTaps='handled'
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
                />
              ))
            )}
          </ScrollView>
        )}

        <View className='px-3 py-3 bg-white border-t border-[#E5E7EB]'>
          <Flex dir='row' items='center' justify='between' gap={8}>
            <TextInput
              className='flex-1 min-h-11 max-h-28 px-4 py-3 rounded-full bg-[#F3F4F6] text-[15px] text-[#101828]'
              placeholder='메시지를 입력하세요'
              placeholderTextColor='#9CA3AF'
              value={content}
              onChangeText={setContent}
              multiline
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
      </KeyboardAvoidingView>
    </CustomSafeAreaView>
  );
}
