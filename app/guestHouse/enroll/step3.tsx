import { Feather } from '@expo/vector-icons';
import { router } from 'expo-router';
import { ScrollView, Text, TouchableOpacity, View } from 'react-native';

import Flex from '@/src/components/layout/Flex';
import Button from '@/src/components/ui/Button/Button';
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
          <View className="bg-white rounded-[10px] shadow-sm p-6 gap-5">
            <View>
              <View className="flex-row items-center mb-1">
                <Text className="text-[#101828] text-lg font-bold">
                  객실 타입{' '}
                </Text>
                <Text className="text-primary-red text-lg font-bold">*</Text>
              </View>
              <Text className="text-[#6a7282] text-xs">
                {FORM_DESCRIPTIONS.MAX_10_ITEMS}
              </Text>
            </View>

            {errors.rooms && (
              <View className="bg-red-50 border border-red-200 rounded-lg p-3">
                <Text className="text-red-600 text-sm">{errors.rooms}</Text>
              </View>
            )}

            {rooms.length === 0 ? (
              <TouchableOpacity
                className="w-full h-48 bg-sky-50 rounded-xl border-2 border-dashed border-sky-200 flex justify-center items-center gap-3"
                activeOpacity={0.7}
                onPress={() => router.push('/guestHouse/enroll/addRoomForm')}
              >
                <Feather name="plus-square" size={32} color="#0ea5e9" />
                <Text className="text-sky-600 text-sm font-medium">
                  {BUTTON_LABELS.ADD_ROOM}
                </Text>
              </TouchableOpacity>
            ) : (
              <>
                {rooms.map((room, index) => (
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
                ))}

                <TouchableOpacity
                  className="w-full h-12 bg-sky-50 rounded-xl border border-sky-500 flex-row justify-center items-center gap-2"
                  activeOpacity={0.7}
                  onPress={() => router.push('/guestHouse/enroll/addRoomForm')}
                >
                  <Feather name="plus-square" size={18} color="#0ea5e9" />
                  <Text className="text-sky-500 text-sm font-medium">
                    {BUTTON_LABELS.ADD_ROOM}
                  </Text>
                </TouchableOpacity>
              </>
            )}

            <NoticeBox />
          </View>
        </View>
        <Flex items="center">
          <Button
            variant="primary"
            width={360}
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
