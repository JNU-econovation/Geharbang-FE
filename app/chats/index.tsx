import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import React from "react";
import { ActivityIndicator, Pressable, ScrollView, View } from "react-native";

import CustomSafeAreaView from "@/src/components/layout/CustomSafeAreaView";
import Flex from "@/src/components/layout/Flex";
import BackArrorHeader from "@/src/components/ui/BackArrowHeader";
import Button from "@/src/components/ui/Button/Button";
import CachedImage from "@/src/components/ui/CachedImage";
import TextSize from "@/src/components/ui/TextSize";
import { buildAssetUrl } from "@/src/config/url";
import { useChatRooms } from "@/src/hooks/chat/useChat";
import { useChatWebSocket } from "@/src/hooks/chat/useChatWebSocket";
import { useAuthStore } from "@/src/stores/auth/useAuthStore";
import { ChatRoom } from "@/src/types/models/chat/Chat";
import { COLORS } from "@/src/utils/constants/colors";

const formatDate = (value: string | null) => {
  if (!value) return "";
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return "";
  return date.toLocaleDateString("ko-KR", {
    month: "short",
    day: "numeric",
  });
};

function ChatRoomCard({ room }: { room: ChatRoom }) {
  const imageUri = buildAssetUrl(room.opponentImageUrl);

  return (
    <Pressable
      onPress={() =>
        router.push({
          pathname: "/chats/[roomId]",
          params: {
            roomId: String(room.id),
            title: room.opponentName ?? "채팅",
          },
        })
      }
    >
      <View className='px-4 py-4 bg-white border-b border-[#F3F4F6]'>
        <Flex dir='row' items='center' justify='between' gap={12}>
          {imageUri ? (
            <CachedImage uri={imageUri} className='w-12 h-12 rounded-full' />
          ) : (
            <View className='w-12 h-12 rounded-full bg-[#E5E7EB] items-center justify-center'>
              <Ionicons name='person-outline' size={22} color='#6A7282' />
            </View>
          )}

          <View className='flex-1 gap-1'>
            <Flex dir='row' items='center' justify='between'>
              <TextSize
                size={16}
                color='#101828'
                content={room.opponentName ?? "이름 없음"}
              />
              <TextSize
                size={12}
                color='#6A7282'
                content={formatDate(room.lastMessageAt)}
              />
            </Flex>
            <TextSize
              size={13}
              color='#6A7282'
              content={room.staffRecruitmentTitle}
            />
            <Flex dir='row' items='center' justify='between'>
              <TextSize
                size={14}
                color='#4A5565'
                content={room.lastMessage ?? "아직 메시지가 없어요"}
              />
              {room.unreadCount > 0 && (
                <View className='min-w-5 h-5 px-1 rounded-full bg-[#E7000B] items-center justify-center'>
                  <TextSize
                    size={10}
                    color='#FFFFFF'
                    content={room.unreadCount > 99 ? "99+" : String(room.unreadCount)}
                  />
                </View>
              )}
            </Flex>
          </View>
        </Flex>
      </View>
    </Pressable>
  );
}

export default function ChatRoomsScreen() {
  const isLogined = useAuthStore((state) => Boolean(state.accessToken));
  const { data, isLoading, isError, refetch } = useChatRooms();
  const rooms = data?.chatRooms ?? [];

  useChatWebSocket(isLogined ? undefined : null);

  return (
    <CustomSafeAreaView pageColor='bg-[#F9FAFB]'>
      <View className='px-3 pt-3 pb-4 border-b border-[#E5E5E5] bg-white'>
        <BackArrorHeader content='채팅' />
      </View>

      {!isLogined ? (
        <View className='flex-1 items-center justify-center px-6'>
          <Ionicons
            name='chatbubble-ellipses-outline'
            size={44}
            color={COLORS.GRAY.TEXT}
          />
          <View className='pt-4' />
          <TextSize
            size={16}
            color={COLORS.GRAY.TEXT}
            content='로그인 후 채팅을 확인할 수 있어요'
            align='center'
          />
          <View className='pt-5' />
          <Button
            variant='primary'
            height={44}
            width={180}
            content='로그인하기'
            textColor='#FFFFFF'
            onPress={() => router.push("/login" as any)}
          />
        </View>
      ) : isLoading ? (
        <View className='h-64 items-center justify-center'>
          <ActivityIndicator size={64} color={COLORS.PRIMARY.BLUE} />
        </View>
      ) : isError ? (
        <View className='py-8 items-center'>
          <TextSize
            size={18}
            color={COLORS.GRAY.TEXT}
            content='채팅 목록을 불러오지 못했어요'
          />
          <View className='pt-4' />
          <Button
            variant='gray'
            height={52}
            width={240}
            content='다시 시도'
            textColor='#000000'
            onPress={() => refetch()}
          />
        </View>
      ) : rooms.length === 0 ? (
        <View className='flex-1 items-center justify-center px-6'>
          <Ionicons
            name='chatbubble-ellipses-outline'
            size={44}
            color={COLORS.GRAY.TEXT}
          />
          <View className='pt-4' />
          <TextSize
            size={16}
            color={COLORS.GRAY.TEXT}
            content='아직 채팅방이 없어요'
          />
        </View>
      ) : (
        <ScrollView className='bg-white'>
          {rooms.map((room) => (
            <ChatRoomCard key={room.id} room={room} />
          ))}
        </ScrollView>
      )}
    </CustomSafeAreaView>
  );
}
