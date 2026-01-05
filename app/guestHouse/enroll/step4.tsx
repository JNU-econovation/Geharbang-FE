import { router } from 'expo-router';
import { KeyboardAvoidingView, Platform, ScrollView, View } from 'react-native';

import Flex from '@/src/components/layout/Flex';
import Button from '@/src/components/ui/Button/Button';
import FormField from '@/src/components/ui/Form/FormField';
import FormSection from '@/src/components/ui/Form/FormSection';
import TextInput from '@/src/components/ui/TextInput';
import { useGuestHouseEnrollment } from '@/src/hooks/guesthouse/useGuestHouseEnrollment';
import { useGuestHouseStep4Validation } from '@/src/hooks/guesthouse/useGuestHouseStep4Validation';
import { useGuestHouseStore } from '@/src/stores/guestHouse/useGuestHouseStore';
import { formatPhoneNumber } from '@/src/utils/common/phoneNumberFormatter';
import {
  BUTTON_LABELS,
  INPUT_HEIGHTS,
  INPUT_MAX_LENGTHS,
  PLACEHOLDERS,
} from '@/src/utils/constants/guestHouseEnrollment';
import GuestHouseEnrollLayout from './_components/GuestHouseEnrollLayout';

export default function GuestHouseEnrollStep4() {
  const { step1Data, step2Data, step3Data, step4Data, setStep4Update } =
    useGuestHouseStore();
  const { instagram, phone, email, website, ownerMessage } = step4Data;

  const { errors, clearError, validateForm } = useGuestHouseStep4Validation({
    instagram,
    phone,
    email,
    website,
    ownerMessage,
  });

  const {
    isLoading,
    error: enrollError,
    enrollGuestHouse,
  } = useGuestHouseEnrollment();

  const handleSubmit = async () => {
    if (validateForm()) {
      const enrollData = {
        guestHouseName: step1Data.guestHouseName,
        workingRegion: step1Data.workingRegion,
        location: step1Data.location,

        mainImages: step2Data.mainImages,
        introduction: step2Data.introduction,
        facilities: step2Data.facilities,
        atmosphere: step2Data.atmosphere,
        parties: step2Data.parties,

        rooms: step3Data.rooms,

        instagram,
        phone,
        email,
        website,
        ownerMessage,
      };

      const guestHouseId = await enrollGuestHouse(enrollData);

      if (guestHouseId) {
        router.push({
          pathname: '/guestHouse/enroll/result',
          params: { status: 'success', guestHouseId: guestHouseId.toString() },
        });
      } else {
        router.push({
          pathname: '/guestHouse/enroll/result',
          params: {
            status: 'error',
            error: enrollError || '등록 중 오류가 발생했습니다.',
          },
        });
      }
    }
  };

  return (
    <GuestHouseEnrollLayout currentStep={4} stepTitle="연락처 및 사장님 한마디">
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
                    placeholder={PLACEHOLDERS.INSTAGRAM}
                    error={!!errors.instagram}
                    maxLength={INPUT_MAX_LENGTHS.INSTAGRAM}
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
                    placeholder={PLACEHOLDERS.PHONE}
                    keyboardType="phone-pad"
                    error={!!errors.phone}
                    maxLength={INPUT_MAX_LENGTHS.PHONE}
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
                    placeholder={PLACEHOLDERS.EMAIL}
                    keyboardType="email-address"
                    error={!!errors.email}
                    maxLength={INPUT_MAX_LENGTHS.EMAIL}
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
                    placeholder={PLACEHOLDERS.WEBSITE}
                    keyboardType="url"
                    error={!!errors.website}
                    maxLength={INPUT_MAX_LENGTHS.WEBSITE}
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
                    placeholder={PLACEHOLDERS.OWNER_MESSAGE}
                    multiline={true}
                    height={INPUT_HEIGHTS.OWNER_MESSAGE}
                    error={!!errors.ownerMessage}
                    maxLength={INPUT_MAX_LENGTHS.OWNER_MESSAGE}
                  />
                </FormField>
              </FormSection>

              <Flex items="center">
                <Button
                  variant="primary"
                  width={360}
                  height={50}
                  textColor="white"
                  content={isLoading ? '등록 중...' : BUTTON_LABELS.SUBMIT}
                  onPress={handleSubmit}
                  className="mt-4"
                  disabled={isLoading}
                />
              </Flex>
            </Flex>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </GuestHouseEnrollLayout>
  );
}
