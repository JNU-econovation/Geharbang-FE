import { Image, Pressable, useWindowDimensions, View } from "react-native";

import Flex from "@/src/components/layout//Flex/Flex";
import Tag from "@/src/components/ui/Tag/Tag";
import TextSize from "@/src/components/ui/TextSize";
import { useCardPress } from "@/src/hooks/Home/useCardPress";
import { GuestHouseCard } from "@/src/types/models/GuestHouseCard";
import { COLORS } from "@/src/utils/constants/colors";

interface GuesthouseCardProps extends GuestHouseCard {
  type: "guestHouse" | "stepNotice";
}

const baseURL = process.env.EXPO_PUBLIC_BASE_URL;

export function ItemCard({
  id,
  name,
  imageUrl,
  tags,
  type,
}: GuesthouseCardProps) {
  const { width: SCREEN_WIDTH } = useWindowDimensions();
  const CARD_WIDTH = SCREEN_WIDTH * 0.4;
  const handleCardPress = useCardPress(type, id);

  return (
    <View
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
        onPress={handleCardPress}
      >
        <Image
          source={{ uri: `${baseURL}${imageUrl}` }}
          className="w-full h-36"
        />
        <View className="p-3 gap-2">
          <TextSize
            size={16}
            color={COLORS.GRAY.TEXT}
            content={name}
            weight="semibold"
          />

          <Flex justify="start" items="center" dir="row" gap={3} wrap="wrap">
            {tags.map((tag, index) => (
              <Tag
                key={index}
                label={tag}
                variant="info"
                size="md"
                prefix="#"
              />
            ))}
          </Flex>
        </View>
      </Pressable>
    </View>
  );
}
