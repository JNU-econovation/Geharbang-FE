import { View } from "react-native";

import TextSize from "@/src/components/ui/TextSize";
import ViewContext from "@/src/components/ui/ViewContext/ViewContext";

interface WorkInfoDetailProps {
  icon: React.ReactNode;
  workInfoTitle: string;
  children: React.ReactNode;
}

export default function WorkInfoDetail({
  icon,
  workInfoTitle,
  children,
}: WorkInfoDetailProps) {
  return (
    <ViewContext variant='primary' className='px-4 py-3'>
      <View className='flex flex-row items-center'>
        <View className='w-10 h-10 bg-[#DFF2FE] rounded-full flex items-center justify-center'>
          {icon}
        </View>
        <View className='pr-5' />

        <TextSize size={16} color='#364153' content={workInfoTitle} />
      </View>

      <View className='pt-2' />
      <View className='flex flex-col '>{children}</View>
    </ViewContext>
  );
}
