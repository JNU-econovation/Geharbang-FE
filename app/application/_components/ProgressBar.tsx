import { Animated, View } from "react-native";

import Flex from "@/src/components/layout/Flex";
import TextSize from "@/src/components/ui/TextSize";
import { useProgressAnimation } from "@/src/hooks/application/create/useProgressAnimation";
import { COLORS } from "@/src/utils/constants/colors";

interface ProgressBarProps {
  currentStep: number;
  totalSteps: number;
  stepTitle: string;
}

export default function ProgressBar({
  currentStep,
  totalSteps,
  stepTitle,
}: ProgressBarProps) {
  const progressPercent = (currentStep / totalSteps) * 100;
  const currentStepText = `${currentStep}/${totalSteps}`;
  const titleText = `${currentStep}단계: ${stepTitle}`;

  const { loadWidth } = useProgressAnimation(progressPercent);

  return (
    <View className="p-3">
      <Flex flexDir="row" items="center" justify="between">
        <TextSize size={14} color={COLORS.GRAY.TEXT} content={titleText} />
        <TextSize
          size={14}
          color={COLORS.GRAY.TEXT}
          content={currentStepText}
        />
      </Flex>

      <View className="h-2" />

      <View className="h-2 bg-gray-border rounded-full">
        <Animated.View
          style={{
            height: 8,
            borderRadius: 9999,
            backgroundColor: COLORS.PRIMARY.BLUE,
            width: loadWidth,
          }}
        />
      </View>
    </View>
  );
}
