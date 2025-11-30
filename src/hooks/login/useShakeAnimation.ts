import { useEffect } from "react";
import { Vibration } from "react-native";

import {
  useAnimatedStyle,
  useSharedValue,
  withSequence,
  withTiming,
} from "react-native-reanimated";

import { ViewStyle } from "react-native";
import { AnimatedStyle } from "react-native-reanimated";

interface useShakeAnimationProps {
  isLoginClicked: boolean;
  isInfoAgreed: boolean;
}

interface useShakeAnimationReturn {
  animated: AnimatedStyle<ViewStyle>;
}

export const useShakeAnimation = ({
  isLoginClicked,
  isInfoAgreed,
}: useShakeAnimationProps): useShakeAnimationReturn => {
  const translateX = useSharedValue(0);

  useEffect(() => {
    if (isLoginClicked && !isInfoAgreed) {
      Vibration.vibrate(200);

      translateX.value = withSequence(
        withSequence(
          withTiming(-2, { duration: 50 }),
          withTiming(2, { duration: 50 }),
          withTiming(-2, { duration: 50 }),
          withTiming(2, { duration: 50 }),
          withTiming(0, { duration: 50 })
        )
      );
    }
  }, [isLoginClicked]);

  const animated = useAnimatedStyle(() => ({
    transform: [{ translateX: translateX.value }],
  }));

  return { animated };
};
