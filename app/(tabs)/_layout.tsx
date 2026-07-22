import { Ionicons } from "@expo/vector-icons";
import { Tabs } from "expo-router";
import React from "react";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useHomeStore } from "@/src/stores/home/useHomeStore";
import { useChatRooms } from "@/src/hooks/chat/useChat";
import { useAuthStore } from "@/src/stores/auth/useAuthStore";

function TabBarIcon(props: {
  name: React.ComponentProps<typeof Ionicons>["name"];
  color: string;
}) {
  return <Ionicons size={24} {...props} />;
}

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
          paddingTop: 8,
          paddingBottom: insets.bottom || 20,
          height: 65 + (insets.bottom || 20),
        },
        tabBarActiveTintColor: "#0EA5E9",
        tabBarInactiveTintColor: "#9CA3AF",
        tabBarLabelStyle: {
          fontSize: 12,
          fontWeight: "500",
        },
      }}
    >
      <Tabs.Screen
        name='index'
        options={{
          title: "홈",
          tabBarIcon: ({ color }) => <TabBarIcon name='home' color={color} />,
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
          tabBarIcon: ({ color }) => (
            <TabBarIcon name='map-outline' color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name='ai'
        options={{
          title: "AI",
          tabBarStyle: { display: "none" },
          tabBarIcon: ({ color }) => (
            <TabBarIcon name='sparkles-outline' color={color} />
          ),
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
          tabBarIcon: ({ color }) => (
            <TabBarIcon name='chatbubble-ellipses-outline' color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name='profile'
        options={{
          title: "내정보",
          tabBarIcon: ({ color }) => <TabBarIcon name='person' color={color} />,
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
