import { Image, View } from "react-native";

import Flex from "@/src/components/layout/Flex";
import Tag from "@/src/components/ui/Tag";
import TextSize from "@/src/components/ui/TextSize";
import { GuestHouseCard } from "@/src/types/models/GuestHouseCard";
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
      <Flex justify="start" items="center" flexDir="row" gap={10}>
        <Image src={`${baseURL}${imageUrl}`} className="rounded-xl w-16 h-16" />
        <Flex justify="center" items="start" gap={6}>
          <TextSize size={17} content={name} />
          {region && (
            <TextSize size={12} color={COLORS.GRAY.TEXT} content={region} />
          )}
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
        </Flex>
      </Flex>
    </View>
  );
}
