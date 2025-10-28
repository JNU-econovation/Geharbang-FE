import { router } from "expo-router";
import { View } from "react-native";

import Icon from "@/public/svgs/icon.svg";
import Flex from "@/src/components/layout/Flex";
import BackArrow from "@/src/components/ui/BackArrow";
import TextSize from "@/src/components/ui/TextSize";

export default function LoginHeader() {
  return (
    <View className='w-full h-3/5 bg-[#0EA5E9]'>
      <View className='pb-10'>
        <View className='px-4 pt-3'>
          <BackArrow
            onPress={() => router.back()}
            name='arrow-back'
            size={24}
            color='#ffffff'
          />
        </View>

        <Flex items='center' justify='start'>
          <Icon width={700} height={200} />

          <View className='-mt-5'>
            <TextSize size={30} color='#FFFFFF' content='게하르방' />
          </View>
          <View className='pt-1'>
            <TextSize
              size={18}
              color='#FFFFFF'
              content='제주도 게스트하우스 플랫폼'
            />
          </View>
        </Flex>
      </View>
    </View>
  );
}
