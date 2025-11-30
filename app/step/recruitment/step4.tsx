import RecruitmentStepLayout from '@/app/step/recruitment/_components/RecruitmentStepLayout';
import Flex from '@/src/components/layout/Flex';
import Button from '@/src/components/ui/Button/Button';
import FormField from '@/src/components/ui/Form/FormField';
import FormSection from '@/src/components/ui/Form/FormSection';
import TextInput from '@/src/components/ui/TextInput';
import { useRecruitmentStep4Validation } from '@/src/hooks/recruitment/useRecruitmentStep4Validation';
import { formatPhoneNumber } from '@/src/utils/common/phoneNumberFormatter';
import { router } from 'expo-router';
import React, { useState } from 'react';
import { KeyboardAvoidingView, Platform, ScrollView, View } from 'react-native';

export default function RecruitmentStep4() {
  const [instagram, setInstagram] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [website, setWebsite] = useState('');
  const [message, setMessage] = useState('');

  const { errors, clearError, validateForm } = useRecruitmentStep4Validation({
    instagram,
    phone,
    email,
    website,
    message,
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
                      setInstagram(text);
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
                      setPhone(formatPhoneNumber(text));
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
                      setEmail(text);
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
                      setWebsite(text);
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
                  errorMessage={errors.message}
                >
                  <TextInput
                    value={message}
                    onChangeText={(text) => {
                      setMessage(text);
                      clearError('message');
                    }}
                    placeholder="스텝들에게 전하고 싶은 메시지를 입력해주세요"
                    multiline={true}
                    height={120}
                    error={!!errors.message}
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
