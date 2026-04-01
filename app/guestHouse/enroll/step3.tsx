import { router, useFocusEffect } from "expo-router";
import { useCallback } from "react";
import { BackHandler, ScrollView, View } from "react-native";

import Flex from "@/src/components/layout/Flex";
import Button from "@/src/components/ui/Button/Button";
import ItemListContainer from "@/src/components/ui/ItemListContainer";
import { useGuestHouseStore } from "@/src/stores/guestHouse/useGuestHouseStore";
import {
  BUTTON_LABELS,
  MAX_ITEMS,
} from "@/src/utils/constants/guestHouseEnrollment";

import GuestHouseEnrollLayout from "./_components/GuestHouseEnrollLayout";
import PartyCard from "./_components/step2/PartyCard";

export default function GuestHouseEnrollStep3() {
  const { step3Data, removeParty } = useGuestHouseStore();
  const { parties } = step3Data;

  const handleNext = () => {
    router.push("/guestHouse/enroll/step4");
  };

  const handleBackPress = useCallback(() => {
    router.push("/guestHouse/enroll/step2");
    return true;
  }, []);

  useFocusEffect(
    useCallback(() => {
      const subscription = BackHandler.addEventListener(
        "hardwareBackPress",
        handleBackPress
      );

      return () => subscription.remove();
    }, [handleBackPress])
  );

  return (
    <GuestHouseEnrollLayout
      currentStep={3}
      stepTitle='파티 등록'
      onBackPress={handleBackPress}
    >
      <ScrollView className='bg-[#F9FAFB]' style={{ paddingHorizontal: 12 }}>
        <View className='pt-4'>
          <ItemListContainer
            title='파티'
            description='최대 10개까지 등록할 수 있습니다'
            items={parties}
            emptyIcon='plus-square'
            addIcon='plus-square'
            addButtonLabel='파티 추가'
            onAddPress={() => router.push("/guestHouse/enroll/makeParty")}
            maxItems={MAX_ITEMS.PARTIES}
            renderItem={(party, index) => (
              <PartyCard
                key={party.id}
                party={party}
                isRepresentative={index === 0}
                onEdit={() => {
                  router.push({
                    pathname: "/guestHouse/enroll/makeParty",
                    params: { editId: party.id },
                  });
                }}
                onDelete={() => removeParty(party.id)}
              />
            )}
          />
        </View>
        <Flex items='center'>
          <Button
            variant='primary'
            width={370}
            height={50}
            textColor='white'
            content={BUTTON_LABELS.NEXT}
            onPress={handleNext}
            className='mt-4'
          />
        </Flex>
      </ScrollView>
    </GuestHouseEnrollLayout>
  );
}
