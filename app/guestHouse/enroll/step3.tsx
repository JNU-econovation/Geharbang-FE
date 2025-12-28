import { router } from 'expo-router';
import { ScrollView } from 'react-native';

import RecruitmentStepLayout from '@/app/step/recruitment/_components/RecruitmentStepLayout';
import Flex from '@/src/components/layout/Flex';
import Button from '@/src/components/ui/Button/Button';
import FormSection from '@/src/components/ui/Form/FormSection';
import TextSize from '@/src/components/ui/TextSize';

export default function GuestHouseEnrollStep3() {
  const handleNext = () => {
    router.push('/guestHouse/enroll/step4');
  };

  const handlePrev = () => {
    router.back();
  };

  return (
    <RecruitmentStepLayout currentStep={3} stepTitle="상세 정보">
      <ScrollView
        className="bg-[#F9FAFB]"
        style={{ paddingTop: 16, paddingHorizontal: 12 }}
      >
        <FormSection title="상세 정보">
          <TextSize size={14} content="Step 3 내용을 여기에 추가하세요" />
        </FormSection>

        <Flex items="center" dir="row" gap={8}>
          <Button
            variant="gray"
            width={180}
            height={50}
            textColor="#000"
            content="이전"
            onPress={handlePrev}
            className="mt-4"
          />
          <Button
            variant="primary"
            width={180}
            height={50}
            textColor="white"
            content="다음"
            onPress={handleNext}
            className="mt-4"
          />
        </Flex>
      </ScrollView>
    </RecruitmentStepLayout>
  );
}
