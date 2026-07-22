import { Pressable, Text, View } from "react-native";
import CachedImage from "@/src/components/ui/CachedImage";

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

const CARD_SIZE = 164;

export function ItemCard({ item, type }: ItemCardProps) {
  const handleCardPress = useCardPress(type, item.id);
  const imageUri = buildAssetUrl(item.imageUrl);

  const isGuestHouse = type === "guestHouse";
  const displayName = isGuestHouse
    ? (item as guestHouseRecommendationCard).guestHouseName
    : (item as StepRecommendationCard).name;
  const ghItem = item as guestHouseRecommendationCard;
  const stepItem = item as StepRecommendationCard;
  const displayAddress = isGuestHouse
    ? (ghItem.address ?? ghItem.location ?? ghItem.region)
    : (stepItem.address ?? stepItem.region);

  return (
    <View style={{ width: CARD_SIZE }}>
      <Pressable onPress={handleCardPress}>
        <View style={{ borderRadius: 16, overflow: "hidden" }}>
          {imageUri ? (
            <CachedImage uri={imageUri} style={{ width: CARD_SIZE, height: CARD_SIZE }} />
          ) : (
            <View style={{ width: CARD_SIZE, height: CARD_SIZE, backgroundColor: "#E5E7EB" }} />
          )}
        </View>

        <View style={{ marginTop: 8, gap: 3 }}>
          <Text
            style={{ fontSize: 13, fontWeight: "600", color: "#111827" }}
            numberOfLines={1}
          >
            {displayName}
          </Text>
          <Text
            style={{ fontSize: 12, color: COLORS.GRAY.TEXT }}
            numberOfLines={1}
          >
            {displayAddress ?? ""}
          </Text>
        </View>
      </Pressable>
    </View>
  );
}

export default ItemCard;
