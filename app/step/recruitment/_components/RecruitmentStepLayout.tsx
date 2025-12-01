import CustomSafeAreaView from '@/src/components/layout/CustomSafeAreaView';
import Flex from '@/src/components/layout/Flex';
import BackArrow from '@/src/components/ui/BackArrow';
import ProgressBar from '@/src/components/ui/Form/ProgressBar';
import TextSize from '@/src/components/ui/TextSize';
import React, { ReactNode } from 'react';
import { View } from 'react-native';

interface RecruitmentStepLayoutProps {
  currentStep: number;
  stepTitle: string;
  children?: ReactNode;
}

export default function RecruitmentStepLayout({
  currentStep,
  stepTitle,
  children,
}: RecruitmentStepLayoutProps) {
  return (
    <>
      <CustomSafeAreaView pageColor="bg-white">
        <View className="p-3">
          <Flex justify="start" items="center" dir="row" gap={100}>
            <BackArrow color="black" size={24} />
            <TextSize size={18} content="스텝 공고 올리기" />
          </Flex>
        </View>

        <ProgressBar
          stepTitle={stepTitle}
          currentStep={currentStep}
          totalSteps={5}
        />

        <View className="flex-1 bg-[#F9FAFB]">{children}</View>
      </CustomSafeAreaView>
    </>
  );
}
