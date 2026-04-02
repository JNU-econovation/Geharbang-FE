import { router, useFocusEffect } from "expo-router";
import { useCallback, useRef } from "react";
import { Alert, BackHandler, ScrollView, View } from "react-native";

import GuestHouseEnrollLayout from "@/app/guestHouse/enroll/_components/GuestHouseEnrollLayout";
import Button from "@/src/components/ui/Button/Button";
import FormField from "@/src/components/ui/Form/FormField";
import FormSection from "@/src/components/ui/Form/FormSection";
import MultiImagePicker from "@/src/components/ui/imagePicker/MultiImagePicker";
import TextInput from "@/src/components/ui/TextInput";
import { useGuestHouseStep2Validation } from "@/src/hooks/guestHouse/useGuestHouseStep2Validation";
import { useGuestHouseStore } from "@/src/stores/guestHouse/useGuestHouseStore";
import {
  BUTTON_LABELS,
  FORM_DESCRIPTIONS,
  INPUT_HEIGHTS,
  PLACEHOLDERS,
  VALIDATION_LIMITS,
} from "@/src/utils/constants/guestHouseEnrollment";

import AtmosphereSelector from "./_components/step2/AtmosphereSelector";
import FacilitiesForm from "./_components/step2/FacilitiesForm";

export default function GuestHouseEnrollStep2() {
  const {
    step2Data,
    setStep2Update,
    resetAllData,
    shouldScrollToError,
    setShouldScrollToError,
  } = useGuestHouseStore();

  const scrollViewRef = useRef<ScrollView>(null);
  const mainImagesRef = useRef<View>(null);
  const introductionRef = useRef<View>(null);
  const facilitiesRef = useRef<View>(null);
  const atmosphereRef = useRef<View>(null);

  const fieldRefMap = {
    mainImages: mainImagesRef,
    introduction: introductionRef,
    facilities: facilitiesRef,
    atmosphere: atmosphereRef,
  } as const;

  const { errors, validateForm, clearError, validateField } =
    useGuestHouseStep2Validation(step2Data);

  const errorsRef = useRef(errors);
  errorsRef.current = errors;

  const validateFormRef = useRef(validateForm);
  validateFormRef.current = validateForm;

  const validateFieldRef = useRef(validateField);
  validateFieldRef.current = validateField;

  const step2DataRef = useRef(step2Data);
  step2DataRef.current = step2Data;

  const handleBackPress = useCallback(() => {
    Alert.alert(
      "등록 취소",
      "게스트하우스 등록을 취소하시겠습니까?\n입력한 정보가 모두 사라집니다.",
      [
        { text: "계속 작성", style: "cancel" },
        {
          text: "취소",
          style: "destructive",
          onPress: () => {
            resetAllData();
            router.replace("/");
          },
        },
      ],
    );
    return true;
  }, [resetAllData]);

  useFocusEffect(
    useCallback(() => {
      const subscription = BackHandler.addEventListener(
        "hardwareBackPress",
        handleBackPress,
      );
      return () => subscription.remove();
    }, [handleBackPress]),
  );

  useFocusEffect(
    useCallback(() => {
      if (shouldScrollToError) {
        validateFormRef.current();
        setTimeout(() => {
          const fieldOrder = [
            "mainImages",
            "introduction",
            "facilities",
            "atmosphere",
          ] as const;
          const firstErrField = fieldOrder.find((k) => !!errorsRef.current[k]);
          const targetRef = firstErrField ? fieldRefMap[firstErrField] : null;
          if (targetRef?.current && scrollViewRef.current) {
            targetRef.current.measureLayout(
              scrollViewRef.current as any,
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
      if (step2DataRef.current.introduction) {
        validateFieldRef.current("introduction");
      }
    }, [shouldScrollToError]),
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
          <View ref={mainImagesRef}>
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
          </View>

          <View ref={introductionRef}>
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
                onBlur={() => validateField("introduction")}
                onFocus={() => clearError("introduction")}
                placeholder={PLACEHOLDERS.INTRODUCTION}
                error={!!errors.introduction}
                multiline={true}
                height={INPUT_HEIGHTS.INTRODUCTION}
              />
            </FormField>
          </View>

          <View ref={facilitiesRef}>
            <FacilitiesForm
              errors={{ facilities: errors.facilities }}
              clearError={() => clearError("facilities")}
            />
          </View>
          <View ref={atmosphereRef}>
            <AtmosphereSelector
              error={errors.atmosphere}
              clearError={() => clearError("atmosphere")}
            />
          </View>
        </FormSection>

        <View className='flex-row gap-2 my-4'>
          <Button
            variant='gray'
            height={50}
            textColor='black'
            content='이전'
            onPress={() => router.push("/guestHouse/enroll/step1")}
            className='flex-1'
          />
          <Button
            variant='primary'
            height={50}
            textColor='white'
            content={BUTTON_LABELS.NEXT}
            onPress={() => router.push("/guestHouse/enroll/step3")}
            className='flex-1'
          />
        </View>
      </ScrollView>
    </GuestHouseEnrollLayout>
  );
}
