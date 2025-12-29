import { router } from 'expo-router';
import { ScrollView } from 'react-native';

import GuestHouseEnrollLayout from '@/app/guestHouse/enroll/_components/GuestHouseEnrollLayout';
import Flex from '@/src/components/layout/Flex';
import Button from '@/src/components/ui/Button/Button';
import FormField from '@/src/components/ui/Form/FormField';
import FormSection from '@/src/components/ui/Form/FormSection';
import MultiImagePicker from '@/src/components/ui/imagePicker/MultiImagePicker';
import TextInput from '@/src/components/ui/TextInput';
import { useRecruitmentStep3Validation } from '@/src/hooks/recruitment/useRecruitmentStep3Validation';
import { useStepRecruitmentStore } from '@/src/stores/stepRecruitment/useStepRecruitmentStore';
import FacilitiesForm from './_components/step2/FacilitiesForm';
import PartyComponent from './_components/step2/PartyComponent';

export default function GuestHouseEnrollStep2() {
  const { step3Data, setStep3Update } = useStepRecruitmentStore();

  const { errors, validateForm, clearError } =
    useRecruitmentStep3Validation(step3Data);

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
            label="공고글 제목"
            required={true}
            errorMessage={errors.title}
          >
            <TextInput
              value={step3Data.title}
              onChangeText={(text) => {
                setStep3Update('title', text);
                clearError('title');
              }}
              placeholder="예: 제주 점박이 게스트하우스 스텝 모집"
              error={!!errors.title}
              maxLength={30}
            />
          </FormField>

          <FormField
            label="게스트하우스 대표 사진"
            required={true}
            description="최대 10장까지 등록할 수 있습니다"
            errorMessage={errors.mainImageFiles}
          >
            <MultiImagePicker
              selectedImageFiles={step3Data.mainImageFiles}
              setSelectedImageFiles={(files) =>
                setStep3Update('mainImageFiles', files)
              }
              maxCount={10}
              error={!!errors.mainImageFiles}
              clearError={() => clearError('mainImageFiles')}
            />
          </FormField>

          <FormField
            label="소개글"
            required={true}
            errorMessage={errors.introduction}
          >
            <TextInput
              value={step3Data.introduction}
              onChangeText={(text) => {
                setStep3Update('introduction', text);
                clearError('introduction');
              }}
              placeholder="우리 게스트하우스를 소개해주세요"
              error={!!errors.introduction}
              multiline={true}
              height={400}
            />
          </FormField>
          <FacilitiesForm />
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
