import { Link } from "expo-router";
import { Pressable, View } from "react-native";

import CheckMark from "@/public/svgs/Login/checkMark.svg";
import Star from "@/public/svgs/Login/star.svg";
import TextSize from "@/src/components/ui/TextSize";

import Flex from "@/src/components/layout/Flex";
import { useShakeAnimation } from "@/src/hooks/Login/useShakeAnimation";
import Animated from "react-native-reanimated";

interface PersonalInfoProps {
  isInfoAgreed: boolean;
  handleIsInfoAgreed: () => void;
  isLoginClicked: boolean;
}

export default function PersonalInfo({
  isInfoAgreed,
  handleIsInfoAgreed,
  isLoginClicked,
}: PersonalInfoProps) {
  const { animated } = useShakeAnimation({ isLoginClicked, isInfoAgreed });

  return (
    <View className='pt-6'>
      <View className='flex-row'>
        <Pressable onPress={handleIsInfoAgreed}>
          <Animated.View
            style={animated}
            className={"border rounded-sm w-4 h-4 border-gray-300"}
          >
            {isInfoAgreed && (
              <Flex items='center' justify='center'>
                <CheckMark width={13} height={13} />
              </Flex>
            )}
          </Animated.View>
        </Pressable>
        <View className='pr-1' />

        <Star width={6} height={6} />
        <View className='pr-1' />

        <Link href='/login/service-use-condition'>
          <View className='border-b border-[#0EA5E9]'>
            <TextSize size={14} color='#0EA5E9' content='서비스 이용약관' />
          </View>
        </Link>

        <TextSize size={14} color='#4B5563' content='과' />
        <View className='pl-1' />

        <Link href='/login/privacy-policy'>
          <View className='border-b border-[#0EA5E9]'>
            <TextSize size={14} color='#0EA5E9' content='개인정보처리방침' />
          </View>
        </Link>

        <TextSize size={14} color='#4B5563' content='에 동의합니다.' />
      </View>
    </View>
  );
}
