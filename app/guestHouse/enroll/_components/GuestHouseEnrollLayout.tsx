import { router, useFocusEffect } from "expo-router";
import React, { ReactNode, useCallback, useState } from "react";
import { BackHandler, View } from "react-native";

import CustomSafeAreaView from "@/src/components/layout/CustomSafeAreaView";
import BackArrowHeader from "@/src/components/ui/BackArrowHeader";
import StepProgressBar from "@/src/components/ui/Form/StepProgressBar";
import {CloseableConfirmModal} from "@/src/components/ui/Modal/CloseableConfirmModal";
import { useGuestHouseStore } from "@/src/stores/guestHouse/useGuestHouseStore";

interface GuestHouseEnrollLayoutProps {
  currentStep: number;
  stepTitle?: string;
  children?: ReactNode;
}

const STEP_TABS = [
  { label: "기본 정보" },
  { label: "소개" },
  { label: "파티" },
  { label: "객실" },
  { label: "연락처" },
];

const STEP_ROUTES = [
  "/guestHouse/enroll/step1",
  "/guestHouse/enroll/step2",
  "/guestHouse/enroll/step3",
  "/guestHouse/enroll/step4",
  "/guestHouse/enroll/step5",
] as const;

const isFormEmpty = () => {
  const s = useGuestHouseStore.getState();
  return (
    !s.step1Data.guestHouseName &&
    !s.step1Data.workingRegion &&
    !s.step1Data.location &&
    s.step2Data.mainImages.length === 0 &&
    !s.step2Data.introduction &&
    s.step2Data.facilities.length === 0 &&
    s.step2Data.atmosphere.length === 0 &&
    s.step3Data.parties.length === 0 &&
    s.step4Data.rooms.length === 0 &&
    !s.step5Data.instagram &&
    !s.step5Data.phone &&
    !s.step5Data.website &&
    !s.step5Data.reservationUrl &&
    !s.step5Data.ownerMessage
  );
};

export default function GuestHouseEnrollLayout({
  currentStep,
  children,
}: GuestHouseEnrollLayoutProps) {
  const { resetAllData, editingId } = useGuestHouseStore();
  const [isExitModalVisible, setIsExitModalVisible] = useState(false);

  const handleHeaderBackPress = useCallback(() => {
    if (editingId) {
      resetAllData();
      router.navigate("/my/guestHouse");
      return;
    }
    if (isFormEmpty()) {
      resetAllData();
      router.replace("/");
    } else {
      setIsExitModalVisible(true);
    }
  }, [resetAllData, editingId]);

  const handleAndroidBack = useCallback(() => {
    if (editingId) {
      resetAllData();
      router.navigate("/my/guestHouse");
      return true;
    }
    if (currentStep === 1) {
      handleHeaderBackPress();
    } else {
      router.push(STEP_ROUTES[currentStep - 2] as any);
    }
    return true;
  }, [currentStep, handleHeaderBackPress, editingId, resetAllData]);

  useFocusEffect(
    useCallback(() => {
      const subscription = BackHandler.addEventListener(
        "hardwareBackPress",
        handleAndroidBack,
      );
      return () => subscription.remove();
    }, [handleAndroidBack]),
  );

  const handleTabPress = (index: number) => {
    router.navigate(STEP_ROUTES[index] as any);
  };

  return (
    <>
      <CustomSafeAreaView pageColor='bg-white'>
        <View className='p-3'>
          <BackArrowHeader
            content='게스트 하우스 올리기'
            onPress={handleHeaderBackPress}
          />
        </View>

        <StepProgressBar
          tabs={STEP_TABS}
          currentStep={
            currentStep > STEP_TABS.length ? STEP_TABS.length : currentStep
          }
          onTabPress={handleTabPress}
        />

        <View className='flex-1 bg-[#F9FAFB]'>{children}</View>
      </CustomSafeAreaView>

      <CloseableConfirmModal
        isVisible={isExitModalVisible}
        title='등록을 나가시겠어요?'
        description={
          "임시저장 후 나중에 이어서 작성하거나,\n처음부터 다시 시작할 수 있어요."
        }
        onClose={() => setIsExitModalVisible(false)}
        leftAction={{
          label: "임시저장",
          onPress: () => {
            setIsExitModalVisible(false);
            router.replace("/");
          },
        }}
        rightAction={{
          label: "나가기",
          onPress: () => {
            setIsExitModalVisible(false);
            resetAllData();
            router.replace("/");
          },
          variant: "red",
        }}
      />
    </>
  );
}
