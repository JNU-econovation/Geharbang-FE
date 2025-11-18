import { useEffect, useRef } from "react";
import { Animated } from "react-native";

export function useProgressAnimation(progressPercent: number) {
  const loadValue = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(loadValue, {
      toValue: progressPercent,
      duration: 500,
      useNativeDriver: false,
    }).start();
  }, [progressPercent]);

  const loadWidth = loadValue.interpolate({
    inputRange: [0, 100],
    outputRange: ["0%", "100%"],
    extrapolate: "clamp",
  });

  return { loadWidth };
}
