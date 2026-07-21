import { useQueryClient } from "@tanstack/react-query";
import { useFocusEffect } from "expo-router";
import React, { useCallback, useEffect, useRef, useState } from "react";
import { BackHandler, RefreshControl, ScrollView, View } from "react-native";
import { StatusBar } from "expo-status-bar";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import { useHomeStore } from "@/src/stores/home/useHomeStore";
import { GuesthouseSection } from "../home/_components/GuesthouseSection";
import { StepRecruitmentSection } from "../home/_components/StepRecruitmentSection";
import WeeklyPickSlideshow from "../home/_components/WeeklyPickSlideshow";

const DEFAULT_REGION = "제주시";

export default function HomeScreen() {
  const queryClient = useQueryClient();
  const insets = useSafeAreaInsets();
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
    try {
      await new Promise((resolve) => setTimeout(resolve, 500));
      resetRegions();
      await Promise.all([
        queryClient.refetchQueries({ queryKey: ["guestHouseRecommendation"] }),
        queryClient.refetchQueries({ queryKey: ["stepRecommendation"] }),
      ]);
    } catch (error) {
      console.error("Refresh failed:", error);
    } finally {
      setRefreshing(false);
    }
  }, [queryClient, resetRegions]);

  useEffect(() => {
    if (refreshTrigger > 0) {
      if (scrollYRef.current > 0) {
        scrollViewRef.current?.scrollTo({ y: 0, animated: true });
      }
      handleRefresh();
    }
  }, [refreshTrigger]);

  useFocusEffect(
    useCallback(() => {
      const subscription = BackHandler.addEventListener(
        "hardwareBackPress",
        () => {
          BackHandler.exitApp();
          return true;
        },
      );
      return () => subscription.remove();
    }, []),
  );

  return (
    <View style={{ flex: 1, backgroundColor: "black" }}>
      <StatusBar style='light' translucent />
      <ScrollView
        ref={scrollViewRef}
        contentInsetAdjustmentBehavior='never'
        scrollEventThrottle={16}
        bounces={false}
        style={{ backgroundColor: "white" }}
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
        <WeeklyPickSlideshow />

        <View style={{ paddingBottom: insets.bottom + 16, gap: 8, backgroundColor: "white" }}>
          <GuesthouseSection
            selectedRegion={ghRegion}
            setSelectedRegion={setGhRegion}
          />
          <View style={{ height: 15, backgroundColor: "#F3F4F6" }} />
          <StepRecruitmentSection
            selectedRegion={stepRegion}
            setSelectedRegion={setStepRegion}
          />
        </View>
      </ScrollView>
    </View>
  );
}
