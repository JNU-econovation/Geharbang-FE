import { View } from "react-native";

import TextSize from "@/src/components/ui/TextSize";

export default function LoginFooter() {
  return (
    <View className='w-full h-20 items-center justify-center bg-white'>
      <TextSize
        size={12}
        color='#6B7280'
        content='게하르방과 함께하는 제주도 여행'
      />

      <View className='pt-1'>
        <TextSize
          size={12}
          color='#9CA3AF'
          content='© 2025 게하르방. All rights reserved.'
        />
      </View>
    </View>
  );
}
