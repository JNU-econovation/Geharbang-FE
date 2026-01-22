import { usePulseAnimation } from "@/src/hooks/usePulseAnimation";
import { COLORS } from "@/src/utils/constants/colors";
import React from "react";
import { ActivityIndicator, Animated, View } from "react-native";

interface LoadingSkeletonProps {
  variant?: "simple" | "card";
  count?: number;
}

export default function LoadingSkeleton({
  variant = "simple",
  count = 5,
}: LoadingSkeletonProps) {
  const fadeAnim = usePulseAnimation();
  if (variant === "simple") {
    return (
      <View className='flex-1 justify-center items-center py-10 h-64'>
        <ActivityIndicator size={80} color={COLORS.PRIMARY.BLUE} />
      </View>
    );
  }

  return (
    <>
      {Array.from({ length: count }).map((_, index) => (
        <SkeletonCard key={index} fadeAnim={fadeAnim} />
      ))}
    </>
  );
}

interface SkeletonCardProps {
  fadeAnim: Animated.Value;
}

function SkeletonCard({ fadeAnim }: SkeletonCardProps) {
  return (
    <View className='mx-4 bg-white border border-gray-200 rounded-xl px-4 pt-4 pb-4 mb-3'>
      <View className='flex-row'>
        <Animated.View
          className='w-16 h-16 bg-gray-200 rounded-lg'
          style={{ opacity: fadeAnim }}
        />

        <View className='flex-1 ml-3'>
          <Animated.View
            className='h-4 bg-gray-200 rounded mb-2'
            style={{ opacity: fadeAnim, width: "70%" }}
          />

          <Animated.View
            className='h-3 bg-gray-200 rounded mb-2'
            style={{ opacity: fadeAnim, width: "50%" }}
          />

          <Animated.View
            className='h-5 bg-gray-200 rounded'
            style={{ opacity: fadeAnim, width: "40%" }}
          />
        </View>

        <Animated.View
          className='w-4 h-4 bg-gray-200 rounded-full ml-2'
          style={{ opacity: fadeAnim }}
        />
      </View>
    </View>
  );
}
