import { Href, router, useFocusEffect } from "expo-router";
import { useCallback, useRef } from "react";
import { KeyboardAvoidingView, Platform, ScrollView, View } from "react-native";

import Flex from "@/src/components/layout/Flex";
import Button from "@/src/components/ui/Button/Button";
import FormField from "@/src/components/ui/Form/FormField";
import FormSection from "@/src/components/ui/Form/FormSection";
import TextInput from "@/src/components/ui/TextInput";
import { useGuestHouseEnrollment } from "@/src/hooks/guestHouse/useGuestHouseEnrollment";
import { useGuestHouseStep1Validation } from "@/src/hooks/guestHouse/useGuestHouseStep1Validation";
import { useGuestHouseStep2Validation } from "@/src/hooks/guestHouse/useGuestHouseStep2Validation";
import { useGuestHouseStep4Validation } from "@/src/hooks/guestHouse/useGuestHouseStep4Validation";
import { useGuestHouseStep5Validation } from "@/src/hooks/guestHouse/useGuestHouseStep5Validation";
import { useGuestHouseStore } from "@/src/stores/guestHouse/useGuestHouseStore";
import { formatPhoneNumber } from "@/src/utils/common/phoneNumberFormatter";
import {
  BUTTON_LABELS,
  INPUT_HEIGHTS,
  INPUT_MAX_LENGTHS,
  PLACEHOLDERS,
} from "@/src/utils/constants/guestHouseEnrollment";
import GuestHouseEnrollLayout from "./_components/GuestHouseEnrollLayout";

export default function GuestHouseEnrollStep5() {
  const {
    step1Data,
    step2Data,
    step3Data,
    step4Data,
    step5Data,
    setStep5Update,
    resetAllData,
    shouldScrollToError,
    setShouldScrollToError,
    editingId,
  } = useGuestHouseStore();
  const { instagram, phone, website, ownerMessage } = step5Data;

  const { validateForm: validateStep1 } =
    useGuestHouseStep1Validation(step1Data);
  const { validateForm: validateStep2 } =
    useGuestHouseStep2Validation(step2Data);
  const { validateForm: validateStep4 } =
    useGuestHouseStep4Validation(step4Data);

  const { errors, clearError, validateForm, validateField } =
    useGuestHouseStep5Validation({ instagram, phone, website, ownerMessage });

  const scrollViewRef = useRef<ScrollView>(null);
  const instagramRef = useRef<View>(null);
  const phoneRef = useRef<View>(null);
  const websiteRef = useRef<View>(null);
  const ownerMessageRef = useRef<View>(null);

  const fieldRefMap = {
    instagram: instagramRef,
    phone: phoneRef,
    website: websiteRef,
    ownerMessage: ownerMessageRef,
  } as const;

  const errorsRef = useRef(errors);
  errorsRef.current = errors;

  const validateFormRef = useRef(validateForm);
  validateFormRef.current = validateForm;

  const validateFieldRef = useRef(validateField);
  validateFieldRef.current = validateField;

  const step5DataRef = useRef(step5Data);
  step5DataRef.current = step5Data;

  useFocusEffect(
    useCallback(() => {
      if (shouldScrollToError) {
        validateFormRef.current();
        setTimeout(() => {
          const fieldOrder = [
            "instagram",
            "phone",
            "website",
            "ownerMessage",
          ] as const;
          const firstErrField = fieldOrder.find((k) => !!errorsRef.current[k]);
          const targetRef = firstErrField ? fieldRefMap[firstErrField] : null;
          if (targetRef?.current && scrollViewRef.current) {
            targetRef.current.measureLayout(
              scrollViewRef.current as unknown as View,
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
      const d = step5DataRef.current;
      if (d.instagram) validateFieldRef.current("instagram");
      if (d.phone) validateFieldRef.current("phone");
      if (d.website) validateFieldRef.current("website");
      if (d.ownerMessage) validateFieldRef.current("ownerMessage");
    }, [shouldScrollToError]),
  );

  const { mutateAsync: enrollGuestHouse, isPending } =
    useGuestHouseEnrollment();

  const validateStepAndNavigate = (
    validator: () => boolean,
    route: Href,
  ): boolean => {
    if (!validator()) {
      setShouldScrollToError(true);
      router.navigate(route);
      return false;
    }
    return true;
  };

  const handleSubmit = async () => {
    if (!validateStepAndNavigate(validateStep1, "/guestHouse/enroll/step1"))
      return;
    if (!validateStepAndNavigate(validateStep2, "/guestHouse/enroll/step2"))
      return;
    if (!validateStepAndNavigate(validateStep4, "/guestHouse/enroll/step4"))
      return;
    if (!validateForm()) return;

    const enrollData = {
      guestHouseName: step1Data.guestHouseName,
      workingRegion: step1Data.workingRegion,
      location: step1Data.location,

      mainImages: step2Data.mainImages,
      introduction: step2Data.introduction,
      facilities: step2Data.facilities,
      atmosphere: step2Data.atmosphere,
      parties: step3Data.parties,

      rooms: step4Data.rooms,

      instagram,
      phone,
      website,
      ownerMessage,
    };

    try {
      const guestHouseId = await enrollGuestHouse(enrollData);

      if (guestHouseId) {
        resetAllData();
        if (editingId) {
          router.navigate("/my/guestHouse");
        } else {
          router.push({
            pathname: "/guestHouse/enroll/result",
            params: { status: "success", guestHouseId: guestHouseId.toString() },
          });
        }
      }
    } catch (error) {
      console.error("Enrollment Failed", error);

      let userFriendlyMessage = "등록 중 오류가 발생했습니다.";

      if (error instanceof Error) {
        if (error.message.includes("이미지")) {
          userFriendlyMessage = error.message;
        } else if (error.message.includes("네트워크")) {
          userFriendlyMessage = "네트워크 연결을 확인하고 다시 시도해주세요.";
        } else if (error.message.includes("유효한 숫자")) {
          userFriendlyMessage = "입력 정보를 다시 확인해주세요.";
        } else {
          userFriendlyMessage =
            "등록 중 오류가 발생했습니다. 잠시 후 다시 시도해주세요.";
        }
      }

      router.push({
        pathname: "/guestHouse/enroll/result",
        params: {
          status: "error",
          error: userFriendlyMessage,
        },
      });
    }
  };

  return (
    <GuestHouseEnrollLayout currentStep={5} stepTitle='연락처 및 사장님 한마디'>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        className='flex-1'
      >
        <ScrollView
          ref={scrollViewRef}
          className='flex-1'
          contentContainerStyle={{ paddingBottom: 100 }}
          showsVerticalScrollIndicator={false}
        >
          <View className='pt-4 px-3'>
            <Flex justify='start' items='center' gap={24}>
              <FormSection title='연락처 및 사장님 한마디'>
                <View ref={instagramRef}>
                  <FormField
                    label='인스타그램'
                    required={false}
                    errorMessage={errors.instagram}
                  >
                    <TextInput
                      value={instagram}
                      onChangeText={(text) => {
                        setStep5Update("instagram", text);
                        clearError("instagram");
                      }}
                      onBlur={() => validateField("instagram")}
                      onFocus={() => clearError("instagram")}
                      placeholder={PLACEHOLDERS.INSTAGRAM}
                      error={!!errors.instagram}
                      maxLength={INPUT_MAX_LENGTHS.INSTAGRAM}
                    />
                  </FormField>
                </View>

                <View ref={phoneRef}>
                  <FormField
                    label='전화번호'
                    required={false}
                    errorMessage={errors.phone}
                  >
                    <TextInput
                      value={phone}
                      onChangeText={(text) => {
                        setStep5Update("phone", formatPhoneNumber(text));
                        clearError("phone");
                      }}
                      onBlur={() => validateField("phone")}
                      onFocus={() => clearError("phone")}
                      placeholder={PLACEHOLDERS.PHONE}
                      keyboardType='phone-pad'
                      error={!!errors.phone}
                      maxLength={INPUT_MAX_LENGTHS.PHONE}
                    />
                  </FormField>
                </View>

                <View ref={websiteRef}>
                  <FormField
                    label='웹사이트'
                    required={false}
                    errorMessage={errors.website}
                  >
                    <TextInput
                      value={website}
                      onChangeText={(text) => {
                        setStep5Update("website", text);
                        clearError("website");
                      }}
                      onBlur={() => validateField("website")}
                      onFocus={() => clearError("website")}
                      placeholder={PLACEHOLDERS.WEBSITE}
                      keyboardType='url'
                      error={!!errors.website}
                      maxLength={INPUT_MAX_LENGTHS.WEBSITE}
                    />
                  </FormField>
                </View>

                <View ref={ownerMessageRef}>
                  <FormField
                    label='사장님 한마디'
                    required={false}
                    errorMessage={errors.ownerMessage}
                  >
                    <TextInput
                      value={ownerMessage}
                      onChangeText={(text) => {
                        setStep5Update("ownerMessage", text);
                        clearError("ownerMessage");
                      }}
                      onBlur={() => validateField("ownerMessage")}
                      onFocus={() => clearError("ownerMessage")}
                      placeholder={PLACEHOLDERS.OWNER_MESSAGE}
                      multiline={true}
                      height={INPUT_HEIGHTS.OWNER_MESSAGE}
                      error={!!errors.ownerMessage}
                      maxLength={INPUT_MAX_LENGTHS.OWNER_MESSAGE}
                    />
                  </FormField>
                </View>
              </FormSection>
            </Flex>

            <View className='flex-row gap-2 my-4'>
              <Button
                variant='gray'
                height={50}
                textColor='black'
                content='이전'
                onPress={() => router.push("/guestHouse/enroll/step4")}
                className='flex-1'
              />
              <Button
                variant='primary'
                height={50}
                textColor='white'
                content={isPending ? (editingId ? "수정 중..." : "등록 중...") : (editingId ? "수정하기" : BUTTON_LABELS.SUBMIT)}
                onPress={handleSubmit}
                disabled={isPending}
                className='flex-1'
              />
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </GuestHouseEnrollLayout>
  );
}
