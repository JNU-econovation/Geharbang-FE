import { router, type Href } from "expo-router";
import React from "react";
import { ActivityIndicator, Pressable, Text, View } from "react-native";
import {
  guestHouseRecommendationCard,
  StepRecommendationCard,
} from "@/src/types/models/home/GuestHouseCard";
import { COLORS } from "@/src/utils/constants/colors";
import TextSize from "@/src/components/ui/TextSize";
import { regions } from "@/src/utils/constants/regions";
import HorizontalSlider from "./HorizontalSlider";
import { ItemCard } from "./ItemCard";
import RegionTab from "./RegionTab";

interface SlideSectionLayoutProps<T> {
  itemType: "stepNotice" | "guestHouse";
  titleLine1: string;
  titleLine2: string;
  data: T[];
  linkPath: Href;
  selectedRegion: string;
  setSelectedRegion: (region: string) => void;
  loading?: boolean;
  error?: boolean;
}

export function SlideSectionLayout<
  T extends guestHouseRecommendationCard | StepRecommendationCard
>({
  titleLine1,
  titleLine2,
  data,
  itemType,
  linkPath,
  selectedRegion,
  setSelectedRegion,
  loading,
  error,
}: SlideSectionLayoutProps<T>) {
  return (
    <View className='w-full gap-1.5'>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "flex-end",
          paddingHorizontal: 24,
          marginTop: 20,
         marginBottom:2
        }}
      >
        <View style={{ gap: 4 }}>
          <Text style={{ fontSize: 20, fontWeight: "600", lineHeight: 28 }}>{titleLine1}</Text>
          <Text style={{ fontSize: 20, fontWeight: "600", lineHeight: 28 }}>{titleLine2}</Text>
        </View>
        <Pressable onPress={() => router.push(linkPath)}>
          <Text style={{ fontSize: 16, color: "#B1B1B1", paddingBottom: 4, marginBottom: 4 ,borderBottomWidth: 1, borderBottomColor: "#B1B1B1" }}>
            더보기
          </Text>
        </Pressable>
      </View>

      <HorizontalSlider
        data={regions}
        renderItem={(region) => (
          <RegionTab
            key={region.value}
            label={region.label}
            selected={selectedRegion === region.value}
            onPress={() => setSelectedRegion(region.value)}
          />
        )}
        contentContainerStyle={{ paddingHorizontal: 24, paddingVertical: 4, gap: 6.5 }}
      />

      {loading ? (
        <View className='pt-2 h-48 items-center justify-center'>
          <ActivityIndicator size={60} color={COLORS.PRIMARY.BLUE} />
        </View>
      ) : error ? (
        <View className='py-2 px-6'>
          <TextSize
            size={14}
            color={COLORS.GRAY.TEXT}
            content='잠시 오류가 발생했어요'
          />
        </View>
      ) : data.length === 0 ? (
        <View className='py-2 px-6'>
          <TextSize
            size={14}
            color={COLORS.GRAY.TEXT}
            content='해당 지역에 올라온 게시물이 없어요'
          />
        </View>
      ) : (
        <HorizontalSlider
          key={selectedRegion}
          data={data}
          renderItem={(item) => (
            <ItemCard key={item.id} item={item} type={itemType} />
          )}
          contentContainerStyle={{ paddingHorizontal: 24, paddingBottom: 15, gap: 12 }}
        />
      )}
    </View>
  );
}

export default SlideSectionLayout;
