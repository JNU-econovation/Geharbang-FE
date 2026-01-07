import { router } from 'expo-router';
import { ScrollView, View } from 'react-native';

import Flex from '@/src/components/layout/Flex';
import Button from '@/src/components/ui/Button/Button';
import ItemListContainer from '@/src/components/ui/ItemListContainer';
import { useGuestHouseStep3Validation } from '@/src/hooks/guesthouse/useGuestHouseStep3Validation';
import { useGuestHouseStore } from '@/src/stores/guestHouse/useGuestHouseStore';
import {
  BUTTON_LABELS,
  FORM_DESCRIPTIONS,
  MAX_ITEMS,
} from '@/src/utils/constants/guestHouseEnrollment';

import GuestHouseEnrollLayout from './_components/GuestHouseEnrollLayout';
import NoticeBox from './_components/step3/NoticeBox';
import RoomCard from './_components/step3/RoomCard';

export default function GuestHouseEnrollStep3() {
  const { step3Data, removeRoom } = useGuestHouseStore();
  const { rooms } = step3Data;
  const { errors, validateForm } = useGuestHouseStep3Validation(step3Data);

  const handleNext = () => {
    if (validateForm()) {
      router.push('/guestHouse/enroll/step4');
    }
  };

  return (
    <GuestHouseEnrollLayout currentStep={3} stepTitle="객실 타입 등록">
      <ScrollView className="bg-[#F9FAFB]" style={{ paddingHorizontal: 12 }}>
        <View className="pt-4">
          <View className="gap-5">
            <ItemListContainer
              title="객실 타입"
              description={FORM_DESCRIPTIONS.MAX_10_ITEMS}
              items={rooms}
              emptyIcon="plus-square"
              addIcon="plus-square"
              addButtonLabel={BUTTON_LABELS.ADD_ROOM}
              onAddPress={() => router.push('/guestHouse/enroll/addRoomForm')}
              error={errors.rooms}
              maxItems={MAX_ITEMS.ROOMS}
              renderItem={(room, index) => (
                <RoomCard
                  key={room.id}
                  room={room}
                  isRepresentative={index === 0}
                  onEdit={() => {
                    router.push({
                      pathname: '/guestHouse/enroll/addRoomForm',
                      params: { editId: room.id },
                    });
                  }}
                  onRemove={() => removeRoom(room.id)}
                />
              )}
            />

            <View className="bg-white rounded-[10px] shadow-sm p-6">
              <NoticeBox />
            </View>
          </View>
        </View>
        <Flex items="center">
          <Button
            variant="primary"
            width={370}
            height={50}
            textColor="white"
            content={BUTTON_LABELS.NEXT}
            onPress={handleNext}
            className="mt-4"
          />
        </Flex>
      </ScrollView>
    </GuestHouseEnrollLayout>
  );
}
