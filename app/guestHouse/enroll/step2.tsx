import { router, useFocusEffect } from "expo-router";
import { useCallback, useRef } from "react";
import { BackHandler, ScrollView } from "react-native";

import GuestHouseEnrollLayout from "@/app/guestHouse/enroll/_components/GuestHouseEnrollLayout";
import Flex from "@/src/components/layout/Flex";
import Button from "@/src/components/ui/Button/Button";
import FormField from "@/src/components/ui/Form/FormField";
import FormSection from "@/src/components/ui/Form/FormSection";
import MultiImagePicker from "@/src/components/ui/imagePicker/MultiImagePicker";
import TextInput from "@/src/components/ui/TextInput";
import { useGuestHouseStore } from "@/src/stores/guestHouse/useGuestHouseStore";
import {
  BUTTON_LABELS,
  FORM_DESCRIPTIONS,
  INPUT_HEIGHTS,
  PLACEHOLDERS,
  VALIDATION_LIMITS,
} from "@/src/utils/constants/guestHouseEnrollment";

import { useGuestHouseStep2Validation } from "@/src/hooks/guestHouse/useGuestHouseStep2Validation";
import AtmosphereSelector from "./_components/step2/AtmosphereSelector";
import FacilitiesForm from "./_components/step2/FacilitiesForm";

export default function GuestHouseEnrollStep2() {
  const { step2Data, setStep2Update } = useGuestHouseStore();
  const scrollViewRef = useRef<ScrollView>(null);

  const { errors, validateForm, clearError } =
    useGuestHouseStep2Validation(step2Data);

  const handleNext = () => {
    if (validateForm()) {
      router.push("/guestHouse/enroll/step3");
    }
  };

  const handleBackPress = useCallback(() => {
    router.push("/guestHouse/enroll/step1");
    return true;
  }, []);

  useFocusEffect(
    useCallback(() => {
      const subscription = BackHandler.addEventListener(
        "hardwareBackPress",
        handleBackPress
      );

      return () => subscription.remove();
    }, [handleBackPress])
  );

  return (
    <GuestHouseEnrollLayout
      currentStep={2}
      stepTitle='게스트하우스 소개'
      onBackPress={handleBackPress}
    >
      <ScrollView
        ref={scrollViewRef}
        className='bg-[#F9FAFB]'
        style={{ paddingTop: 16, paddingHorizontal: 12 }}
        contentContainerStyle={{ paddingBottom: 100 }}
      >
        <FormSection
          title='게스트하우스 소개'
          description={FORM_DESCRIPTIONS.GUESTHOUSE_INTRO}
        >
          <FormField
            label='게스트하우스 대표 사진'
            required={true}
            description={FORM_DESCRIPTIONS.MAX_10_IMAGES}
            errorMessage={errors.mainImages}
          >
            <MultiImagePicker
              selectedImageFiles={step2Data.mainImages}
              setSelectedImageFiles={(files) =>
                setStep2Update("mainImages", files)
              }
              maxCount={VALIDATION_LIMITS.MAIN_IMAGES.MAX}
              error={!!errors.mainImages}
              clearError={() => clearError("mainImages")}
            />
          </FormField>

          <FormField
            label='소개글'
            required={true}
            errorMessage={errors.introduction}
          >
            <TextInput
              value={step2Data.introduction}
              onChangeText={(text) => {
                setStep2Update("introduction", text);
                clearError("introduction");
              }}
              placeholder={PLACEHOLDERS.INTRODUCTION}
              error={!!errors.introduction}
              multiline={true}
              height={INPUT_HEIGHTS.INTRODUCTION}
            />
          </FormField>
          <FacilitiesForm
            errors={{ facilities: errors.facilities }}
            clearError={() => clearError("facilities")}
          />
          <AtmosphereSelector
            error={errors.atmosphere}
            clearError={() => clearError("atmosphere")}
          />
        </FormSection>

        <Flex items='center'>
          <Button
            variant='primary'
            width={360}
            height={50}
            textColor='white'
            content={BUTTON_LABELS.NEXT}
            onPress={handleNext}
            className='mt-4'
          />
        </Flex>
      </ScrollView>
    </GuestHouseEnrollLayout>
  );
}
