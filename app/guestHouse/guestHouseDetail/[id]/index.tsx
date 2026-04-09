import { ActivityIndicator, ScrollView, View } from "react-native";

import GehaImage from "@/app/step/stepDetail/_components/GehaInfo/GehaImage";
import GehaInfo from "@/app/step/stepDetail/_components/GehaInfo/GehaInfo";
import PressSection from "@/app/step/stepDetail/_components/PressSection/PressSection";
import CustomSafeAreaView from "@/src/components/layout/CustomSafeAreaView";
import Address from "@/src/components/ui/Address/Address";
import Button from "@/src/components/ui/Button/Button";
import Contact from "@/src/components/ui/Contact";
import DetailPageBackArrow from "@/src/components/ui/DetailPageBackArrow";
import TextSize from "@/src/components/ui/TextSize";
import { useHandleSection } from "@/src/hooks/common/useHandleSection";
import { useSectionToScroll } from "@/src/hooks/common/useSectionToScroll";
import { useGuestHouseDetail } from "@/src/hooks/guestHouseDetail/useGuestHouseDetail";
import { GUESTHOUSE } from "@/src/utils/constants/pressSection";
import GuestHouseInfo from "../_components/GuestHouseInfo";
import GuestHouseIntro from "../_components/GuestHouseIntro";
import GuestHouseParty from "../_components/GuestHouseParty";
import ParlorType from "../_components/ParlorType";

export default function GuestHouseDetail() {
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

  const { data, isPending, isError, refetch } = useGuestHouseDetail();

  return (
    <CustomSafeAreaView pageColor='bg-white'>
      <View className='px-4 pt-3 pb-6'>
        <DetailPageBackArrow
          content='게스트하우스 상세'
          shareTitle='게스트하우스 공유하기'
          shareMessage='게스트하우스를 공유해보세요!'
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
        <>
          <ScrollView ref={scrollViewRef} stickyHeaderIndices={[2]}>
            <GehaImage images={data?.imageUrls} height={280} page={true} />

            <View className='px-4 pt-4 pb-8'>
              <GehaInfo title={data?.guestHouseName} region={data?.region} />
            </View>

            <View
              className='bg-white border-b border-gray-100'
              onLayout={(e) =>
                setStickyHeaderHeight(e.nativeEvent.layout.height)
              }
            >
              <PressSection
                items={GUESTHOUSE}
                handleSectionToScroll={handleSectionToScroll}
                selectedSection={selectedSection}
              />
            </View>

            <View
              className='px-4'
              onLayout={(e) => setContainerOffset(e.nativeEvent.layout.y)}
            >
              <View className='pt-10' />
              <Address
                setSectionYPositions={setSectionYPositions}
                location={data?.location}
              />

              <View className='pt-10' />
              <ParlorType
                setSectionYPositions={setSectionYPositions}
                parlorType={data?.rooms}
              />

              <View className='pt-10' />
              <GuestHouseIntro
                setSectionYPositions={setSectionYPositions}
                introduction={data?.introduction}
              />

              <View className='pt-10' />
              <GuestHouseInfo
                setSectionYPositions={setSectionYPositions}
                amenities={data?.amenities}
                moods={data?.moods}
              />

              <View className='pt-10' />
              <GuestHouseParty
                setSectionYPositions={setSectionYPositions}
                parties={data?.parties}
              />

              <View className='pt-6' />
              <Contact
                setSectionYPositions={setSectionYPositions}
                contact={data?.contact}
                owerMessage={data?.ownerMessage}
              />
            </View>
          </ScrollView>
        </>
      )}
    </CustomSafeAreaView>
  );
}
