import { router, type Href } from "expo-router";
import React, { ReactNode } from "react";
import { ActivityIndicator, View } from "react-native";

import TextSize from "@/src/components/ui/TextSize";
import { GuestHouseCard } from "@/src/types/models/GuestHouseCard";
import { COLORS } from "@/src/utils/constants/colors";
import { regions } from "@/src/utils/constants/regions";
import HorizontalSlider from "./HorizontalSlider";
import { ItemCard } from "./ItemCard";
import { ListLinkButton } from "./ListLinkButton";
import MoreCard from "./MoreCard";
import RegionTab from "./RegionTab";

interface SlideSectionLayoutProps {
  itemType: "stepNotice" | "guestHouse";
  title: string;
  icon: ReactNode;
  data: GuestHouseCard[];
  linkPath: Href;
  selectedRegion: string;
  setSelectedRegion: (region: string) => void;
  loading?: boolean;
  error?: boolean;
}

export function SlideSectionLayout({
  title,
  icon,
  data,
  itemType,
  linkPath,
  selectedRegion,
  setSelectedRegion,
  loading,
  error,
}: SlideSectionLayoutProps) {
  return (
    <View className="w-full items-center gap-3">
      <ListLinkButton
        label={title}
        icon={icon}
        onPress={() => router.push(linkPath)}
      />
      <HorizontalSlider
        data={regions}
        renderItem={(region) => (
          <RegionTab
            key={region}
            label={region}
            selected={selectedRegion === region}
            onPress={() => setSelectedRegion(region)}
          />
        )}
      />
      {loading ? (
        <ActivityIndicator size={80} color={COLORS.PRIMARY.BLUE} />
      ) : error ? (
        <View className="py-2">
          <TextSize size={14} color={COLORS.GRAY.TEXT} content="잠시 오류가 발생했어요" />
        </View>
      ) : data.length === 0 ? (
        <View className="py-2">
          <TextSize size={14} color={COLORS.GRAY.TEXT} content="해당 지역에 올라온 게시물이 없어요" />
        </View>
      ) : (
        <HorizontalSlider
          key={selectedRegion}
          data={data}
          renderItem={(item) => (
            <ItemCard key={item.id} {...item} type={itemType} />
          )}
          renderMoreCard={<MoreCard onPress={() => router.push(linkPath)} />}
        />
      )}
    </View>
  );
}
