import { router } from 'expo-router';
import { ScrollView } from 'react-native';

import GuestHouseEnrollLayout from '@/app/guestHouse/enroll/_components/GuestHouseEnrollLayout';
import Flex from '@/src/components/layout/Flex';
import Button from '@/src/components/ui/Button/Button';
import FormField from '@/src/components/ui/Form/FormField';
import FormSection from '@/src/components/ui/Form/FormSection';
import MultiImagePicker from '@/src/components/ui/imagePicker/MultiImagePicker';
import TextInput from '@/src/components/ui/TextInput';
import { useGuestHouseStep2Validation } from '@/src/hooks/guesthouse/useGuestHouseStep2Validation';
import { useGuestHouseStore } from '@/src/stores/guestHouse/useGuestHouseStore';

import AtmosphereSelector from './_components/step2/AtmosphereSelector';
import FacilitiesForm from './_components/step2/FacilitiesForm';
import PartyComponent from './_components/step2/PartyComponent';

export default function GuestHouseEnrollStep2() {
  const { step2Data, setStep2Update } = useGuestHouseStore();

  const { errors, validateForm, clearError } =
    useGuestHouseStep2Validation(step2Data);

  const handleNext = () => {
    if (validateForm()) {
      router.push('/guestHouse/enroll/step3');
    }
  };

  return (
    <GuestHouseEnrollLayout currentStep={2} stepTitle="게하 정보">
      <ScrollView
        className="bg-[#F9FAFB]"
        style={{ paddingTop: 16, paddingHorizontal: 12 }}
      >
        <FormSection
          title="게스트하우스 소개"
          description="우리 게스트하우스만의 특별한 이야기를 들려주세요"
        >
          <FormField
            label="게스트하우스 대표 사진"
            required={true}
            description="최대 10장까지 등록할 수 있습니다"
            errorMessage={errors.mainImages}
          >
            <MultiImagePicker
              selectedImageFiles={step2Data.mainImages}
              setSelectedImageFiles={(files) =>
                setStep2Update('mainImages', files)
              }
              maxCount={10}
              error={!!errors.mainImages}
              clearError={() => clearError('mainImages')}
            />
          </FormField>

          <FormField
            label="소개글"
            required={true}
            errorMessage={errors.introduction}
          >
            <TextInput
              value={step2Data.introduction}
              onChangeText={(text) => {
                setStep2Update('introduction', text);
                clearError('introduction');
              }}
              placeholder="우리 게스트하우스를 소개해주세요"
              error={!!errors.introduction}
              multiline={true}
              height={400}
            />
          </FormField>
          <FacilitiesForm
            errors={{ facilities: errors.facilities }}
            clearError={() => clearError('facilities')}
          />
          <AtmosphereSelector
            error={errors.atmosphere}
            clearError={() => clearError('atmosphere')}
          />
        </FormSection>

        <PartyComponent />

        <Flex items="center">
          <Button
            variant="primary"
            width={360}
            height={50}
            textColor="white"
            content="다음"
            onPress={handleNext}
            className="mt-4"
          />
        </Flex>
      </ScrollView>
    </GuestHouseEnrollLayout>
  );
}
