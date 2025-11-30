import CustomSafeAreaView from "@/src/components/layout/CustomSafeAreaView";
import React from "react";
import { ScrollView, View } from "react-native";

import AdBanner from "../home/_components/AdBanner";
import { GuesthouseSection } from "../home/_components/GuesthouseSection";
import HomeHeader from "../home/_components/HomeHeader";
import { StepRecruitmentSection } from "../home/_components/StepRecruitmentSection";

export default function HomeScreen() {
  return (
    <CustomSafeAreaView pageColor="bg-white" topOnly={true}>
      <HomeHeader />

      <ScrollView className="py-4 flex-1 ">
        <View className="w-full items-center gap-9">
          <AdBanner />
          <GuesthouseSection />
          <StepRecruitmentSection />
        </View>
      </ScrollView>
    </CustomSafeAreaView>
  );
}
