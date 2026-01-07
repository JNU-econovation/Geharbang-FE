import { ScrollView, View } from "react-native";

import GehaImage from "@/app/step/stepDetail/_components/GehaInfo/GehaImage";
import GehaInfo from "@/app/step/stepDetail/_components/GehaInfo/GehaInfo";
import PressSection from "@/app/step/stepDetail/_components/PressSection/PressSection";
import CustomSafeAreaView from "@/src/components/layout/CustomSafeAreaView";
import Address from "@/src/components/ui/Address/Address";
import Contact from "@/src/components/ui/Contact";
import DetailPageBackArrow from "@/src/components/ui/DetailPageBackArrow";
import { useHandleSection } from "@/src/hooks/stepDetail/useHandleSection";
import { useSectionToScroll } from "@/src/hooks/stepDetail/useSectionToScroll";
import { GUESTHOUSE } from "@/src/utils/constants/pressSection";
import GuestHouseInfo from "../_components/GuestHouseInfo";
import GuestHouseIntro from "../_components/GuestHouseIntro";
import GuestHouseParty from "../_components/GuestHouseParty";
import ParlorType from "../_components/ParlorType";

export default function GuestHouseDetail() {
  const { scrollViewRef, setSectionYPositions, sectionToScroll } =
    useSectionToScroll();
  const { selectedSection, handleSectionToScroll } = useHandleSection({
    sectionToScroll,
  });

  const data = {
    imgs: [
      require("@/public/images/test2.png"),
      require("@/public/images/test2.png"),
    ],
  };
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
          <GehaImage images={data.imgs} height={280} page={true} />

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

          <View className='px-4'>
            <View className='pt-10' />
            <Address
              setSectionYPositions={setSectionYPositions}
              location={{
                address: "제주시",
                coordinates: [126.19238467, 36.28267316123],
              }}
            />

            <View className='pt-10' />
            <ParlorType setSectionYPositions={setSectionYPositions} />

            <View className='pt-10' />
            <GuestHouseIntro setSectionYPositions={setSectionYPositions} />

            <View className='pt-10' />
            <GuestHouseInfo setSectionYPositions={setSectionYPositions} />

            <View className='pt-10' />
            <GuestHouseParty setSectionYPositions={setSectionYPositions} />

            <View className='pt-6' />
            <Contact
              setSectionYPositions={setSectionYPositions}
              contact={{
                instagramId: "인스타아이디",
                phoneNumber: "010-1111-1111",
                webSite: "웹사이트 주소",
              }}
              owerMessage='안녕하세요?'
            />
          </View>
        </ScrollView>
      </>
    </CustomSafeAreaView>
  );
}
