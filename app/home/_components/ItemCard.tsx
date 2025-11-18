import { router } from "expo-router";
import { Dimensions, Image, Pressable, View } from "react-native";

import Flex from "@/src/components/layout/Flex";
import Tag from "@/src/components/ui/Tag";
import TextSize from "@/src/components/ui/TextSize";
import { GuestHouseCard } from "@/src/types/models/GuestHouseCard";
import { COLORS } from "@/src/utils/constants/colors";

interface GuesthouseCardProps extends GuestHouseCard {
  type: "guestHouse" | "stepNotice";
}

export function ItemCard({
  id,
  name,
  imageUrl,
  tags,
  type,
}: GuesthouseCardProps) {
  const { width: SCREEN_WIDTH } = Dimensions.get("window");
  const CARD_WIDTH = SCREEN_WIDTH * 0.4;

  return (
    <View
      key={id}
      className="rounded-2xl border border-gray-border bg-white"
      style={{
        width: CARD_WIDTH,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.2,
        shadowRadius: 3,
      }}
    >
      <Pressable
        className="rounded-2xl overflow-hidden"
        onPress={() => {
          if (type === "guestHouse") {
            //추후 추가 에정
          }
          if (type === "stepNotice") {
            router.push({
              pathname: "/step/[id]",
              params: { id: id },
            });
          }
        }}
      >
        <Image source={{ uri: imageUrl }} className="w-full h-36" />
        <View className="p-3 gap-2">
          <TextSize
            size={16}
            color={COLORS.GRAY.TEXT}
            content={name}
            weight="semibold"
          />

          <Flex
            justify="start"
            items="center"
            flexDir="row"
            gap={3}
            flexWrap="wrap"
          >
            {tags.map((tag) => (
              <Tag key={tag} size={12} content={"# " + tag} />
            ))}
          </Flex>
        </View>
      </Pressable>
    </View>
  );
}
