import { Ionicons } from "@expo/vector-icons";
import React, { ReactNode } from "react";
import { Pressable, Text, View } from "react-native";

interface ListLinkButtonProps {
  label: string;
  onPress: () => void;
  icon: ReactNode;
}

export function ListLinkButton({ label, onPress, icon }: ListLinkButtonProps) {
  return (
    <Pressable
      className="relative w-[90%] bg-[#F3F4F6] h-12 rounded-lg active:opacity-70"
      style={{
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.2,
        shadowRadius: 3,
      }}
      onPress={onPress}
    >
      <View className="absolute left-3 top-2 bg-white rounded-lg shadow-sm p-1">
        {icon}
      </View>

      <Text className="absolute left-14 top-3.5 text-[15px] text-gray-text">
        {label}
      </Text>

      <Ionicons
        name="chevron-forward-outline"
        size={22}
        color="#99A1AF"
        className="absolute right-3 top-3"
      />
    </Pressable>
  );
}

export default ListLinkButton;
