import { router, useFocusEffect } from "expo-router";
import { useCallback, useRef } from "react";
import { findNodeHandle, ScrollView, View } from "react-native";

import RecruitmentStepLayout from "@/app/step/recruitment/_components/RecruitmentStepLayout";
import Button from "@/src/components/ui/Button/Button";
import FormSection from "@/src/components/ui/Form/FormSection";
import { useStep2Validation } from "@/src/hooks/stepRecruitment/useStep2Validation";
import { WorkingTimeAndWorkErrors } from "@/src/types/models/stepRecruitment/Step2FormErrors";
import { useStepRecruitmentStore } from "@/src/stores/stepRecruitment/useStepRecruitmentStore";
import StepPostGender from "./_components/step2/StepRecruitmentGender";
import WorkingPeriod from "./_components/step2/WorkingPeriod";
import WorkingStartDate from "./_components/step2/WorkingStartDate";
import WorkingTimeAndWorkList from "./_components/step2/WorkingTimeAndWorkList";

export default function RecruitmentStep2() {
  const {
    step2Data,
    setStep2Update,
    shouldScrollToError,
  } = useStepRecruitmentStore();

  const scrollViewRef = useRef<ScrollView>(null);
  const workingStartDateRef = useRef<View>(null);
  const workingPeriodRef = useRef<View>(null);
  const workingTimeAndWorkRef = useRef<View>(null);
  const genderRef = useRef<View>(null);

  const fieldRefMap = {
    workingStartDate: workingStartDateRef,
    workingPeriod: workingPeriodRef,
    workingTimeAndWork: workingTimeAndWorkRef,
    gender: genderRef,
  } as const;

  const { errors, validateForm, clearError, removeItemErrors, validateField } =
    useStep2Validation(step2Data);

  const errorsRef = useRef(errors);
  errorsRef.current = errors;

  const validateFormRef = useRef(validateForm);
  validateFormRef.current = validateForm;

  useFocusEffect(
    useCallback(() => {
      if (shouldScrollToError) {
        validateFormRef.current();
        setTimeout(() => {
          const fieldOrder = [
            "workingStartDate",
            "workingPeriod",
            "workingTimeAndWork",
            "gender",
          ] as const;
          const firstErrField = fieldOrder.find((k) => {
            const v = errorsRef.current[k];
            if (typeof v === "string") return !!v;
            if (Array.isArray(v))
              return v.some(
                (item: any) =>
                  typeof item === "object" &&
                  item !== null &&
                  Object.values(item).some((vv) => !!vv)
              );
            return false;
          });
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
              () => scrollViewRef.current?.scrollTo({ y: 0, animated: true })
            );
          } else {
            scrollViewRef.current?.scrollTo({ y: 0, animated: true });
          }
        }, 100);
        return;
      }
    }, [shouldScrollToError])
  );

  return (
    <RecruitmentStepLayout currentStep={2} stepTitle='근무 정보'>
      <ScrollView
        ref={scrollViewRef}
        className='bg-[#F9FAFB]'
        style={{ paddingTop: 16, paddingHorizontal: 12 }}
      >
        <FormSection title='근무 정보'>
          <View ref={workingStartDateRef}>
            <WorkingStartDate
              selectedDate={step2Data.workingStartDate}
              setSelectedDate={(date) => {
                setStep2Update("workingStartDate", date);
                clearError("workingStartDate");
              }}
              errorMsg={errors.workingStartDate}
              error={!!errors.workingStartDate}
            />
          </View>

          <View className='pt-1' />
          <View ref={workingPeriodRef}>
            <WorkingPeriod
              selectedPeriod={step2Data.workingPeriod}
              setSelectedPeriod={(period) => {
                setStep2Update("workingPeriod", period);
                clearError("workingPeriod");
              }}
              errorMsg={errors.workingPeriod}
              error={!!errors.workingPeriod}
            />
          </View>

          <View className='pt-1' />
          <View ref={workingTimeAndWorkRef}>
            <WorkingTimeAndWorkList
              workingTimeAndWorkList={step2Data.workingTimeAndWork}
              setWorkingTimeAndWorkList={(workingTimeAndWork) => {
                setStep2Update("workingTimeAndWork", workingTimeAndWork);
              }}
              errors={errors}
              onTextInputBlur={(index, field) => validateField("workingTimeAndWork", index, field)}
              onTextInputFocus={(index, field) => clearError("workingTimeAndWork", index, field)}
              onDeleteItem={(index) => removeItemErrors(index)}
              onClearError={(index, field) => clearError("workingTimeAndWork", index, field as keyof WorkingTimeAndWorkErrors)}
            />
          </View>

          <View ref={genderRef}>
            <StepPostGender
              selectedGender={step2Data.gender}
              setSelectedGender={(gender) => {
                setStep2Update("gender", gender);
                clearError("gender");
              }}
              errorMsg={errors.gender}
              error={!!errors.gender}
            />
          </View>
        </FormSection>

        <View className='flex-row gap-2 my-4'>
          <Button
            variant='gray'
            height={50}
            textColor='black'
            content='이전'
            onPress={() => router.push('/step/recruitment/step1')}
            className='flex-1'
          />
          <Button
            variant='primary'
            height={50}
            textColor='white'
            content='다음'
            onPress={() => router.push('/step/recruitment/step3')}
            className='flex-1'
          />
        </View>
      </ScrollView>
    </RecruitmentStepLayout>
  );
}
