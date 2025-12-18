import { useState } from "react";
import {
  ActivityIndicator,
  Pressable,
  ScrollView,
  Share,
  View,
} from "react-native";

import ShareArrow from "@/public/svgs/StepDetail/shareArrow.svg";
import Streamed from "@/public/svgs/StepDetail/steamed.svg";

import CustomSafeAreaView from "@/src/components/layout/CustomSafeAreaView";
import Flex from "@/src/components/layout/Flex/Flex";
import BackArrorHeader from "@/src/components/ui/BackArrowHeader";
import Button from "@/src/components/ui/Button/Button";
import TextSize from "@/src/components/ui/TextSize";
import { useRequireLogin } from "@/src/hooks/common/useRequireLogin";
import { useApplicationExist } from "@/src/hooks/stepDetail/useApplicationExist";
import { useHandleSection } from "@/src/hooks/stepDetail/useHandleSection";
import { useSectionToScroll } from "@/src/hooks/stepDetail/useSectionToScroll";
import { useStepDetail } from "@/src/hooks/stepDetail/useStepDetail";

import Address from "../_components/Address/Address";
import Contact from "../_components/Contact/Contact";
import Feature from "../_components/Feature/Feature";
import GehaImage from "../_components/GehaInfo/GehaImage";
import GehaInfo from "../_components/GehaInfo/GehaInfo";
import Intro from "../_components/Intro/Intro";
import StepDetailModal from "../_components/Modal/StepDetailModal";
import PressSection from "../_components/PressSection/PressSection";
import WorkInfo from "../_components/WorkInfo/WorkInfo";

export default function StepDetail() {
  const { scrollViewRef, setSectionYPositions, sectionToScroll } =
    useSectionToScroll();
  const { selectedSection, handleSectionToScroll } = useHandleSection({
    sectionToScroll,
  });

  const { data, isPending, isError, refetch } = useStepDetail();

  const { isApplicationExist } = useApplicationExist();
  const [isVisible, setIsVisible] = useState(false);

  const { requireLogin } = useRequireLogin();

  return (
    <CustomSafeAreaView pageColor='bg-white'>
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
        <>
          <View className='px-4 pt-3 pb-6'>
            <BackArrorHeader
              content='스텝 공고 상세'
              icon={
                <Flex items='center' justify='center' dir='row' gap={20}>
                  <Streamed width={20} height={20} />
                  <Pressable
                    onPress={async () =>
                      await Share.share({
                        title: "스텝 공고 상세 공유하기",
                        message: "스텝 공고를 공유해보세요!",
                      })
                    }
                  >
                    <ShareArrow width={20} height={20} />
                  </Pressable>
                </Flex>
              }
            />
          </View>

          <ScrollView ref={scrollViewRef}>
            <GehaImage images={data?.representativeImages} />

            <View className='px-4 pt-4'>
              <GehaInfo
                title={data?.title}
                guestHouseName={data?.guestHouseName}
                region={data?.region}
              />
            </View>

            <View className='pt-8'>
              <PressSection
                handleSectionToScroll={handleSectionToScroll}
                selectedSection={selectedSection}
              />
            </View>

            <View className='px-4'>
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
              <View className='pt-10' />

              <Button
                variant='primary'
                height={56}
                content='지원하기'
                textColor='#ffffff'
                onPress={() => requireLogin(() => setIsVisible(true))}
              />

              <StepDetailModal
                isVisible={isVisible}
                onPress={() => setIsVisible(false)}
                isApplicationExist={isApplicationExist}
              />
            </View>
          </ScrollView>
        </>
      )}
    </CustomSafeAreaView>
  );
}
