import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import React from "react";
import { ActivityIndicator, Pressable, ScrollView, View } from "react-native";

import CustomSafeAreaView from "@/src/components/layout/CustomSafeAreaView";
import Flex from "@/src/components/layout/Flex";
import BackArrow from "@/src/components/ui/BackArrow";
import Button from "@/src/components/ui/Button/Button";
import TextSize from "@/src/components/ui/TextSize";
import {
  useMarkAllNotificationsAsRead,
  useMarkNotificationAsRead,
  useNotifications,
} from "@/src/hooks/notification/useNotifications";
import {
  NotificationItem,
  NotificationType,
} from "@/src/types/models/notification/Notification";
import { useAuthStore } from "@/src/stores/auth/useAuthStore";
import { COLORS } from "@/src/utils/constants/colors";

const notificationIconMap: Record<
  NotificationType,
  React.ComponentProps<typeof Ionicons>["name"]
> = {
  CERTIFICATE_APPROVED: "shield-checkmark-outline",
  CERTIFICATE_REJECTED: "alert-circle-outline",
  STAFF_APPLICATION_CREATED: "document-text-outline",
  APPLICATION_ACCEPTED: "checkmark-circle-outline",
};

const getRelativeDate = (value: string) => {
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) {
    return "";
  }

  const diffMinutes = Math.floor((Date.now() - date.getTime()) / 60000);
  if (diffMinutes < 1) return "방금 전";
  if (diffMinutes < 60) return `${diffMinutes}분 전`;

  const diffHours = Math.floor(diffMinutes / 60);
  if (diffHours < 24) return `${diffHours}시간 전`;

  const diffDays = Math.floor(diffHours / 24);
  if (diffDays < 7) return `${diffDays}일 전`;

  return date.toLocaleDateString("ko-KR", {
    month: "long",
    day: "numeric",
  });
};

const navigateByNotification = (notification: NotificationItem) => {
  if (notification.type === "APPLICATION_ACCEPTED") {
    router.push("/my/application/status" as any);
    return;
  }

  if (notification.type === "STAFF_APPLICATION_CREATED") {
    router.push("/my/stepRecruitment" as any);
    return;
  }

  if (notification.targetType === "STAFF_RECRUITMENT" && notification.targetId) {
    router.push(`/step/stepDetail/${notification.targetId}` as any);
    return;
  }

  if (notification.targetType === "CERTIFICATE") {
    router.push("/operator/verify" as any);
    return;
  }

  router.push("/profile" as any);
};

interface NotificationCardProps {
  notification: NotificationItem;
  onPress: (notification: NotificationItem) => void;
}

function NotificationCard({ notification, onPress }: NotificationCardProps) {
  const iconName = notificationIconMap[notification.type];
  const isUnread = !notification.isRead;

  return (
    <Pressable onPress={() => onPress(notification)}>
      <View
        className={`mx-4 mt-3 p-4 rounded-lg border ${
          isUnread
            ? "bg-[#F0F9FF] border-[#BAE6FD]"
            : "bg-white border-[#E5E7EB]"
        }`}
      >
        <Flex dir='row' items='start' justify='between' gap={12}>
          <View
            className={`w-10 h-10 rounded-full items-center justify-center ${
              isUnread ? "bg-[#E0F2FE]" : "bg-[#F3F4F6]"
            }`}
          >
            <Ionicons
              name={iconName}
              size={20}
              color={isUnread ? COLORS.PRIMARY.BLUE : COLORS.GRAY.TEXT}
            />
          </View>

          <View className='flex-1 gap-2'>
            <Flex dir='row' items='center' justify='between'>
              <TextSize
                size={16}
                color='#101828'
                content={notification.title}
                weight={isUnread ? "700" : "500"}
              />
              {isUnread && (
                <View className='w-2 h-2 rounded-full bg-[#0EA5E9]' />
              )}
            </Flex>
            <TextSize
              size={14}
              color='#4A5565'
              content={notification.content}
            />
            <TextSize
              size={12}
              color='#6A7282'
              content={getRelativeDate(notification.createdAt)}
            />
          </View>
        </Flex>
      </View>
    </Pressable>
  );
}

export default function NotificationsScreen() {
  const isLogined = useAuthStore((state) => Boolean(state.accessToken));
  const { data, isLoading, isError, refetch } = useNotifications();
  const { mutateAsync: markAsRead } = useMarkNotificationAsRead();
  const { mutate: markAllAsRead, isPending: isMarkingAll } =
    useMarkAllNotificationsAsRead();

  const notifications = data?.notifications ?? [];
  const hasUnread = notifications.some((notification) => !notification.isRead);

  const handleNotificationPress = async (notification: NotificationItem) => {
    if (!notification.isRead) {
      await markAsRead(notification.id);
    }
    navigateByNotification(notification);
  };

  return (
    <CustomSafeAreaView pageColor='bg-[#F9FAFB]'>
      <View className='px-3 pt-3 pb-4 border-b-[1px] border-[#E5E5E5] bg-white'>
        <Flex dir='row' items='center' justify='between'>
          <BackArrow size={24} color='#000000' />
          <TextSize size={20} color='#101828' content='알림' />
          {hasUnread ? (
            <Pressable onPress={() => markAllAsRead()} disabled={isMarkingAll}>
              <TextSize
                size={14}
                color={COLORS.PRIMARY.BLUE}
                content='모두 읽음'
              />
            </Pressable>
          ) : (
            <View className='w-16' />
          )}
        </Flex>
      </View>

      {!isLogined ? (
        <View className='flex-1 items-center justify-center px-6'>
          <Ionicons
            name='notifications-outline'
            size={42}
            color={COLORS.GRAY.TEXT}
          />
          <View className='pt-4' />
          <TextSize
            size={16}
            color={COLORS.GRAY.TEXT}
            content='로그인 후 알림을 확인할 수 있어요'
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
        <View className='pt-2 h-64 items-center justify-center'>
          <ActivityIndicator size={80} color={COLORS.PRIMARY.BLUE} />
        </View>
      ) : isError ? (
        <View className='py-8 items-center'>
          <TextSize
            size={18}
            color={COLORS.GRAY.TEXT}
            content='잠시 오류가 발생했어요'
          />
          <View className='pt-4' />
          <Button
            variant='gray'
            height={56}
            width={320}
            content='다시 시도'
            textColor='#000'
            onPress={() => refetch()}
          />
        </View>
      ) : notifications.length === 0 ? (
        <View className='flex-1 items-center justify-center px-6'>
          <Ionicons
            name='notifications-outline'
            size={42}
            color={COLORS.GRAY.TEXT}
          />
          <View className='pt-4' />
          <TextSize
            size={16}
            color={COLORS.GRAY.TEXT}
            content='아직 도착한 알림이 없어요'
          />
        </View>
      ) : (
        <ScrollView className='pt-2'>
          {notifications.map((notification) => (
            <NotificationCard
              key={notification.id}
              notification={notification}
              onPress={handleNotificationPress}
            />
          ))}
          <View className='h-6' />
        </ScrollView>
      )}
    </CustomSafeAreaView>
  );
}
