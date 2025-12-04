import { router } from "expo-router";
import React from "react";
import { ScrollView, View } from "react-native";

import RecruitmentStepLayout from "@/app/step/recruitment/_components/RecruitmentStepLayout";
import Flex from "@/src/components/layout/Flex";
import Button from "@/src/components/ui/Button/Button";
import FormSection from "@/src/components/ui/Form/FormSection";
import { useStepPostFormValidation } from "@/src/hooks/stepPost/useStepPostFormValidation";
import { useStepPostSlice } from "@/src/stores/slices/stepPost/useStepPostSlice";
import StepPostGender from "./_components/step2/StepPostGender";
import WorkingPeriod from "./_components/step2/WorkingPeriod";
import WorkingStartDate from "./_components/step2/WorkingStartDate";
import WorkingTimeAndWorkList from "./_components/step2/WorkingTimeAndWorkList";

export default function RecruitmentStep2() {
  const { stepPostData, setStepPostData } = useStepPostSlice();

  const { errors, clearError, validateForm } = useStepPostFormValidation(
    stepPostData,
    2
  );

  const handleNext = () => {
    if (validateForm()) {
      router.push("/step/recruitment/step3");
    }
  };

  return (
    <RecruitmentStepLayout currentStep={2} stepTitle='근무 정보'>
      <ScrollView
        className='bg-[#F9FAFB]'
        style={{ paddingTop: 16, paddingHorizontal: 12 }}
      >
        <FormSection title='근무 정보'>
          <WorkingStartDate
            selectedDate={stepPostData.workingStartDate}
            setSelectedDate={(date) => {
              setStepPostData("workingStartDate", date);
              clearError("workingStartDate");
            }}
            errorMsg={errors.workingStartDate}
            error={!!errors.workingStartDate}
          />

          <View className='pt-1' />
          <WorkingPeriod
            selectedPeriod={stepPostData.workingPeriod}
            setSelectedPeriod={(period) => {
              setStepPostData("workingPeriod", period);
              clearError("workingPeriod");
            }}
            errorMsg={errors.workingPeriod}
            error={!!errors.workingPeriod}
          />

          <View className='pt-1' />
          <WorkingTimeAndWorkList
            workingTimeAndWorkList={stepPostData.workingTimeAndWork}
            setWorkingTimeAndWorkList={(workingTimeAndWork) => {
              setStepPostData("workingTimeAndWork", workingTimeAndWork);
              clearError("workingTimeAndWork");
            }}
            errors={errors}
          />

          <StepPostGender
            selectedGender={stepPostData.gender}
            setSelectedGender={(gender) => {
              setStepPostData("gender", gender);
              clearError("gender");
            }}
            errorMsg={errors.gender}
            error={!!errors.gender}
          />
        </FormSection>

        <Flex items='center'>
          <Button
            variant='primary'
            width={370}
            height={50}
            textColor='white'
            content='다음'
            onPress={handleNext}
            className='mt-4'
          />
        </Flex>
      </ScrollView>
    </RecruitmentStepLayout>
  );
}
