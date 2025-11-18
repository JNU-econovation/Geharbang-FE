import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { Pressable, View } from "react-native";

import MainIcon from "@/public/svgs/mainIcon.svg";
import Flex from "@/src/components/layout/Flex";
import TextSize from "@/src/components/ui/TextSize";

export default function Header() {
  return (
    <View className="px-4 py-2 border-b-2 border-gray-border">
      <Flex items="center" justify="between" flexDir="row">
        <Flex items="center" justify="start" flexDir="row" gap={12}>
          <MainIcon width={50} height={50} />
          <TextSize size={23} content="게하르방" weight="semibold"></TextSize>
        </Flex>

        <Pressable className="p-1 rounded-full">
          {({ pressed }) => (
            <Ionicons
              name="notifications-outline"
              size={25}
              color={pressed ? "#9CA3AF" : "#4B5563"}
            />
          )}
        </Pressable>
      </Flex>
    </View>
  );
}
