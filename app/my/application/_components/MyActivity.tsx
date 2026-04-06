import { ReactNode } from "react";
import { View } from "react-native";

import ArrowRoute from "@/public/svgs/MyPage/arrowRoute.svg";

import TextSize from "@/src/components/ui/TextSize";

interface MyActivityProps {
  content: string;
  icon: ReactNode;
}

export default function MyActivity({ content, icon }: MyActivityProps) {
  return (
    <View className='pt-5 flex-row items-center justify-between'>
      <View className='flex-row items-center gap-3'>
        {icon}
        <TextSize color='#101828' size={16} content={content} />
      </View>

      <ArrowRoute width={22} height={22} />
    </View>
  );
}
