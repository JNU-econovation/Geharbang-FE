import { View, Text, Animated } from "react-native";
import { useRef, useState, useEffect } from "react";
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
  const progressPercent = currentStep / totalSteps * 100

  const currentStepText = `${currentStep}/${totalSteps}`;
  const titleText = `${currentStep}단계: ${stepTitle}`;

  const loadValue = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(loadValue, {
      toValue: progressPercent,
      duration: 500,
      useNativeDriver: false,
    }).start();
  }, [currentStep]);

  const loadWidth= loadValue.interpolate({
    inputRange: [0, 100],
    outputRange: ["0%", "100%"],
    extrapolate: "clamp"
  });

  return (
    <View className="p-3">
      <View className="flex-row items-center justify-between mb-2">
        <Text className="text-gray-text">{titleText}</Text>
        <Text className="text-gray-text">{currentStepText}</Text>
      </View>

      <View className="h-2 bg-gray-border rounded-full ">
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
