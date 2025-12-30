import CustomSafeAreaView from "@/src/components/layout/CustomSafeAreaView";
import { ScrollView, View } from "react-native";

import GehaImage from "@/app/step/stepDetail/_components/GehaInfo/GehaImage";
import GehaInfo from "@/app/step/stepDetail/_components/GehaInfo/GehaInfo";

import PressSection from "@/app/step/stepDetail/_components/PressSection/PressSection";
import DetailPageBackArrow from "@/src/components/ui/DetailPageBackArrow";
import { useHandleSection } from "@/src/hooks/stepDetail/useHandleSection";
import { useSectionToScroll } from "@/src/hooks/stepDetail/useSectionToScroll";
import { GUESTHOUSE } from "@/src/utils/constants/pressSection";

export default function GuestHouseDetail() {
  const { scrollViewRef, setSectionYPositions, sectionToScroll } =
    useSectionToScroll();
  const { selectedSection, handleSectionToScroll } = useHandleSection({
    sectionToScroll,
  });

  return (
    <CustomSafeAreaView pageColor='bg-white'>
      <>
        <View className='px-4 pt-3 pb-6'>
          <DetailPageBackArrow
            content='게스트하우스 상세'
            shareTitle='게스트하우스 공유하기'
            shareMessage='게스트하우스를 공유해보세요!'
          />
        </View>

        <ScrollView ref={scrollViewRef}>
          <GehaImage />

          <View className='px-4 pt-4'>
            <GehaInfo title='제주 바다뷰 게스트하우스' region='제주시' />
          </View>

          <View className='pt-8'>
            <PressSection
              items={GUESTHOUSE}
              handleSectionToScroll={handleSectionToScroll}
              selectedSection={selectedSection}
            />
          </View>
        </ScrollView>
      </>
    </CustomSafeAreaView>
  );
}
