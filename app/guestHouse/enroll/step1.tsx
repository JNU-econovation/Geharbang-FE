import { router, useFocusEffect } from 'expo-router';
import { useCallback } from 'react';
import { Alert, BackHandler, ScrollView } from 'react-native';

import GuestHouseLocation from '@/app/step/recruitment/_components/step1/GuestHouseLocation';
import GuestHouseName from '@/app/step/recruitment/_components/step1/GuestHouseName';
import WorkingRegion from '@/app/step/recruitment/_components/step1/WorkingRegion';
import Flex from '@/src/components/layout/Flex';
import Button from '@/src/components/ui/Button/Button';
import FormSection from '@/src/components/ui/Form/FormSection';
import { useGuestHouseStep1Validation } from '@/src/hooks/guestHouse/useGuestHouseStep1Validation';
import { useGuestHouseStore } from '@/src/stores/guestHouse/useGuestHouseStore';
import { BUTTON_LABELS } from '@/src/utils/constants/guestHouseEnrollment';
import GuestHouseEnrollLayout from './_components/GuestHouseEnrollLayout';

export default function GuestHouseStep1() {
  const { step1Data, setStep1Update, resetAllData } = useGuestHouseStore();

  const handleBackPress = useCallback(() => {
    Alert.alert(
      '등록 취소',
      '게스트하우스 등록을 취소하시겠습니까?\n입력한 정보가 모두 사라집니다.',
      [
        {
          text: '계속 작성',
          style: 'cancel',
        },
        {
          text: '취소',
          style: 'destructive',
          onPress: () => {
            resetAllData();
            router.replace('/');
          },
        },
      ],
    );
  }, [resetAllData]);

  useFocusEffect(
    useCallback(() => {
      const onHardwareBackPress = () => {
        handleBackPress();
        return true;
      };

      const subscription = BackHandler.addEventListener(
        'hardwareBackPress',
        onHardwareBackPress,
      );

      return () => subscription.remove();
    }, [handleBackPress]),
  );

  const { errors, validateForm, clearError } =
    useGuestHouseStep1Validation(step1Data);

  const handleNext = () => {
    if (validateForm()) {
      router.push('/guestHouse/enroll/step2');
    }
  };

  return (
    <GuestHouseEnrollLayout
      currentStep={1}
      stepTitle="기본 정보"
      onBackPress={handleBackPress}
    >
      <ScrollView
        className="bg-[#F9FAFB]"
        style={{ paddingTop: 16, paddingHorizontal: 12 }}
      >
        <FormSection title="기본 정보">
          <GuestHouseName
            value={step1Data.guestHouseName}
            onChangeText={(text) => {
              setStep1Update('guestHouseName', text);
              clearError('guestHouseName');
            }}
            errorMsg={errors.guestHouseName}
            error={!!errors.guestHouseName}
          />

          <WorkingRegion
            selectedRegion={step1Data.workingRegion}
            onChangeOption={(region) => {
              setStep1Update('workingRegion', region);
              clearError('workingRegion');
            }}
            errorMsg={errors.workingRegion}
            error={!!errors.workingRegion}
          />

          <GuestHouseLocation
            selectedAddress={step1Data.location}
            setSelectedAddress={(location) => {
              setStep1Update('location', location);
              clearError('location');
            }}
            errorMsg={errors.location}
            error={!!errors.location}
          />
        </FormSection>

        <Flex items="center">
          <Button
            variant="primary"
            width={360}
            height={50}
            textColor="white"
            content={BUTTON_LABELS.NEXT}
            onPress={handleNext}
            className="mt-4"
          />
        </Flex>
      </ScrollView>
    </GuestHouseEnrollLayout>
  );
}
