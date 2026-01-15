import { router } from "expo-router";
import { useState } from "react";
import { Pressable, ScrollView, Text, View } from "react-native";

import CustomSafeAreaView from "@/src/components/layout/CustomSafeAreaView";
import Flex from "@/src/components/layout/Flex";
import BackArrorHeader from "@/src/components/ui/BackArrowHeader";
import ConfirmModal from "@/src/components/ui/Modal/ConfirmModal";
import { Ionicons } from "@expo/vector-icons";
import ManagementCard from "./_components/ManagementCard";

const guestHousePosts = [
  {
    id: 1,
    guestHouseName: "제주도 게스트하우스 이름",
    roadNameAddress: "서귀포시 중문관광로 456",
    imageUrl: "/images/application/1768205585402_1_IMG_0002.jpeg",
    isClosed: false,
  },
  {
    id: 2,
    guestHouseName: "제주도 게스트하우스 이름",
    roadNameAddress: "서귀포시 중문관광로 456",
    imageUrl: "/images/application/1768205585402_1_IMG_0002.jpeg",
    isClosed: true,
  },
];

export default function MyGuestHouse() {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedPost, setSelectedPost] = useState<{
    id: number;
    name: string;
  } | null>(null);

  const handleDeletePress = (id: number, name: string) => {
    setSelectedPost({ id, name });
    setIsModalVisible(true);
  };

  return (
    <CustomSafeAreaView pageColor='bg-white'>
      <View className='px-4 py-3'>
        <BackArrorHeader
          content='내 게스트하우스 관리'
          icon={
            <Pressable onPress={() => router.push("/guestHouse/enroll")}>
              <Text className='mx-3 mb-1 text-primary-blue text-3xl'>+</Text>
            </Pressable>
          }
        />
      </View>

      <ScrollView className='bg-[#F9FAFB] pt-4 px-3'>
        <Flex justify='start' items='center' gap={20}>
          {guestHousePosts.map((post) => (
            <ManagementCard
              key={post.id}
              id={post.id}
              type='guestHouse'
              title={post.guestHouseName}
              roadNameAddress={post.roadNameAddress}
              imageUrl={post.imageUrl}
              isClosed={post.isClosed}
              onDelete={() => handleDeletePress(post.id, post.guestHouseName)}
              onToggleActive={() => console.log(`${post.id} 상태 변경`)}
            />
          ))}
        </Flex>
      </ScrollView>

      <ConfirmModal
        visible={isModalVisible}
        onClose={() => setIsModalVisible(false)}
        onConfirm={() => {
          console.log(`${selectedPost?.id}번 게스트하우스 삭제 로직 실행`);
          setIsModalVisible(false);
        }}
        title='게스트하우스 등록 삭제'
        confirmText='삭제하기'
        confirmBtnColor='primary-red'
        iconBgColor='red-100'
        icon={<Ionicons name='trash-outline' color='red' size={28} />}
        description={`"${selectedPost?.name}"`}
        warningText='이 작업은 되돌릴 수 없습니다.'
      />
    </CustomSafeAreaView>
  );
}
