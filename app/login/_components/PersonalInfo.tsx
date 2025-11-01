import { Link } from "expo-router";
import { Pressable, View } from "react-native";

import Star from "@/public/svgs/Login/star.svg";
import TextSize from "@/src/components/ui/TextSize";

interface PersonalInfoProps {
  clicked: boolean;
  handleInfoClicked: () => void;
}

export default function PersonalInfo({
  clicked,

  handleInfoClicked,
}: PersonalInfoProps) {
  return (
    <View className='pt-6'>
      <View className='flex-row'>
        <Pressable onPress={handleInfoClicked}>
          <View
            className={`border rounded-sm w-4 h-4 ${
              clicked ? "bg-[#0EA5E9] border-[#0EA5E9]" : "border-gray-400"
            }`}
          />
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
