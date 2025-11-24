import { router, type Href } from "expo-router";
import React, { ReactNode } from "react";
import { View } from "react-native";

import { GuestHouseCard } from "@/src/types/models/GuestHouseCard";
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
}

export function SlideSectionLayout({
  title,
  icon,
  data,
  itemType,
  linkPath,
  selectedRegion,
  setSelectedRegion,
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

      <HorizontalSlider
        data={data}
        renderItem={(item) => (
          <ItemCard key={item.id} {...item} type={itemType} />
        )}
        renderMoreCard={<MoreCard onPress={() => router.push(linkPath)} />}
      />
    </View>
  );
}
