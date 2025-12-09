import { router } from "expo-router";
import React from "react";
import { Pressable, Text, View } from "react-native";

import TextSize from "@/src/components/ui/TextSize";

export default function ChatScreen() {
  return (
    <View className='flex-1 bg-gray-50'>
      <View className='flex-1 items-center justify-center'>
        <Text className='text-lg font-medium text-gray-900'>
          채팅 페이지입니다
        </Text>

        <View className='gap-3 pt-5'>
          <TextSize size={16} content='페이지 바로가기 버튼 ▼' />
          <Pressable onPress={() => router.push("/login")}>
            <TextSize size={16} color='deepskyblue' content='로그인' />
          </Pressable>
          <Pressable onPress={() => router.push("/application/create")}>
            <TextSize
              size={16}
              color='deepskyblue'
              content='공통 지원서 작성하기'
            />
          </Pressable>

          <Pressable onPress={() => router.push("/step/stepDetail/1")}>
            <TextSize size={16} color='deepskyblue' content='스텝 상세보기' />
          </Pressable>
<Pressable onPress={() => router.push('/step/recruitment/step3')}>
            <TextSize size={16} color="deepskyblue" content="스텝 지원하기" />
          </Pressable>
        </View>
      </View>
    </View>
  );
}
