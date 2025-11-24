import { Pressable, ScrollView, Share, View } from "react-native";

import ShareArrow from "@/public/svgs/StepDetail/shareArrow.svg";
import Streamed from "@/public/svgs/StepDetail/steamed.svg";

import CustomSafeAreaView from "@/src/components/layout/CustomSafeAreaView";
import Flex from "@/src/components/layout/Flex/Flex";
import BackArrorHeader from "@/src/components/ui/BackArrowHeader";
import Button from "@/src/components/ui/Button/Button";
import { useHandleSection } from "@/src/hooks/stepDetail/useHandleSection";
import { useSectionToScroll } from "@/src/hooks/stepDetail/useSectionToScroll";
import { useStepDetail } from "@/src/hooks/stepDetail/useStepDetail";

import Address from "./_components/Address/Address";
import Contact from "./_components/Contact/Contact";
import Feature from "./_components/Feature/Feature";
import GehaImage from "./_components/GehaInfo/GehaImage";
import GehaInfo from "./_components/GehaInfo/GehaInfo";
import Intro from "./_components/Intro/Intro";
import PressSection from "./_components/PressSection/PressSection";
import WorkInfo from "./_components/WorkInfo/WorkInfo";

export default function StepDetail() {
  const { scrollViewRef, setSectionYPositions, sectionToScroll } =
    useSectionToScroll();

  const { selectedSection, handleSectionToScroll } = useHandleSection({
    sectionToScroll,
  });

  const { data } = useStepDetail();

  return (
    <CustomSafeAreaView pageColor='bg-white'>
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
            guesthouseName={data?.guesthouseName}
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
          />
        </View>
      </ScrollView>
    </CustomSafeAreaView>
  );
}
