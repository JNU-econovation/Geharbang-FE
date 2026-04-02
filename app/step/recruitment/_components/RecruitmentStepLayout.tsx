import CustomSafeAreaView from "@/src/components/layout/CustomSafeAreaView";
import BackArrowHeader from "@/src/components/ui/BackArrowHeader";
import StepProgressBar from "@/src/components/ui/Form/StepProgressBar";
import { router } from "expo-router";
import React, { ReactNode } from "react";
import { View } from "react-native";

interface RecruitmentStepLayoutProps {
  currentStep: number;
  stepTitle?: string;
  children?: ReactNode;
  onBackPress?: () => void;
}

const STEP_TABS = [
  { label: "기본 정보" },
  { label: "근무 정보" },
  { label: "소개" },
  { label: "연락처" },
  { label: "추가 질문" },
];

const STEP_ROUTES = [
  "/step/recruitment/step1",
  "/step/recruitment/step2",
  "/step/recruitment/step3",
  "/step/recruitment/step4",
  "/step/recruitment/step5",
] as const;

export default function RecruitmentStepLayout({
  currentStep,
  children,
  onBackPress,
}: RecruitmentStepLayoutProps) {
  const handleTabPress = (index: number) => {
    router.navigate(STEP_ROUTES[index] as any);
  };

  return (
    <>
      <CustomSafeAreaView pageColor='bg-[#F9FAFB]'>
        <View className='p-3'>
          <BackArrowHeader content='스텝 공고 올리기' onPress={onBackPress} />
        </View>

        <StepProgressBar
          tabs={STEP_TABS}
          currentStep={currentStep}
          onTabPress={handleTabPress}
        />

        <View className='flex-1 bg-[#F9FAFB]'>{children}</View>
      </CustomSafeAreaView>
    </>
  );
}
