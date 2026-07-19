import { Image } from "expo-image";
import { router } from "expo-router";
import { useEffect, useState } from "react";
import {
  ActivityIndicator,
  Modal,
  Pressable,
  ScrollView,
  Text,
  View,
} from "react-native";

import CustomSafeAreaView from "@/src/components/layout/CustomSafeAreaView";
import Flex from "@/src/components/layout/Flex";
import BackArrorHeader from "@/src/components/ui/BackArrowHeader";
import Button from "@/src/components/ui/Button/Button";
import ErrorMessage from "@/src/components/ui/ErrorMessage";
import LoadingSkeleton from "@/src/components/ui/LoadingSkeleton";
import { CloseableConfirmModal } from "@/src/components/ui/Modal/CloseableConfirmModal";
import ConfirmModal from "@/src/components/ui/Modal/ConfirmModal";
import TextSize from "@/src/components/ui/TextSize";
import { buildAssetUrl } from "@/src/config/url";
import { useEditGuestHouse } from "@/src/hooks/guestHouse/useEditGuestHouse";
import { useGuestHouseResumeDraft } from "@/src/hooks/guestHouse/useGuestHouseResumeDraft";
import {
  useDeleteMyGuestHouse,
  useGetMyGuestHouse,
  usePatchMyGuestHouseStatus,
} from "@/src/hooks/myGuestHouse/useMyGuestHouse";
import { useReviewReport } from "@/src/hooks/review/useReviews";
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
  const [selectedReportPost, setSelectedReportPost] = useState<{
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
  const {
    data: reviewReport,
    isLoading: isReviewReportLoading,
    isError: isReviewReportError,
    refetch: refetchReviewReport,
  } = useReviewReport(selectedReportPost?.id ?? 0, !!selectedReportPost);

  useEffect(() => {
    if (myGuestHouseData) {
      myGuestHouseData.forEach((post) => {
        const uri = buildAssetUrl(post.imageUrl);
        if (uri) Image.prefetch(uri);
      });
    }
  }, [myGuestHouseData]);

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
          onPress={() => router.push("/profile")}
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
                  onReviewReport={() =>
                    setSelectedReportPost({
                      id: post.id,
                      name: post.guestHouseName,
                    })
                  }
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

      <Modal visible={!!selectedReportPost} transparent animationType='fade'>
        <View className='flex-1 justify-end bg-black/40'>
          <View className='max-h-[82%] bg-white rounded-t-2xl'>
            <ScrollView contentContainerClassName='px-4 pt-5 pb-8'>
              <View className='flex-row items-center justify-between'>
                <View className='flex-1 pr-4'>
                  <TextSize
                    size={18}
                    color='#101828'
                    weight='700'
                    content='리뷰 리포트'
                  />
                  <View className='pt-1' />
                  <TextSize
                    size={13}
                    color={COLORS.GRAY.TEXT}
                    content={selectedReportPost?.name ?? ""}
                  />
                </View>
                <Pressable
                  onPress={() => setSelectedReportPost(null)}
                  hitSlop={8}
                >
                  <TextSize size={24} color={COLORS.GRAY.TEXT} content='×' />
                </Pressable>
              </View>

              <View className='pt-5'>
                {isReviewReportLoading ? (
                  <View className='py-8 items-center'>
                    <ActivityIndicator color={COLORS.PRIMARY.BLUE} />
                  </View>
                ) : isReviewReportError ? (
                  <View className='py-6 items-center gap-3'>
                    <TextSize
                      size={14}
                      color={COLORS.GRAY.TEXT}
                      content='리포트를 불러오지 못했어요.'
                    />
                    <Pressable onPress={() => refetchReviewReport()}>
                      <TextSize
                        size={14}
                        color={COLORS.PRIMARY.BLUE}
                        content='다시 시도'
                      />
                    </Pressable>
                  </View>
                ) : (
                  <View className='gap-3'>
                    <View className='p-4 bg-gray-50 rounded-xl'>
                      <TextSize
                        size={13}
                        color={COLORS.GRAY.TEXT}
                        content={`분석 리뷰 수: ${reviewReport?.reviewCount ?? 0}개`}
                      />
                    </View>
                    <Text
                      className='text-[14px] leading-6 text-[#364153]'
                    >
                      {reviewReport?.report ?? "아직 생성된 리포트가 없어요."}
                    </Text>
                  </View>
                )}
              </View>
            </ScrollView>
          </View>
        </View>
      </Modal>
    </CustomSafeAreaView>
  );
}
