import { Ionicons } from "@expo/vector-icons";
import { Tabs } from "expo-router";
import React from "react";
import { useSafeAreaInsets } from "react-native-safe-area-context";

function TabBarIcon(props: {
  name: React.ComponentProps<typeof Ionicons>["name"];
  color: string;
}) {
  return <Ionicons size={24} {...props} />;
}

export default function TabLayout() {
  const insets = useSafeAreaInsets();
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
      />
      <Tabs.Screen
        name='guestHouseEnroll'
        options={{
          title: "게하등록",
          tabBarIcon: ({ color }) => (
            <TabBarIcon name='home-outline' color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name='stepRecruitment'
        options={{
          title: "스텝모집",
          tabBarIcon: ({ color }) => (
            <TabBarIcon name='people-outline' color={color} />
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
    </Tabs>
  );
}
