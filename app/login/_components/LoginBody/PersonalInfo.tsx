import { Pressable, View } from "react-native";
import Animated from "react-native-reanimated";

import CheckMark from "@/public/svgs/Login/checkMark.svg";
import Star from "@/public/svgs/Login/star.svg";

import Flex from "@/src/components/layout/Flex";
import TextSize from "@/src/components/ui/TextSize";
import { useShakeAnimation } from "@/src/hooks/Login/useShakeAnimation";
import PersonalInfoContext from "./PersonalInfoContext";

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
        <Flex items='center' justify='center' flexDir='row'>
          <PersonalInfoContext
            link='/login/service-use-condition'
            content='서비스 이용약관'
          />

          <TextSize size={14} color='#4B5563' content='과' />
          <View className='pr-1' />
          <PersonalInfoContext
            link='/login/privacy-policy'
            content='개인정보처리방침'
          />
          <TextSize size={14} color='#4B5563' content='에 동의합니다.' />
        </Flex>
      </View>
    </View>
  );
}
