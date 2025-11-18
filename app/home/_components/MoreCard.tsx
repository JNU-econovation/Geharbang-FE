import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { Dimensions, Pressable, View } from "react-native";

import TextSize from "@/src/components/ui/TextSize";
import { COLORS } from "@/src/utils/constants/colors";

interface MoreCardProps {
  onPress: () => void;
}

export default function MoreCard({ onPress }: MoreCardProps) {
  const { width: SCREEN_WIDTH } = Dimensions.get("window");
  const CARD_WIDTH = SCREEN_WIDTH * 0.4;
  return (
    <Pressable
      style={{ width: CARD_WIDTH }}
      className="bg-[#0EA5E910] rounded-2xl border border-primary-blue justify-center items-center"
      onPress={onPress}
    >
      <View className="items-center gap-3">
        <View className="w-14 h-14 bg-primary-blue rounded-full justify-center items-center ">
          <Ionicons name="add-outline" size={28} color="white" />
        </View>

        <TextSize size={18} color={COLORS.PRIMARY.BLUE} content="더보기" />
      </View>
    </Pressable>
  );
}
