import { router } from "expo-router";
import { useEffect } from "react";
import { ScrollView } from "react-native";

import RecruitmentStepLayout from "@/app/step/recruitment/_components/RecruitmentStepLayout";
import Flex from "@/src/components/layout/Flex";
import Button from "@/src/components/ui/Button/Button";
import FormSection from "@/src/components/ui/Form/FormSection";
import { useStep1FormValidation } from "@/src/hooks/stepRecruitment/useStep1Valication";
import { useStepRecruitmentStore } from "@/src/stores/stepRecruitment/useStepRecruitmentStore";
import GuestHouseLocation from "./_components/step1/GuestHouseLocation";
import GuestHouseName from "./_components/step1/GuestHouseName";
import WorkingRegion from "./_components/step1/WorkingRegion";

export default function RecruitmentStep1() {
  const { step1Data, setStep1Update, resetAllData } = useStepRecruitmentStore();

  useEffect(() => {
    resetAllData();
  }, []);

  const { errors, validateForm, clearError } =
    useStep1FormValidation(step1Data);

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
            value={step1Data.guestHouseName}
            onChangeText={(text) => {
              setStep1Update("guestHouseName", text);
              clearError("guestHouseName");
            }}
            errorMsg={errors.guestHouseName}
            error={!!errors.guestHouseName}
          />

          <WorkingRegion
            selectedRegion={step1Data.workingRegion}
            onChangeOption={(region) => {
              setStep1Update("workingRegion", region);
              clearError("workingRegion");
            }}
            errorMsg={errors.workingRegion}
            error={!!errors.workingRegion}
          />

          <GuestHouseLocation
            selectedAddress={step1Data.location}
            setSelectedAddress={(location) => {
              setStep1Update("location", location);
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
