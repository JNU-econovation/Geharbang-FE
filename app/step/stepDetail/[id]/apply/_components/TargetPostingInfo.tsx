import { Image, View } from "react-native";

import Flex from "@/src/components/layout/Flex/Flex";
import Tag from "@/src/components/ui/Tag/Tag";
import TextSize from "@/src/components/ui/TextSize";
import { COLORS } from "@/src/utils/constants/colors";
import { buildAssetUrl } from "@/src/config/url";

interface TargetPostingInfoProps {
  imageUrl: string;
  guestHouseName: string;
  tags: string[];
  region?: string;
}

export default function TargetPostingInfo({
  imageUrl,
  guestHouseName,
  region,
  tags,
}: TargetPostingInfoProps) {
  const imageUri = buildAssetUrl(imageUrl);

  return (
    <View className='bg-[#F9FAFB] px-3 py-4 border border-gray-border'>
      <Flex justify='start' items='center' dir='row' gap={10}>
        {imageUri ? (
          <Image
            source={{ uri: imageUri }}
            className='rounded-xl w-16 h-16'
          />
        ) : (
          <View className='rounded-xl w-16 h-16 bg-gray-100' />
        )}
        <Flex justify='center' items='start' gap={6}>
          <TextSize size={17} content={guestHouseName} />
          {region && (
            <TextSize size={12} color={COLORS.GRAY.TEXT} content={region} />
          )}
          <Flex justify='start' items='center' dir='row' gap={3} wrap='wrap'>
            {tags.map((tag, index) => (
              <Tag
                key={index}
                label={tag}
                variant='info'
                size='sm'
                prefix='#'
              />
            ))}
          </Flex>
        </Flex>
      </Flex>
    </View>
  );
}
