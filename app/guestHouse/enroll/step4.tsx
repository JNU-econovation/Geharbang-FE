import { router, useFocusEffect } from "expo-router";
import { useCallback, useRef } from "react";
import { findNodeHandle, ScrollView, View } from "react-native";

import Button from "@/src/components/ui/Button/Button";
import FormSection from "@/src/components/ui/Form/FormSection";
import ItemListContainer from "@/src/components/ui/ItemListContainer";
import { useGuestHouseStep4Validation } from "@/src/hooks/guestHouse/useGuestHouseStep4Validation";
import { useGuestHouseStore } from "@/src/stores/guestHouse/useGuestHouseStore";
import {
  BUTTON_LABELS,
  FORM_DESCRIPTIONS,
  MAX_ITEMS,
} from "@/src/utils/constants/guestHouseEnrollment";
import GuestHouseEnrollLayout from "./_components/GuestHouseEnrollLayout";
import NoticeBox from "./_components/step3/NoticeBox";
import RoomCard from "./_components/step3/RoomCard";

export default function GuestHouseEnrollStep4() {
  const {
    step4Data,
    removeRoom,
    shouldScrollToError,
  } = useGuestHouseStore();
  const { rooms } = step4Data;
  const { errors, validateForm } = useGuestHouseStep4Validation(step4Data);

  const scrollViewRef = useRef<ScrollView>(null);
  const roomsRef = useRef<View>(null);

  const errorsRef = useRef(errors);
  errorsRef.current = errors;

  const validateFormRef = useRef(validateForm);
  validateFormRef.current = validateForm;

  useFocusEffect(
    useCallback(() => {
      if (shouldScrollToError) {
        validateFormRef.current();
        setTimeout(() => {
          const parentHandle = findNodeHandle(scrollViewRef.current);
          if (parentHandle && roomsRef.current) {
            roomsRef.current.measureLayout(
              parentHandle,
              (_x: number, y: number) =>
                scrollViewRef.current?.scrollTo({
                  y: Math.max(0, y - 16),
                  animated: true,
                }),
              () => scrollViewRef.current?.scrollTo({ y: 0, animated: true }),
            );
          } else {
            scrollViewRef.current?.scrollTo({ y: 0, animated: true });
          }
        }, 100);
        return;
      }
    }, [shouldScrollToError]),
  );

  return (
    <GuestHouseEnrollLayout currentStep={4} stepTitle='객실 타입 등록'>
      <ScrollView
        ref={scrollViewRef}
        className='bg-[#F9FAFB]'
        style={{ paddingHorizontal: 12 }}
      >
        <View className='pt-4'>
          <FormSection
            title='객실 타입'
            description={FORM_DESCRIPTIONS.MAX_10_ITEMS}
          >
            <View ref={roomsRef} className='gap-4'>
              <ItemListContainer
                items={rooms}
                emptyIcon='plus-square'
                addIcon='plus-square'
                addButtonLabel={BUTTON_LABELS.ADD_ROOM}
                onAddPress={() => router.push("/guestHouse/enroll/addRoomForm")}
                error={errors.rooms}
                maxItems={MAX_ITEMS.ROOMS}
                renderItem={(room, index) => (
                  <RoomCard
                    key={room.id}
                    room={room}
                    isRepresentative={index === 0}
                    onEdit={() => {
                      router.push({
                        pathname: "/guestHouse/enroll/addRoomForm",
                        params: { editId: room.id },
                      });
                    }}
                    onRemove={() => removeRoom(room.id)}
                  />
                )}
              />
              <NoticeBox />
            </View>
          </FormSection>
        </View>

        <View className='flex-row gap-2 my-4'>
          <Button
            variant='gray'
            height={50}
            textColor='black'
            content='이전'
            onPress={() => router.push("/guestHouse/enroll/step3")}
            className='flex-1'
          />
          <Button
            variant='primary'
            height={50}
            textColor='white'
            content={BUTTON_LABELS.NEXT}
            onPress={() => router.push("/guestHouse/enroll/step5" as any)}
            className='flex-1'
          />
        </View>
      </ScrollView>
    </GuestHouseEnrollLayout>
  );
}
