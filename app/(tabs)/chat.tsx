import { useLogout } from '@/src/hooks/login/useLogout';
import { router } from 'expo-router';
import React from 'react';
import { Pressable, Text, View } from 'react-native';

import TextSize from '@/src/components/ui/TextSize';
import { useRequireLogin } from '@/src/hooks/common/useRequireLogin';

export default function ChatScreen() {
  const handleLogout = useLogout();
  const { requireLogin } = useRequireLogin();
  return (
    <View className="flex-1 bg-gray-50">
      <View className="flex-1 items-center justify-center">
        <Text className="text-lg font-medium text-gray-900">
          채팅 페이지입니다
        </Text>

        <View className="gap-3 pt-5">
          <TextSize size={16} content="페이지 바로가기 버튼 ▼" />
          <Pressable onPress={() => router.push('/login')}>
            <TextSize size={16} color="deepskyblue" content="로그인" />
          </Pressable>
          <Pressable onPress={handleLogout}>
            <TextSize size={16} color="deepskyblue" content="로그아웃" />
          </Pressable>
          <Pressable
            onPress={() =>
              requireLogin(() => {
                router.push('/application/create');
              })
            }
          >
            <TextSize
              size={16}
              color="deepskyblue"
              content="공통 지원서 작성하기"
            />
          </Pressable>

          <Pressable onPress={() => router.push('/step/stepDetail/1')}>
            <TextSize size={16} color="deepskyblue" content="스텝 상세보기" />
          </Pressable>
          <Pressable onPress={() => router.push('/guestHouse/enroll')}>
            <TextSize size={16} color="deepskyblue" content="게하등록" />
          </Pressable>
          <Pressable onPress={() => router.push('/operator/verify')}>
            <TextSize size={16} color="deepskyblue" content="운영자 인증" />
          </Pressable>

          <Pressable
            onPress={() =>
              requireLogin(() => {
                router.push('/step/recruitment/step1');
              })
            }
          >
            <TextSize
              size={16}
              color="deepskyblue"
              content="스텝 공고 올리기"
            />
          </Pressable>
          {/* <Pressable
            onPress={() => router.push('/guestHouse/guestHouseDetail/1')}
          >
            <TextSize
              size={16}
              color="deepskyblue"
              content="게스트하우스 상세보기"
            />
          </Pressable> */}
        </View>
      </View>
    </View>
  );
}
