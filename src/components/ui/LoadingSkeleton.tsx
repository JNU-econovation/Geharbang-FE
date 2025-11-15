import React, { useEffect, useRef } from 'react';
import { Animated, View } from 'react-native';

interface LoadingSkeletonProps {
  count?: number;
}

export default function LoadingSkeleton({ count = 5 }: LoadingSkeletonProps) {
  const fadeAnim = useRef(new Animated.Value(0.3)).current;

  useEffect(() => {
    const animation = Animated.loop(
      Animated.sequence([
        Animated.timing(fadeAnim, {
          toValue: 1,
          duration: 750,
          useNativeDriver: true,
        }),
        Animated.timing(fadeAnim, {
          toValue: 0.3,
          duration: 750,
          useNativeDriver: true,
        }),
      ]),
    );
    animation.start();
    return () => animation.stop();
  }, [fadeAnim]);

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
    <View className="flex-row items-center bg-white border border-gray-200 rounded-xl px-4 py-4 mb-3">
      <Animated.View
        className="w-16 h-16 bg-gray-200 rounded-lg"
        style={{ opacity: fadeAnim }}
      />

      <View className="flex-1 ml-3">
        <Animated.View
          className="h-4 bg-gray-200 rounded mb-2"
          style={{ opacity: fadeAnim, width: '70%' }}
        />

        <Animated.View
          className="h-3 bg-gray-200 rounded mb-2"
          style={{ opacity: fadeAnim, width: '50%' }}
        />

        <Animated.View
          className="h-5 bg-gray-200 rounded"
          style={{ opacity: fadeAnim, width: '40%' }}
        />
      </View>

      <Animated.View
        className="w-4 h-4 bg-gray-200 rounded-full ml-2"
        style={{ opacity: fadeAnim }}
      />
    </View>
  );
}
