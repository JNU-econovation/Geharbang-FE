import { LinearGradient } from "expo-linear-gradient";
import React from "react";
import { View } from "react-native";

import MainIcon from "@/public/svgs/mainIcon.svg";
import Flex from "@/src/components/layout//Flex/Flex";
import TextSize from "@/src/components/ui/TextSize";

export default function AdBanner() {
  return (
    <LinearGradient
      colors={["#EFF6FF", "#E0F2FE"]}
      start={{ x: 0, y: 0 }}
      end={{ x: 0, y: 1 }}
      style={{
        paddingHorizontal: 16,
        paddingTop: 16,
        paddingBottom: 16,
        borderRadius: 12,
        borderWidth: 1,
        borderColor: "#BAE6FD",
        width: "90%",
      }}
    >
      <Flex justify="center" items="center" dir="row" gap={90}>
        <View className="gap-1 flex-1">
          <TextSize size={15} color="#0069A8" content="🌊 제주 성수기 특가" />
          <TextSize
            size={12}
            color="#0069A8"
            content="게스트하우스 예약 시 최대 30% 할인"
          />
        </View>

        <View className="w-12 h-12 bg-sky-200 rounded-lg overflow-hidden">
          <Flex items="center" justify="center">
            <MainIcon width={35} height={50} />
          </Flex>
        </View>
      </Flex>
    </LinearGradient>
  );
}
