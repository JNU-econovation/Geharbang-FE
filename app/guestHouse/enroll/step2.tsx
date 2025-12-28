import { router } from 'expo-router';
import { ScrollView } from 'react-native';

import RecruitmentStepLayout from '@/app/step/recruitment/_components/RecruitmentStepLayout';
import Flex from '@/src/components/layout/Flex';
import Button from '@/src/components/ui/Button/Button';
import FormSection from '@/src/components/ui/Form/FormSection';
import TextSize from '@/src/components/ui/TextSize';

export default function GuestHouseEnrollStep2() {
  const handleNext = () => {
    router.push('/guestHouse/enroll/step3');
  };

  const handlePrev = () => {
    router.back();
  };

  return (
    <RecruitmentStepLayout currentStep={2} stepTitle="게하 정보">
      <ScrollView
        className="bg-[#F9FAFB]"
        style={{ paddingTop: 16, paddingHorizontal: 12 }}
      >
        <FormSection title="게하 정보">
          <TextSize size={14} content="Step 2 내용을 여기에 추가하세요" />
        </FormSection>

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
    </RecruitmentStepLayout>
  );
}
