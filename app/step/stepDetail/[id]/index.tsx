import { useEffect, useState } from "react";
import { ActivityIndicator, ScrollView, View } from "react-native";

import CustomSafeAreaView from "@/src/components/layout/CustomSafeAreaView";
import Button from "@/src/components/ui/Button/Button";
import ReviewSection from "@/src/components/review/ReviewSection";
import { useToggleWish } from "@/src/hooks/wish/useToggleWish";
import TextSize from "@/src/components/ui/TextSize";
import { useRequireLogin } from "@/src/hooks/common/useRequireLogin";
import { useApplicationExist } from "@/src/hooks/stepDetail/useApplicationExist";
import { useCreateChatRoom } from "@/src/hooks/chat/useChat";
import { useHandleSection } from "@/src/hooks/common/useHandleSection";
import { useSectionToScroll } from "@/src/hooks/common/useSectionToScroll";
import { useStepDetail } from "@/src/hooks/stepDetail/useStepDetail";

import DetailPageBackArrow from "@/src/components/ui/DetailPageBackArrow";
import { COLORS } from "@/src/utils/constants/colors";
import { STEP_DETAIL } from "@/src/utils/constants/pressSection";
import { router } from "expo-router";
import { useLocalSearchParams } from "expo-router/build/hooks";

import Address from "@/src/components/ui/Address/Address";
import Contact from "@/src/components/ui/Contact";
import Feature from "../_components/Feature/Feature";
import GehaImage from "../_components/GehaInfo/GehaImage";
import GehaInfo from "../_components/GehaInfo/GehaInfo";
import Intro from "../_components/Intro/Intro";
import StepDetailModal from "../_components/Modal/StepDetailModal";
import PressSection from "../_components/PressSection/PressSection";
import WorkInfo from "../_components/WorkInfo/WorkInfo";

export default function StepDetail() {
  const { id, fromRegistration } = useLocalSearchParams<{ id: string; fromRegistration?: string }>();

  const {
    scrollViewRef,
    setSectionYPositions,
    sectionToScroll,
    setContainerOffset,
    setStickyHeaderHeight,
  } = useSectionToScroll();
  const { selectedSection, handleSectionToScroll } = useHandleSection({
    sectionToScroll,
  });

  const handleApply = () => {
    setIsVisible(false);

    if (isApplicationExist) {
      router.push(`/step/stepDetail/${id}/apply`);
    } else {
      router.push("/application/create");
    }
  };

  const { data, isPending, isError, refetch } = useStepDetail();

  const { isApplicationExist } = useApplicationExist();
  const { mutate: createChatRoom, isPending: isCreatingChatRoom } =
    useCreateChatRoom();

  const [isVisible, setIsVisible] = useState(false);
  const [isWished, setIsWished] = useState(false);

  useEffect(() => {
    if (data?.isWished !== undefined) setIsWished(data.isWished);
  }, [data?.isWished]);

  const { mutate: toggleWish } = useToggleWish({
    type: "stepRecruitment",
    id: Number(id),
    onOptimisticUpdate: setIsWished,
    onError: () => setIsWished((v) => !v),
  });

  const { requireLogin } = useRequireLogin();

  const handleChatPress = () => {
    requireLogin(() => {
      createChatRoom(
        { staffRecruitmentId: Number(id) },
        {
          onSuccess: ({ chatRoomId }) => {
            router.push({
              pathname: "/chats/[roomId]",
              params: {
                roomId: String(chatRoomId),
                title: data?.guestHouseName ?? "채팅",
              },
            });
          },
        },
      );
    });
  };

  return (
    <CustomSafeAreaView pageColor='bg-white'>
      <View className='px-4 pt-3 pb-6'>
        <DetailPageBackArrow
          content='스텝공고 상세'
          shareTitle='스텝공고 공유하기'
          shareMessage='스텝공고를 공유해보세요!'
          onBack={fromRegistration === 'true' ? () => router.replace('/(tabs)') : undefined}
          isWished={isWished}
          onWishToggle={() => toggleWish(isWished)}
        />
      </View>
      {isPending ? (
        <View className='flex-1 items-center justify-center'>
          <ActivityIndicator size='large' color='#000' />
        </View>
      ) : isError ? (
        <View className='flex-1 items-center justify-center'>
          <TextSize size={18} content='데이터를 불러오는데 실패했습니다.' />
          <View className='pt-4' />
          <Button
            variant='gray'
            height={56}
            width={320}
            content='다시 시도'
            textColor='#000'
            onPress={() => refetch()}
          />
        </View>
      ) : (
        <View className='flex-1'>
          <ScrollView
            ref={scrollViewRef}
            stickyHeaderIndices={[2]}
            contentContainerStyle={{ paddingBottom: 24 }}
          >
            <GehaImage
              images={data?.representativeImages}
              height={280}
              page={true}
            />

            <View className='px-4 pt-4 pb-8'>
              <GehaInfo
                title={data?.title}
                guestHouseName={data?.guestHouseName}
                region={data?.region}
              />
            </View>

            <View
              className='bg-white border-b border-gray-100 py-3'
              onLayout={(e) => setStickyHeaderHeight(e.nativeEvent.layout.height)}
            >
              <PressSection
                items={STEP_DETAIL}
                handleSectionToScroll={handleSectionToScroll}
                selectedSection={selectedSection}
              />
            </View>

            <View className='px-4' onLayout={(e) => setContainerOffset(e.nativeEvent.layout.y)}>
              <View className='pt-10' />
              <Address
                setSectionYPositions={setSectionYPositions}
                location={data?.location}
              />

              <View className='pt-10' />
              <WorkInfo
                setSectionYPositions={setSectionYPositions}
                workingInfomation={data?.workingInformation}
              />

              <View className='pt-10' />
              <Intro
                setSectionYPositions={setSectionYPositions}
                introduction={data?.introduction}
              />

              <View className='pt-10' />
              <Feature
                setSectionYPositions={setSectionYPositions}
                feature={data?.feature}
              />

              <View className='pt-10' />
              <Contact
                setSectionYPositions={setSectionYPositions}
                contact={data?.contact}
                owerMessage={data?.ownerMessage}
              />

              <View
                className='pt-10'
                onLayout={(e) => {
                  const y = e.nativeEvent.layout.y;
                  setSectionYPositions((prev) => ({
                    ...prev,
                    review: y,
                  }));
                }}
              >
                <ReviewSection
                  targetType='staffRecruitment'
                  targetId={Number(id)}
                />
              </View>
              <View className='pt-10' />

              <StepDetailModal
                isVisible={isVisible}
                onPress={() => setIsVisible(false)}
                onApply={handleApply}
                isApplicationExist={isApplicationExist}
              />
            </View>
          </ScrollView>

          <View className='flex-row gap-2 px-4 pt-3 pb-3 bg-white border-t border-[#E5E7EB]'>
            <View style={{ flex: 3 }}>
              <Button
                height={56}
                content='채팅하기'
                textColor={COLORS.PRIMARY.BLUE}
                className='w-full bg-white border border-primary-blue'
                isPending={isCreatingChatRoom}
                onPress={handleChatPress}
              />
            </View>
            <View style={{ flex: 7 }}>
              <Button
                variant='primary'
                height={56}
                content='지원하기'
                textColor='#ffffff'
                className='w-full'
                onPress={() => requireLogin(() => setIsVisible(true))}
              />
            </View>
          </View>
        </View>
      )}
    </CustomSafeAreaView>
  );
}
