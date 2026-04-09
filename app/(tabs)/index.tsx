import { useQueryClient } from "@tanstack/react-query";
import { useFocusEffect } from "expo-router";
import React, { useCallback, useEffect, useRef, useState } from "react";
import { BackHandler, RefreshControl, ScrollView, View } from "react-native";

import CustomSafeAreaView from "@/src/components/layout/CustomSafeAreaView";
import { useHomeStore } from "@/src/stores/home/useHomeStore";
import AdBanner from "../home/_components/AdBanner";
import { GuesthouseSection } from "../home/_components/GuesthouseSection";
import HomeHeader from "../home/_components/HomeHeader";
import { StepRecruitmentSection } from "../home/_components/StepRecruitmentSection";

const DEFAULT_REGION = "제주시";

export default function HomeScreen() {
  const queryClient = useQueryClient();
  const scrollViewRef = useRef<ScrollView>(null);
  const scrollYRef = useRef(0);
  const [refreshing, setRefreshing] = useState(false);
  const [ghRegion, setGhRegion] = useState(DEFAULT_REGION);
  const [stepRegion, setStepRegion] = useState(DEFAULT_REGION);
  const { refreshTrigger } = useHomeStore();

  const resetRegions = useCallback(() => {
    setGhRegion(DEFAULT_REGION);
    setStepRegion(DEFAULT_REGION);
  }, []);

  const handleRefresh = useCallback(async () => {
    setRefreshing(true);
    await new Promise((resolve) => setTimeout(resolve, 500));
    resetRegions();
    await Promise.all([
      queryClient.refetchQueries({ queryKey: ["guestHouseRecommendation"] }),
      queryClient.refetchQueries({ queryKey: ["stepRecommendation"] }),
    ]);
    setRefreshing(false);
  }, [queryClient, resetRegions]);

  // 홈 탭 재클릭 시 스크롤 상단 + 새로고침
  useEffect(() => {
    if (refreshTrigger > 0) {
      if (scrollYRef.current > 0) {
        scrollViewRef.current?.scrollTo({ y: 0, animated: true });
      }
      handleRefresh();
    }
  }, [refreshTrigger]);

  // Android 뒤로가기 → 앱 종료
  useFocusEffect(
    useCallback(() => {
      const subscription = BackHandler.addEventListener(
        "hardwareBackPress",
        () => {
          BackHandler.exitApp();
          return true;
        }
      );
      return () => subscription.remove();
    }, [])
  );

  return (
    <CustomSafeAreaView pageColor='bg-white' topOnly={true}>
      <HomeHeader />

      <ScrollView
        ref={scrollViewRef}
        className='py-4 flex-1'
        scrollEventThrottle={16}
        onScroll={(e) => {
          scrollYRef.current = e.nativeEvent.contentOffset.y;
        }}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={handleRefresh}
            colors={["#0EA5E9"]}
            tintColor='#0EA5E9'
          />
        }
      >
        <View className='w-full items-center gap-9 mb-8'>
          <AdBanner />
          <GuesthouseSection
            selectedRegion={ghRegion}
            setSelectedRegion={setGhRegion}
          />
          <StepRecruitmentSection
            selectedRegion={stepRegion}
            setSelectedRegion={setStepRegion}
          />
        </View>
      </ScrollView>
    </CustomSafeAreaView>
  );
}
