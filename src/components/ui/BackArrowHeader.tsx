import { View } from "react-native";

import Flex from "@/src/components/layout/Flex/Flex";
import BackArrow from "@/src/components/ui/BackArrow";
import TextSize from "@/src/components/ui/TextSize";

interface BackArrorHeaderProps {
  content: string;
  icon?: React.ReactNode;
}

export default function BackArrorHeader({
  content,
  icon,
}: BackArrorHeaderProps) {
  return (
    <>
      <Flex items='center' justify='between' dir='row'>
        <BackArrow size={24} color='#000000' />
        {icon && <View className='-mr-8' />}
        <TextSize size={20} color='#101828' content={content} />
        {icon ? icon : <View className='w-8' />}
      </Flex>
    </>
  );
}
