import { router } from "expo-router";
import { Pressable, ScrollView, Text, View } from "react-native";

import CustomSafeAreaView from "@/src/components/layout/CustomSafeAreaView";
import Flex from "@/src/components/layout/Flex";
import BackArrorHeader from "@/src/components/ui/BackArrowHeader";
import ConfirmModal from "@/src/components/ui/Modal/ConfirmModal";
import { Ionicons } from "@expo/vector-icons";
import { useState } from "react";
import ManagementCard from "../guestHouse/_components/ManagementCard";

const staffRecruitmentPosts = [
  {
    id: 1,
    title: "공고 제목입니다.",
    roadNameAddress: "도로명 주소",
    imageUrl: "/images/application/1768205585402_1_IMG_0002.jpeg",
    isClosed: true,
  },
  {
    id: 2,
    title: "공고 제목입니다.",
    roadNameAddress: "도로명 주소",

    imageUrl: "/images/application/1768205585402_1_IMG_0002.jpeg",
    isClosed: false,
  },
];

export default function MyStepRecruitment() {
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
          content='구인 공고 관리'
          icon={
            <Pressable onPress={() => router.push("/step/recruitment/step1")}>
              <Text className='mx-4 mb-1 text-primary-blue text-3xl'>+</Text>
            </Pressable>
          }
        />
      </View>

      <ScrollView className='bg-[#F9FAFB] pt-4 px-3'>
        <Flex justify='start' items='center' gap={20}>
          {staffRecruitmentPosts.map((post) => (
            <ManagementCard
              key={post.id}
              id={post.id}
              type='stepRecruitment'
              title={post.title}
              roadNameAddress={post.roadNameAddress}
              imageUrl={post.imageUrl}
              isClosed={post.isClosed}
              onDelete={() => handleDeletePress(post.id, post.title)}
              onToggleActive={() => console.log(`${post.id} 상태 변경`)}
            />
          ))}
        </Flex>
      </ScrollView>
      <ConfirmModal
        visible={isModalVisible}
        onClose={() => setIsModalVisible(false)}
        onConfirm={() => {
          console.log(`${selectedPost?.id}번 스텝 공고 삭제 로직 실행`);
          setIsModalVisible(false);
        }}
        title='구인 공고 삭제'
        confirmText='삭제하기'
        confirmBtnColor='primary-red'
        iconBgColor='bg-red-100'
        icon={<Ionicons name='trash-outline' color='red' size={28} />}
        description={`"${selectedPost?.name}"`}
        warningText='이 작업은 되돌릴 수 없습니다.'
      />
    </CustomSafeAreaView>
  );
}
