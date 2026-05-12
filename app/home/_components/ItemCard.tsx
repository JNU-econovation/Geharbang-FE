import { Image, Pressable, useWindowDimensions, View } from "react-native";

import Flex from "@/src/components/layout//Flex/Flex";
import Tag from "@/src/components/ui/Tag/Tag";
import TextSize from "@/src/components/ui/TextSize";
import { useCardPress } from "@/src/hooks/home/useCardPress";
import {
  guestHouseRecommendationCard,
  StepRecommendationCard,
} from "@/src/types/models/home/GuestHouseCard";
import { COLORS } from "@/src/utils/constants/colors";
import { buildAssetUrl } from "@/src/config/url";

interface ItemCardProps {
  item: StepRecommendationCard | guestHouseRecommendationCard;
  type: "guestHouse" | "stepNotice";
}

export function ItemCard({ item, type }: ItemCardProps) {
  const { width: SCREEN_WIDTH } = useWindowDimensions();
  const CARD_WIDTH = SCREEN_WIDTH * 0.4;
  const handleCardPress = useCardPress(type, item.id);
  const imageUri = buildAssetUrl(item.imageUrl);

  const isGuestHouse = type === "guestHouse";
  const displayName = isGuestHouse
    ? (item as guestHouseRecommendationCard).guestHouseName
    : (item as StepRecommendationCard).name;

  return (
    <View
      className='rounded-2xl border border-gray-border bg-white'
      style={{
        width: CARD_WIDTH,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.2,
        shadowRadius: 3,
      }}
    >
      <Pressable
        className='rounded-2xl overflow-hidden'
        onPress={handleCardPress}
      >
        {imageUri ? (
          <Image
            source={{ uri: imageUri }}
            className='w-full h-36'
          />
        ) : (
          <View className='w-full h-36 bg-gray-100' />
        )}
        <View className='p-3 gap-2'>
          <TextSize
            size={16}
            color={COLORS.GRAY.TEXT}
            content={displayName}
            weight='semibold'
          />

          <Flex justify='start' items='center' dir='row' gap={3} wrap='wrap'>
            {item.tags.map((tag, index) => (
              <Tag
                key={index}
                label={tag}
                variant='info'
                size='md'
                prefix='#'
              />
            ))}
          </Flex>
        </View>
      </Pressable>
    </View>
  );
}
