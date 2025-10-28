import { View } from "react-native";

import Flex from "@/src/components/layout/Flex";
import Button from "@/src/components/ui/Button";
import TextSize from "@/src/components/ui/TextSize";

import Google from "@/public/svgs/Login/google.svg";
import Kakao from "@/public/svgs/Login/kakao.svg";
import Star from "@/public/svgs/Login/star.svg";

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
          content='Sign in with Google'
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

      <View className='pt-6'>
        <View className='flex-row'>
          <View className='border rounded-sm w-4 h-4' />
          <View className='pr-1' />

          <Star width={6} height={6} />
          <View className='pr-1' />

          <View className='border-b border-[#0EA5E9]'>
            <TextSize size={14} color='#0EA5E9' content='서비스 이용약관' />
          </View>

          <TextSize size={14} color='#4B5563' content='과' />
          <View className='pl-1' />

          <View className='border-b border-[#0EA5E9]'>
            <TextSize size={14} color='#0EA5E9' content='개인정보처리방침' />
          </View>

          <TextSize size={14} color='#4B5563' content='에 동의합니다.' />
        </View>
      </View>
    </Flex>
  );
}
