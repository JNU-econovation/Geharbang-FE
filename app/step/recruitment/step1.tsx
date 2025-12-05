import { router } from "expo-router";
import { useEffect } from "react";
import { ScrollView } from "react-native";

import RecruitmentStepLayout from "@/app/step/recruitment/_components/RecruitmentStepLayout";
import Flex from "@/src/components/layout/Flex";
import Button from "@/src/components/ui/Button/Button";
import FormSection from "@/src/components/ui/Form/FormSection";
import { useStepPostFormValidation } from "@/src/hooks/stepRecruitment/useStepPostFormValidation";
import { useStepPostSlice } from "@/src/stores/slices/stepPost/useStepPostSlice";
import GuestHouseLocation from "./_components/step1/GuestHouseLocation";
import GuestHouseName from "./_components/step1/GuestHouseName";
import WorkingRegion from "./_components/step1/WorkingRegion";

export default function RecruitmentStep1() {
  const { stepPostData, setStepPostData, resetStepPost } = useStepPostSlice();

  useEffect(() => {
    resetStepPost();
  }, [resetStepPost]);

  const { errors, clearError, validateForm } = useStepPostFormValidation(
    stepPostData,
    1
  );

  const handleNext = () => {
    if (validateForm()) {
      router.push("/step/recruitment/step2");
    }
  };

  return (
    <RecruitmentStepLayout currentStep={1} stepTitle='기본 정보'>
      <ScrollView
        className='bg-[#F9FAFB]'
        style={{ paddingTop: 16, paddingHorizontal: 12 }}
      >
        <FormSection title='기본 정보'>
          <GuestHouseName
            value={stepPostData.guestHouseName}
            onChangeText={(text) => {
              setStepPostData("guestHouseName", text);
              clearError("guestHouseName");
            }}
            errorMsg={errors.guestHouseName}
            error={!!errors.guestHouseName}
          />

          <WorkingRegion
            selectedRegion={stepPostData.workingRegion}
            onChangeOption={(region) => {
              setStepPostData("workingRegion", region);
              clearError("workingRegion");
            }}
            errorMsg={errors.workingRegion}
            error={!!errors.workingRegion}
          />

          <GuestHouseLocation
            selectedAddress={stepPostData.location}
            setSelectedAddress={(location) => {
              setStepPostData("location", location);
              clearError("location");
            }}
            errorMsg={errors.location}
            error={!!errors.location}
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
