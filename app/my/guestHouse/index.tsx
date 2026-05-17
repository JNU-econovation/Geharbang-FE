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
import { useEditGuestHouse } from "@/src/hooks/guestHouse/useEditGuestHouse";
import { useGuestHouseResumeDraft } from "@/src/hooks/guestHouse/useGuestHouseResumeDraft";
import {
  useDeleteMyGuestHouse,
  useGetMyGuestHouse,
  usePatchMyGuestHouseStatus,
} from "@/src/hooks/myGuestHouse/useMyGuestHouse";
import { COLORS } from "@/src/utils/constants/colors";
import { Ionicons } from "@expo/vector-icons";
import ManagementCard from "./_components/ManagementCard";

export default function MyGuestHouse() {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const { checkAndNavigate, modalProps } = useGuestHouseResumeDraft();
  const { handleEditPress } = useEditGuestHouse();
  const [selectedPost, setSelectedPost] = useState<{
    id: number;
    name: string;
  } | null>(null);

  const {
    data: myGuestHouseData,
    isLoading,
    isError,
    refetch,
  } = useGetMyGuestHouse();
  const { mutate: deletePost } = useDeleteMyGuestHouse();
  const { mutate: updateStatus } = usePatchMyGuestHouseStatus();

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
    <CustomSafeAreaView pageColor='bg-white' topOnly={true}>
      <View className='px-4 py-3'>
        <BackArrorHeader
          content='내 게스트하우스 관리'
          icon={
            <Pressable onPress={checkAndNavigate}>
              <Text className='mx-3 mb-1 text-primary-blue text-3xl'>+</Text>
            </Pressable>
          }
        />
      </View>

      <ScrollView className='bg-[#F9FAFB] py-4'>
        {isLoading ? (
          <LoadingSkeleton />
        ) : isError ? (
          <ErrorMessage onRetry={refetch} />
        ) : myGuestHouseData?.length === 0 ? (
          <View className='py-2 items-center gap-4'>
            <TextSize
              size={14}
              color={COLORS.GRAY.TEXT}
              content={`등록된 게스트하우스가 없습니다.\n 지금 바로 숙소를 등록하고 게스트를 맞이해 보세요!`}
              align='center'
            />
            <Button
              variant='primary'
              height={40}
              width={180}
              textColor='white'
              onPress={checkAndNavigate}
              content='게스트하우스 등록하기'
            />
          </View>
        ) : (
          <View className='px-3'>
            <Flex justify='start' items='center' gap={20}>
              {myGuestHouseData?.map((post) => (
                <ManagementCard
                  key={post.id}
                  id={post.id}
                  type='guestHouse'
                  title={post.guestHouseName}
                  roadNameAddress={post.roadNameAddress}
                  imageUrl={post.imageUrl}
                  isClosed={post.isClosed}
                  onDelete={() =>
                    handleDeletePress(post.id, post.guestHouseName)
                  }
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
