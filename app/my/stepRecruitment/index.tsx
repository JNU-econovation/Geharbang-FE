import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import { useState } from "react";
import { Pressable, ScrollView, Text, View } from "react-native";

import CustomSafeAreaView from "@/src/components/layout/CustomSafeAreaView";
import Flex from "@/src/components/layout/Flex";
import BackArrorHeader from "@/src/components/ui/BackArrowHeader";
import Button from "@/src/components/ui/Button/Button";
import ErrorMessage from "@/src/components/ui/ErrorMessage";
import LoadingSkeleton from "@/src/components/ui/LoadingSkeleton";
import { CloseableConfirmModal } from "@/src/components/ui/Modal/CloseableConfirmModal";
import ConfirmModal from "@/src/components/ui/Modal/ConfirmModal";
import TextSize from "@/src/components/ui/TextSize";
import {
  useDeleteMyStepRecruitment,
  useGetMyStepRecruitment,
  usePatchMyStepRecruitmentStatus,
} from "@/src/hooks/myStepRecruitment/useMyStepRecruitment";
import { useEditStepRecruitment } from "@/src/hooks/stepRecruitment/useEditStepRecruitment";
import { useStepRecruitmentResumeDraft } from "@/src/hooks/stepRecruitment/useStepRecruitmentResumeDraft";
import { COLORS } from "@/src/utils/constants/colors";
import ManagementCard from "../guestHouse/_components/ManagementCard";

export default function MyStepRecruitment() {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const { checkAndNavigate, modalProps } = useStepRecruitmentResumeDraft();
  const { handleEditPress } = useEditStepRecruitment();
  const [selectedPost, setSelectedPost] = useState<{
    id: number;
    name: string;
  } | null>(null);

  const {
    data: myStepRecruitment,
    isLoading,
    isError,
    refetch,
  } = useGetMyStepRecruitment();

  const { mutate: deletePost } = useDeleteMyStepRecruitment();
  const { mutate: updateStatus } = usePatchMyStepRecruitmentStatus();

  const handleDeletePress = (id: number, name: string) => {
    setSelectedPost({ id, name });
    setIsModalVisible(true);
  };

  const handleConfirmDelete = () => {
    if (selectedPost) {
      deletePost(selectedPost.id, {
        onSuccess: () => {
          setIsModalVisible(false);
        },
      });
    }
  };

  const handleToggleStatus = (id: number, isClosed: boolean) => {
    const nextStatus = isClosed ? "ACTIVE" : "INACTIVE";
    updateStatus({
      id,
      status: nextStatus,
    });
  };

  return (
    <CustomSafeAreaView pageColor='bg-white'>
      <View className='px-4 py-3'>
        <BackArrorHeader
          content='내 스텝 공고 관리'
          onPress={() => router.push("/profile")}
          icon={
            <Pressable onPress={checkAndNavigate}>
              <Text className='mx-4 mb-1 text-primary-blue text-3xl'>+</Text>
            </Pressable>
          }
        />
      </View>

      <ScrollView className='bg-[#F9FAFB] py-4 '>
        {isLoading ? (
          <LoadingSkeleton />
        ) : isError ? (
          <ErrorMessage onRetry={refetch} />
        ) : myStepRecruitment?.length === 0 ? (
          <View className='py-2  items-center gap-4'>
            <TextSize
              size={14}
              color={COLORS.GRAY.TEXT}
              content={`등록된 스텝 공고가 없습니다.\n지금 바로 스텝 모집을 시작해 보세요!`}
              align='center'
            />
            <Button
              variant='primary'
              height={40}
              width={180}
              textColor='white'
              onPress={checkAndNavigate}
              content='스텝 공고 올리기'
            />
          </View>
        ) : (
          <View className='px-3'>
            <Flex justify='start' items='center' gap={20}>
              {myStepRecruitment?.map((post) => (
                <ManagementCard
                  key={post.id}
                  id={post.id}
                  type='stepRecruitment'
                  title={post.title}
                  roadNameAddress={post.roadNameAddress}
                  imageUrl={post.imageUrl}
                  isClosed={post.isClosed}
                  onDelete={() => handleDeletePress(post.id, post.title)}
                  onToggleActive={() =>
                    handleToggleStatus(post.id, post.isClosed)
                  }
                  onEdit={() => handleEditPress(post.id)}
                />
              ))}
            </Flex>
          </View>
        )}
      </ScrollView>

      <CloseableConfirmModal {...modalProps} />

      <ConfirmModal
        visible={isModalVisible}
        onClose={() => setIsModalVisible(false)}
        onConfirm={handleConfirmDelete}
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
