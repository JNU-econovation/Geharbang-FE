import { router } from "expo-router";
import { ScrollView, View } from "react-native";

import Button from "@/src/components/ui/Button/Button";
import FormSection from "@/src/components/ui/Form/FormSection";
import ItemListContainer from "@/src/components/ui/ItemListContainer";
import { useGuestHouseStore } from "@/src/stores/guestHouse/useGuestHouseStore";
import {
  FORM_DESCRIPTIONS,
  MAX_ITEMS,
} from "@/src/utils/constants/guestHouseEnrollment";
import GuestHouseEnrollLayout from "./_components/GuestHouseEnrollLayout";
import PartyCard from "./_components/step2/PartyCard";

export default function GuestHouseEnrollStep3() {
  const { step3Data, removeParty } = useGuestHouseStore();
  const { parties } = step3Data;

  return (
    <GuestHouseEnrollLayout currentStep={3} stepTitle='파티 등록'>
      <ScrollView className='bg-[#F9FAFB]' style={{ paddingHorizontal: 12 }}>
        <View className='pt-4'>
          <FormSection
            title='파티'
            description={`${FORM_DESCRIPTIONS.MAX_10_ITEMS} (선택)`}
          >
            <ItemListContainer
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
          </FormSection>
        </View>

        <View className='flex-row gap-2 my-4'>
          <Button
            variant='gray'
            height={50}
            textColor='black'
            content='이전'
            onPress={() => router.push("/guestHouse/enroll/step2")}
            className='flex-1'
          />
          <Button
            variant='primary'
            height={50}
            textColor='white'
            content='다음'
            onPress={() => router.push("/guestHouse/enroll/step4")}
            className='flex-1'
          />
        </View>
      </ScrollView>
    </GuestHouseEnrollLayout>
  );
}
