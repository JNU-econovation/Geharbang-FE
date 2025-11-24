import { View } from "react-native";

import Flex from "@/src/components/layout/Flex/Flex";
import TextSize from "@/src/components/ui/TextSize";

interface GehaDetailInfoProps {
  icon: React.ReactNode;
  content: string;
}

export default function GehaDetailInfo({ icon, content }: GehaDetailInfoProps) {
  return (
    <Flex items='center' justify='start' dir='row'>
      {icon}
      <View className='pr-2' />
      <TextSize size={14} color='#4A5565' content={content} />
    </Flex>
  );
}
