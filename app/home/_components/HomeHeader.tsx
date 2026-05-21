import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import React from "react";
import { Pressable, View } from "react-native";

import MainIcon from "@/public/svgs/mainIcon.svg";
import Flex from "@/src/components/layout/Flex/Flex";
import TextSize from "@/src/components/ui/TextSize";
import { useUnreadNotificationCount } from "@/src/hooks/notification/useNotifications";
import { useAuthStore } from "@/src/stores/auth/useAuthStore";

export default function Header() {
  const isLogined = useAuthStore((state) => Boolean(state.accessToken));
  const { data } = useUnreadNotificationCount();
  const unreadCount = data?.unreadCount ?? 0;

  return (
    <View className="px-4 py-2 border-b-2 border-gray-border">
      <Flex items="center" justify="between" dir="row">
        <Flex items="center" justify="start" dir="row" gap={12}>
          <MainIcon width={50} height={50} />
          <TextSize size={23} content="게하르방" weight="semibold"></TextSize>
        </Flex>

        <Pressable
          className="p-1 rounded-full relative"
          onPress={() =>
            router.push((isLogined ? "/notifications" : "/login") as any)
          }
        >
          {({ pressed }) => (
            <>
              <Ionicons
                name="notifications-outline"
                size={25}
                color={pressed ? "#9CA3AF" : "#4B5563"}
              />
              {unreadCount > 0 && (
                <View className="absolute -top-1 -right-1 min-w-5 h-5 px-1 rounded-full bg-[#E7000B] items-center justify-center">
                  <TextSize
                    size={10}
                    color="white"
                    content={unreadCount > 99 ? "99+" : String(unreadCount)}
                  />
                </View>
              )}
            </>
          )}
        </Pressable>
      </Flex>
    </View>
  );
}
