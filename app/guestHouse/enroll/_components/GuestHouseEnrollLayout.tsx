import CustomSafeAreaView from "@/src/components/layout/CustomSafeAreaView";
import BackArrowHeader from "@/src/components/ui/BackArrowHeader";
import StepProgressBar from "@/src/components/ui/Form/StepProgressBar";
import { router } from "expo-router";
import React, { ReactNode } from "react";
import { View } from "react-native";

interface GuestHouseEnrollLayoutProps {
  currentStep: number;
  stepTitle?: string;
  children?: ReactNode;
  onBackPress?: () => void;
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

export default function GuestHouseEnrollLayout({
  currentStep,
  children,
  onBackPress,
}: GuestHouseEnrollLayoutProps) {
  const handleTabPress = (index: number) => {
    router.navigate(STEP_ROUTES[index] as any);
  };

  return (
    <>
      <CustomSafeAreaView pageColor='bg-white'>
        <View className='p-3'>
          <BackArrowHeader
            content='게스트 하우스 올리기'
            onPress={onBackPress}
          />
        </View>

        <StepProgressBar
          tabs={STEP_TABS}
          currentStep={currentStep > STEP_TABS.length ? STEP_TABS.length : currentStep}
          onTabPress={handleTabPress}
        />

        <View className='flex-1 bg-[#F9FAFB]'>{children}</View>
      </CustomSafeAreaView>
    </>
  );
}
