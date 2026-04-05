import RecruitmentStepLayout from "@/app/step/recruitment/_components/RecruitmentStepLayout";
import Button from "@/src/components/ui/Button/Button";
import FormField from "@/src/components/ui/Form/FormField";
import FormSection from "@/src/components/ui/Form/FormSection";
import TextInput from "@/src/components/ui/TextInput";
import { useStep4Validation } from "@/src/hooks/stepRecruitment/useStep4Validation";
import { useStepRecruitmentStore } from "@/src/stores/stepRecruitment/useStepRecruitmentStore";
import { formatPhoneNumber } from "@/src/utils/common/phoneNumberFormatter";
import { router, useFocusEffect } from "expo-router";
import { useCallback, useRef } from "react";
import {
  findNodeHandle,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  View,
} from "react-native";

export default function RecruitmentStep4() {
  const {
    step4Data,
    setStep4Update,
    shouldScrollToError,
  } = useStepRecruitmentStore();
  const { instagram, phone, email, website, ownerMessage } = step4Data;

  const scrollViewRef = useRef<ScrollView>(null);
  const instagramRef = useRef<View>(null);
  const phoneRef = useRef<View>(null);
  const emailRef = useRef<View>(null);
  const websiteRef = useRef<View>(null);
  const ownerMessageRef = useRef<View>(null);

  const fieldRefMap = {
    instagram: instagramRef,
    phone: phoneRef,
    email: emailRef,
    website: websiteRef,
    ownerMessage: ownerMessageRef,
  } as const;

  const { errors, clearError, validateForm, validateField } =
    useStep4Validation({
      instagram,
      phone,
      email,
      website,
      ownerMessage,
    });

  const errorsRef = useRef(errors);
  errorsRef.current = errors;

  const validateFormRef = useRef(validateForm);
  validateFormRef.current = validateForm;

  const validateFieldRef = useRef(validateField);
  validateFieldRef.current = validateField;

  const step4DataRef = useRef(step4Data);
  step4DataRef.current = step4Data;

  useFocusEffect(
    useCallback(() => {
      if (shouldScrollToError) {
        validateFormRef.current();
        setTimeout(() => {
          const fieldOrder = [
            "instagram",
            "phone",
            "email",
            "website",
            "ownerMessage",
          ] as const;
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
      const d = step4DataRef.current;
      if (d.instagram) validateFieldRef.current("instagram");
      if (d.phone) validateFieldRef.current("phone");
      if (d.email) validateFieldRef.current("email");
      if (d.website) validateFieldRef.current("website");
      if (d.ownerMessage) validateFieldRef.current("ownerMessage");
    }, [shouldScrollToError]),
  );

  return (
    <RecruitmentStepLayout currentStep={4} stepTitle='연락처 및 사장님 한마디'>
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
                      setStep4Update("instagram", text);
                      clearError("instagram");
                    }}
                    onBlur={() => validateField("instagram")}
                    onFocus={() => clearError("instagram")}
                    placeholder='예: @jeju_guesthouse'
                    error={!!errors.instagram}
                    maxLength={30}
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
                      setStep4Update("phone", formatPhoneNumber(text));
                      clearError("phone");
                    }}
                    onBlur={() => validateField("phone")}
                    onFocus={() => clearError("phone")}
                    placeholder='예: 064-123-4567'
                    keyboardType='phone-pad'
                    error={!!errors.phone}
                    maxLength={13}
                  />
                </FormField>
              </View>

              <View ref={emailRef}>
                <FormField
                  label='이메일'
                  required={false}
                  errorMessage={errors.email}
                >
                  <TextInput
                    value={email}
                    onChangeText={(text) => {
                      setStep4Update("email", text);
                      clearError("email");
                    }}
                    onBlur={() => validateField("email")}
                    onFocus={() => clearError("email")}
                    placeholder='예: owner@naver.com'
                    keyboardType='email-address'
                    error={!!errors.email}
                    maxLength={30}
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
                      setStep4Update("website", text);
                      clearError("website");
                    }}
                    onBlur={() => validateField("website")}
                    onFocus={() => clearError("website")}
                    placeholder='예: https://www.jejuguesthouse.com'
                    keyboardType='url'
                    error={!!errors.website}
                    maxLength={30}
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
                      setStep4Update("ownerMessage", text);
                      clearError("ownerMessage");
                    }}
                    onBlur={() => validateField("ownerMessage")}
                    onFocus={() => clearError("ownerMessage")}
                    placeholder='스텝들에게 전하고 싶은 메시지를 입력해주세요'
                    multiline={true}
                    height={120}
                    error={!!errors.ownerMessage}
                    maxLength={100}
                  />
                </FormField>
              </View>
            </FormSection>

            <View className='flex-row gap-2 my-4'>
              <Button
                variant='gray'
                height={50}
                textColor='black'
                content='이전'
                onPress={() => router.push("/step/recruitment/step3")}
                className='flex-1'
              />
              <Button
                variant='primary'
                height={50}
                textColor='white'
                content='다음'
                onPress={() => router.push("/step/recruitment/step5")}
                className='flex-1'
              />
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </RecruitmentStepLayout>
  );
}
