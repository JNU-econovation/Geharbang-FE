import { Pressable, ScrollView, Share, View } from "react-native";

import ShareArrow from "@/public/svgs/StepDetail/shareArrow.svg";
import Streamed from "@/public/svgs/StepDetail/steamed.svg";

import CustomSafeAreaView from "@/src/components/layout/CustomSafeAreaView";
import Flex from "@/src/components/layout/Flex/Flex";
import BackArrorHeader from "@/src/components/ui/BackArrowHeader";
import Button from "@/src/components/ui/Button/Button";
import { useHandleSection } from "@/src/hooks/stepDetail/useHandleSection";
import { useSectionToScroll } from "@/src/hooks/stepDetail/useSectionToScroll";

import Address from "./_components/Address/Address";
import Contact from "./_components/Contact/Contact";
import Feature from "./_components/Feature/Feature";
import GehaImage from "./_components/GehaInfo/GehaImage";
import GehaInfo from "./_components/GehaInfo/GehaInfo";
import Intro from "./_components/Intro/Intro";
import PressSection from "./_components/PressSection/PressSection";
import WorkDate from "./_components/WorkDate/WorkDate";
import WorkInfo from "./_components/WorkInfo/WorkInfo";

export default function StepDetail() {
  const { scrollViewRef, setSectionYPositions, sectionToScroll } =
    useSectionToScroll();

  const { selectedSection, handleSectionToScroll } = useHandleSection({
    sectionToScroll,
  });

  return (
    <CustomSafeAreaView pageColor='bg-white'>
      <View className='px-4 pt-3 pb-6'>
        <BackArrorHeader
          content='스텝 공고 상세'
          icon={
            <Flex items='center' justify='center' dir='row' gap={20}>
              <Streamed width={20} height={20} />
              <Pressable
                onPress={async () => await Share.share({ message: "공유하기" })}
              >
                <ShareArrow width={20} height={20} />
              </Pressable>
            </Flex>
          }
        />
      </View>

      {/* FlatList로 바꿀 예정 */}
      <ScrollView ref={scrollViewRef}>
        <GehaImage />

        <View className='px-4 pt-4'>
          <GehaInfo />
        </View>

        <View className='pt-8' />
        <PressSection
          handleSectionToScroll={handleSectionToScroll}
          selectedSection={selectedSection}
        />

        <View className='px-4'>
          <View className='pt-10' />
          <Address setSectionYPositions={setSectionYPositions} />

          <View className='pt-10' />
          <WorkInfo setSectionYPositions={setSectionYPositions} />

          <View className='pt-10' />
          <WorkDate setSectionYPositions={setSectionYPositions} />

          <View className='pt-10' />
          <Intro setSectionYPositions={setSectionYPositions} />

          <View className='pt-10' />
          <Feature setSectionYPositions={setSectionYPositions} />

          <View className='pt-10' />
          <Contact setSectionYPositions={setSectionYPositions} />
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
