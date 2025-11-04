import { View } from "react-native";

import Flex from "@/src/components/layout/Flex";
import BackArrow from "@/src/components/ui/BackArrow";
import TextSize from "@/src/components/ui/TextSize";

interface BackArrorHeaderProps {
  content: string;
}

export default function BackArrorHeader({ content }: BackArrorHeaderProps) {
  return (
    <>
      <Flex items='center' justify='between' flexDir='row'>
        <BackArrow size={24} color='#000000' />
        <TextSize size={20} color='#101828' content={content} />
        <View className='w-8' />
      </Flex>
    </>
  );
}
