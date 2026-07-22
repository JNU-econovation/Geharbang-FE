import { Tabs } from "expo-router";
import React from "react";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useHomeStore } from "@/src/stores/home/useHomeStore";
import { useChatRooms } from "@/src/hooks/chat/useChat";
import { useAuthStore } from "@/src/stores/auth/useAuthStore";

import HomeIcon from "@/public/images/icons/tabs/home.svg";
import HomeSelectedIcon from "@/public/images/icons/tabs/home_selected.svg";
import MapIcon from "@/public/images/icons/tabs/map.svg";
import MapSelectedIcon from "@/public/images/icons/tabs/map_selected.svg";
import AiIcon from "@/public/images/icons/tabs/ai.svg";
import AiSelectedIcon from "@/public/images/icons/tabs/ai_selected.svg";
import ChatsIcon from "@/public/images/icons/tabs/chats.svg";
import ChatsSelectedIcon from "@/public/images/icons/tabs/chats_selected.svg";
import ProfileIcon from "@/public/images/icons/tabs/profile.svg";
import ProfileSelectedIcon from "@/public/images/icons/tabs/profile_selected.svg";

export default function TabLayout() {
  const insets = useSafeAreaInsets();
  const isLogined = useAuthStore((state) => Boolean(state.accessToken));
  const { data: chatRoomsData } = useChatRooms();
  const unreadChatCount = isLogined
    ? (chatRoomsData?.chatRooms ?? []).reduce(
        (sum, room) => sum + room.unreadCount,
        0,
      )
    : 0;
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          backgroundColor: "white",
          borderTopWidth: 1,
          borderTopColor: "#E5E7EB",
          borderTopLeftRadius: 20,
          borderTopRightRadius: 20,
          paddingTop: 8,
          paddingBottom: insets.bottom || 20,
          height: 65 + (insets.bottom || 20),
        },
        tabBarActiveTintColor: "#0EA5E9",
        tabBarInactiveTintColor: "#000000",
        tabBarIconStyle: {
          marginBottom: 2,
        },
        tabBarLabelStyle: {
          fontSize: 12,
          fontWeight: "500",
          marginTop: 2,
        },
      }}
    >
      <Tabs.Screen
        name='index'
        options={{
          title: "홈",
          tabBarIcon: ({ focused }) =>
            focused
              ? <HomeSelectedIcon width={24} height={24} />
              : <HomeIcon width={24} height={24} />,
        }}
        listeners={({ navigation, route }) => ({
          tabPress: () => {
            const state = navigation.getState();
            const isAlreadyOnHome =
              state.routes[state.index]?.name === route.name;
            if (isAlreadyOnHome) {
              useHomeStore.getState().triggerRefresh();
            }
          },
        })}
      />
      <Tabs.Screen
        name='map'
        options={{
          title: "지도",
          tabBarIcon: ({ focused }) =>
            focused
              ? <MapSelectedIcon width={30} height={24} />
              : <MapIcon width={30} height={24} />,
        }}
      />
      <Tabs.Screen
        name='ai'
        options={{
          title: "AI",
          tabBarStyle: { display: "none" },
          tabBarIcon: ({ focused }) =>
            focused
              ? <AiSelectedIcon width={24} height={24} />
              : <AiIcon width={24} height={24} />,
        }}
      />
      <Tabs.Screen
        name='chats'
        options={{
          title: "채팅",
          tabBarBadge:
            unreadChatCount > 0
              ? unreadChatCount > 99
                ? "99+"
                : unreadChatCount
              : undefined,
          tabBarBadgeStyle: {
            backgroundColor: "#E7000B",
            color: "#FFFFFF",
            fontSize: 10,
            minWidth: 18,
            height: 18,
          },
          tabBarIcon: ({ focused }) =>
            focused
              ? <ChatsSelectedIcon width={24} height={24} />
              : <ChatsIcon width={24} height={24} />,
        }}
      />
      <Tabs.Screen
        name='profile'
        options={{
          title: "내정보",
          tabBarIcon: ({ focused }) =>
            focused
              ? <ProfileSelectedIcon width={19} height={24} />
              : <ProfileIcon width={19} height={24} />,
        }}
      />
      <Tabs.Screen
        name='guestHouseEnroll'
        options={{
          href: null,
        }}
      />
      <Tabs.Screen
        name='stepRecruitment'
        options={{
          href: null,
        }}
      />
    </Tabs>
  );
}
