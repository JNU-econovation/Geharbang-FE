import { Image, View } from "react-native";

import Flex from "@/src/components/layout/Flex";
import CheckmarkCircle from "@/src/components/ui/CheckmarkCircle";
import TextSize from "@/src/components/ui/TextSize";
import { COLORS } from "@/src/utils/constants/colors";

interface SelectedApplicationProps {
  name: string;
  imageUrl: string;
}

export default function SelectedApplication({
  name,
  imageUrl,
}: SelectedApplicationProps) {
  return (
    <View className="gap-3 py-3 px-4 border-b border-gray-border">
      <Flex justify="start" items="center" flexDir="row" gap={10}>
        <Image src={imageUrl} className="rounded-full w-12 h-12" />
        <View className="gap-2">
          <TextSize size={17} content={name} />
          <TextSize
            size={12}
            color={COLORS.GRAY.TEXT}
            content={"공통 지원서"}
          />
        </View>
      </Flex>
      <TextSize
        size={13}
        color={COLORS.GRAY.TEXT}
        content={"작성 완료된 지원서를 사용합니다"}
      />

      <View className="absolute right-4 top-5">
        <CheckmarkCircle />
      </View>
    </View>
  );
}
