import Flex from "@/src/components/layout/Flex";
import BackArrow from "@/src/components/ui/BackArrow";
import TextSize from "@/src/components/ui/TextSize";
import { View } from "react-native";

interface HeaderProps {
  content: string;
}

export default function LoginPolicyHeader({ content }: HeaderProps) {
  return (
    <>
      <View className='px-4 pt-3'>
        <Flex items='center' justify='between' flexDir='row'>
          <BackArrow size={24} color='#000000' />
          <TextSize size={20} color='#101828' content={content} />
          <View className='w-8' />
        </Flex>
      </View>

      <View className='pt-5' />
      <View className='border-b w-full border-[#E5E7EB]' />
    </>
  );
}
