import { router, useFocusEffect } from "expo-router";
import React, { ReactNode, useCallback, useState } from "react";
import { BackHandler, View } from "react-native";

import CustomSafeAreaView from "@/src/components/layout/CustomSafeAreaView";
import BackArrowHeader from "@/src/components/ui/BackArrowHeader";
import StepProgressBar from "@/src/components/ui/Form/StepProgressBar";
import {CloseableConfirmModal} from "@/src/components/ui/Modal/CloseableConfirmModal";
import { useStepRecruitmentStore } from "@/src/stores/stepRecruitment/useStepRecruitmentStore";

interface RecruitmentStepLayoutProps {
  currentStep: number;
  stepTitle?: string;
  children?: ReactNode;
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

const isFormEmpty = () => {
  const s = useStepRecruitmentStore.getState();
  const wtw = s.step2Data.workingTimeAndWork;
  const isWtwEmpty =
    wtw.length === 0 ||
    (wtw.length === 1 &&
      !wtw[0].workingTimeName &&
      !wtw[0].thatTimeWork &&
      !wtw[0].perWorkingDay &&
      !wtw[0].workingCount &&
      !wtw[0].closedCount);
  return (
    !s.step1Data.guestHouseName &&
    !s.step1Data.workingRegion &&
    !s.step1Data.location &&
    !s.step2Data.workingStartDate &&
    s.step2Data.workingPeriod === "" &&
    isWtwEmpty &&
    s.step2Data.gender === "" &&
    !s.step3Data.title &&
    !s.step3Data.introduction &&
    s.step3Data.mainImageFiles.length === 0 &&
    s.step3Data.introImageFiles.length === 0 &&
    s.step3Data.advantages.length === 0 &&
    s.step3Data.employeeBenefits.length === 0 &&
    !s.step4Data.instagram &&
    !s.step4Data.phone &&
    !s.step4Data.email &&
    !s.step4Data.website &&
    !s.step4Data.ownerMessage &&
    s.step5Data.questions.length === 0
  );
};

export default function RecruitmentStepLayout({
  currentStep,
  children,
}: RecruitmentStepLayoutProps) {
  const { resetAllData } = useStepRecruitmentStore();
  const [isExitModalVisible, setIsExitModalVisible] = useState(false);

  const handleHeaderBackPress = useCallback(() => {
    if (isFormEmpty()) {
      resetAllData();
      router.replace("/");
    } else {
      setIsExitModalVisible(true);
    }
  }, [resetAllData]);

  const handleAndroidBack = useCallback(() => {
    if (currentStep === 1) {
      handleHeaderBackPress();
    } else {
      router.push(STEP_ROUTES[currentStep - 2]);
    }
    return true;
  }, [currentStep, handleHeaderBackPress]);

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
      <CustomSafeAreaView pageColor='bg-[#F9FAFB]'>
        <View className='p-3'>
          <BackArrowHeader
            content='스텝 공고 올리기'
            onPress={handleHeaderBackPress}
          />
        </View>

        <StepProgressBar
          tabs={STEP_TABS}
          currentStep={currentStep}
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
