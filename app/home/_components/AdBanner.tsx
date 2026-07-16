import { LinearGradient } from "expo-linear-gradient";
import React from "react";
import { Image, Pressable, View } from "react-native";

import Flex from "@/src/components/layout/Flex/Flex";
import TextSize from "@/src/components/ui/TextSize";
import { handleOpenURL } from "@/src/utils/stepDetail/openURL";
const coffee = require("../../../public/images/coffee.png");

export default function AdBanner() {
  return (
    <Pressable
      onPress={() => handleOpenURL({ redirect: "https://naver.me/GsBTzCLE" })}
      style={{ width: "90%", alignSelf: "center" }}
    >
    <LinearGradient
      colors={["#EFF6FF", "#E0F2FE"]}
      start={{ x: 0, y: 0 }}
      end={{ x: 0, y: 1 }}
      style={{
        paddingHorizontal: 16,
        paddingTop: 12,
        paddingBottom: 12,
        borderRadius: 12,
        borderWidth: 1,
        borderColor: "#BAE6FD",
      }}
    >
      <Flex justify='between' items='center' dir='row'>
        <View className='gap-1 flex-1'>
          <TextSize size={17} color='#0069A8' content='게하르방 OPEN 이벤트!' weight={600}  />
          <TextSize
            size={13}
            color='#0069A8'
            content={`지금 참여하고 커피 쿠폰 받아가세요 ☕ \n\n 👉 바로 확인하기 `}
          />
        </View>

        <View className='w-20 h-20 bg-sky-200 rounded-lg overflow-hidden pt-1'>
          <Flex items='center' justify='center'>
            <Image source={coffee} style={{ width: 90, height: 70 }} />
          </Flex>
        </View>
      </Flex>
    </LinearGradient>
    </Pressable>
  );
}
