import RecruitmentStepLayout from '@/app/step/recruitment/_components/RecruitmentStepLayout';
import Flex from '@/src/components/layout/Flex';
import Button from '@/src/components/ui/Button/Button';
import FormField from '@/src/components/ui/Form/FormField';
import FormSection from '@/src/components/ui/Form/FormSection';
import TextInput from '@/src/components/ui/TextInput';
import { useRecruitmentStep4Validation } from '@/src/hooks/recruitment/useRecruitmentStep4Validation';
import { useStepRecruitmentStore } from '@/src/stores/stepRecruitment/useStepRecruitmentStore';
import { formatPhoneNumber } from '@/src/utils/common/phoneNumberFormatter';
import { router } from 'expo-router';
import React from 'react';
import { KeyboardAvoidingView, Platform, ScrollView, View } from 'react-native';

export default function RecruitmentStep4() {
  const { step4Data, setStep4Update } = useStepRecruitmentStore();
  const { instagram, phone, email, website, ownerMessage } = step4Data;

  const { errors, clearError, validateForm } = useRecruitmentStep4Validation({
    instagram,
    phone,
    email,
    website,
    ownerMessage,
  });

  const handleNext = () => {
    if (validateForm()) {
      router.push('/step/recruitment/step5');
    }
  };

  return (
    <RecruitmentStepLayout currentStep={4} stepTitle="연락처 및 사장님 한마디">
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        className="flex-1"
      >
        <ScrollView
          className="flex-1"
          contentContainerStyle={{ paddingBottom: 100 }}
          showsVerticalScrollIndicator={false}
        >
          <View className="pt-4 px-3">
            <Flex justify="start" items="center" gap={24}>
              <FormSection title="연락처 및 사장님 한마디">
                <FormField
                  label="인스타그램"
                  required={false}
                  errorMessage={errors.instagram}
                >
                  <TextInput
                    value={instagram}
                    onChangeText={(text) => {
                      setStep4Update('instagram', text);
                      clearError('instagram');
                    }}
                    placeholder="예: @jeju_guesthouse"
                    error={!!errors.instagram}
                    maxLength={30}
                  />
                </FormField>

                <FormField
                  label="전화번호"
                  required={false}
                  errorMessage={errors.phone}
                >
                  <TextInput
                    value={phone}
                    onChangeText={(text) => {
                      setStep4Update('phone', formatPhoneNumber(text));
                      clearError('phone');
                    }}
                    placeholder="예: 064-123-4567"
                    keyboardType="phone-pad"
                    error={!!errors.phone}
                    maxLength={13}
                  />
                </FormField>

                <FormField
                  label="이메일"
                  required={false}
                  errorMessage={errors.email}
                >
                  <TextInput
                    value={email}
                    onChangeText={(text) => {
                      setStep4Update('email', text);
                      clearError('email');
                    }}
                    placeholder="예: owner@naver.com"
                    keyboardType="email-address"
                    error={!!errors.email}
                    maxLength={30}
                  />
                </FormField>

                <FormField
                  label="웹사이트"
                  required={false}
                  errorMessage={errors.website}
                >
                  <TextInput
                    value={website}
                    onChangeText={(text) => {
                      setStep4Update('website', text);
                      clearError('website');
                    }}
                    placeholder="예: https://www.jejuguesthouse.com"
                    keyboardType="url"
                    error={!!errors.website}
                    maxLength={30}
                  />
                </FormField>

                <FormField
                  label="사장님 한마디"
                  required={false}
                  errorMessage={errors.ownerMessage}
                >
                  <TextInput
                    value={ownerMessage}
                    onChangeText={(text) => {
                      setStep4Update('ownerMessage', text);
                      clearError('ownerMessage');
                    }}
                    placeholder="스텝들에게 전하고 싶은 메시지를 입력해주세요"
                    multiline={true}
                    height={120}
                    error={!!errors.ownerMessage}
                    maxLength={100}
                  />
                </FormField>
              </FormSection>

              <Button
                variant="primary"
                width={370}
                height={50}
                textColor="white"
                content="다음"
                onPress={handleNext}
              />
            </Flex>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </RecruitmentStepLayout>
  );
}
