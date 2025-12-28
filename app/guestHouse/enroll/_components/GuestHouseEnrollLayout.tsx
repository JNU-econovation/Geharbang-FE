import CustomSafeAreaView from '@/src/components/layout/CustomSafeAreaView';
import BackArrowHeader from '@/src/components/ui/BackArrowHeader';
import ProgressBar from '@/src/components/ui/Form/ProgressBar';
import React, { ReactNode } from 'react';
import { View } from 'react-native';

interface GuestHouseEnrollLayoutProps {
  currentStep: number;
  stepTitle: string;
  children?: ReactNode;
}

export default function GuestHouseEnrollLayout({
  currentStep,
  stepTitle,
  children,
}: GuestHouseEnrollLayoutProps) {
  return (
    <>
      <CustomSafeAreaView pageColor="bg-white">
        <View className="p-3">
          <BackArrowHeader content="게스트 하우스 올리기" />
        </View>

        <ProgressBar
          stepTitle={stepTitle}
          currentStep={currentStep}
          totalSteps={4}
        />

        <View className="flex-1 bg-[#F9FAFB]">{children}</View>
      </CustomSafeAreaView>
    </>
  );
}
