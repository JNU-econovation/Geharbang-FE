import { View } from "react-native";

import Flex from "@/src/components/layout/Flex";
import Button from "@/src/components/ui/Button";
import TextSize from "@/src/components/ui/TextSize";

import Google from "@/public/svgs/Login/google.svg";
import Kakao from "@/public/svgs/Login/kakao.svg";
import PersonalInfo from "./PersonalInfo";

export default function LoginBody() {
  return (
    <Flex items='center' justify='start'>
      <View className='pt-10'>
        <TextSize size={24} color='#1F2937' content='로그인' />
      </View>
      <View className='pt-2'>
        <TextSize
          size={16}
          color='#4B5563'
          content='제주도의 특별한 게스트하우스를 만나보세요'
        />
      </View>

      <View className='pt-7'>
        <Button
          width={327}
          height={56}
          bgColor='#FFFFFF'
          textColor='#1F1F1F'
          content='Googel 로그인'
          border='#D1D5DB'
          icon={<Google width={18} height={18} />}
        />
      </View>

      <View className='pt-4'>
        <Button
          width={327}
          height={56}
          bgColor='#FEE500'
          textColor='#1F2937'
          content='카카오 로그인'
          icon={<Kakao width={18} height={18} />}
        />
      </View>

      <PersonalInfo />
    </Flex>
  );
}
