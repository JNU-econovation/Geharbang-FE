import { router, useFocusEffect } from "expo-router";
import { useCallback, useRef } from "react";
import { findNodeHandle, ScrollView, View } from "react-native";

import RecruitmentStepLayout from "@/app/step/recruitment/_components/RecruitmentStepLayout";
import Flex from "@/src/components/layout/Flex";
import Button from "@/src/components/ui/Button/Button";
import FormSection from "@/src/components/ui/Form/FormSection";
import { useStep1Validation } from "@/src/hooks/stepRecruitment/useStep1Validation";
import { useStepRecruitmentStore } from "@/src/stores/stepRecruitment/useStepRecruitmentStore";
import GuestHouseLocation from "./_components/step1/GuestHouseLocation";
import GuestHouseName from "./_components/step1/GuestHouseName";
import WorkingRegion from "./_components/step1/WorkingRegion";

export default function RecruitmentStep1() {
  const {
    step1Data,
    setStep1Update,
    shouldScrollToError,
  } = useStepRecruitmentStore();

  const scrollViewRef = useRef<ScrollView>(null);
  const guestHouseNameRef = useRef<View>(null);
  const workingRegionRef = useRef<View>(null);
  const locationRef = useRef<View>(null);

  const fieldRefMap = {
    guestHouseName: guestHouseNameRef,
    workingRegion: workingRegionRef,
    location: locationRef,
  } as const;

  const { errors, validateForm, clearError, validateField } =
    useStep1Validation(step1Data);

  const errorsRef = useRef(errors);
  errorsRef.current = errors;

  const validateFormRef = useRef(validateForm);
  validateFormRef.current = validateForm;

  const validateFieldRef = useRef(validateField);
  validateFieldRef.current = validateField;

  const step1DataRef = useRef(step1Data);
  step1DataRef.current = step1Data;

  useFocusEffect(
    useCallback(() => {
      if (shouldScrollToError) {
        validateFormRef.current();
        setTimeout(() => {
          const fieldOrder = ["guestHouseName", "workingRegion", "location"] as const;
          const firstErrField = fieldOrder.find((k) => !!errorsRef.current[k]);
          const targetRef = firstErrField ? fieldRefMap[firstErrField] : null;
          const parentHandle = findNodeHandle(scrollViewRef.current);
          if (parentHandle && targetRef?.current) {
            targetRef.current.measureLayout(
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
      if (step1DataRef.current.guestHouseName) {
        validateFieldRef.current("guestHouseName");
      }
    }, [shouldScrollToError]),
  );

  return (
    <RecruitmentStepLayout currentStep={1} stepTitle='기본 정보'>
      <ScrollView
        ref={scrollViewRef}
        className='bg-[#F9FAFB]'
        style={{ paddingTop: 16, paddingHorizontal: 12 }}
      >
        <FormSection title='기본 정보'>
          <View ref={guestHouseNameRef}>
            <GuestHouseName
              value={step1Data.guestHouseName}
              onChangeText={(text) => {
                setStep1Update("guestHouseName", text);
                clearError("guestHouseName");
              }}
              onBlur={() => validateField("guestHouseName")}
              onFocus={() => clearError("guestHouseName")}
              errorMsg={errors.guestHouseName}
              error={!!errors.guestHouseName}
            />
          </View>

          <View ref={workingRegionRef}>
            <WorkingRegion
              selectedRegion={step1Data.workingRegion}
              onChangeOption={(region) => {
                setStep1Update("workingRegion", region);
                clearError("workingRegion");
              }}
              errorMsg={errors.workingRegion}
              error={!!errors.workingRegion}
            />
          </View>

          <View ref={locationRef}>
            <GuestHouseLocation
              selectedAddress={step1Data.location}
              setSelectedAddress={(location) => {
                setStep1Update("location", location);
                clearError("location");
              }}
              errorMsg={errors.location}
              error={!!errors.location}
            />
          </View>
        </FormSection>

        <Flex items='center'>
          <Button
            variant='primary'
            width={370}
            height={50}
            textColor='white'
            content='다음'
            onPress={() => router.push("/step/recruitment/step2")}
            className='my-4'
          />
        </Flex>
      </ScrollView>
    </RecruitmentStepLayout>
  );
}
