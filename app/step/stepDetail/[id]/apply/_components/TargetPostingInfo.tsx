import { Image, View } from "react-native";

import Flex from "@/src/components/layout/Flex/Flex";
import Tag from "@/src/components/ui/Tag/Tag";
import TextSize from "@/src/components/ui/TextSize";
import { GuestHouseCard } from "@/src/types/models/home/GuestHouseCard";
import { COLORS } from "@/src/utils/constants/colors";

const baseURL = process.env.EXPO_PUBLIC_BASE_URL;

export default function TargetPostingInfo({
  imageUrl,
  name,
  region,
  tags,
}: GuestHouseCard) {
  return (
    <View className="bg-[#F9FAFB] px-3 py-4 border border-gray-border">
      <Flex justify="start" items="center" dir="row" gap={10}>
        <Image src={`${baseURL}${imageUrl}`} className="rounded-xl w-16 h-16" />
        <Flex justify="center" items="start" gap={6}>
          <TextSize size={17} content={name} />
          {region && (
            <TextSize size={12} color={COLORS.GRAY.TEXT} content={region} />
          )}
          <Flex justify="start" items="center" dir="row" gap={3} wrap="wrap">
            {tags.map((tag, index) => (
              <Tag
                key={index}
                label={tag}
                variant="info"
                size="sm"
                prefix="#"
              />
            ))}
          </Flex>
        </Flex>
      </Flex>
    </View>
  );
}
