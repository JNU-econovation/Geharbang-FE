import { View } from "react-native";

import TextSize from "@/src/components/ui/TextSize";
import ViewContext from "@/src/components/ui/ViewContext/ViewContext";

interface WorkInfoDetailProps {
  icon: React.ReactNode;
  workInfoTitle: string;
  workInfoContent: string;
}

export default function WorkInfoDetail({
  icon,
  workInfoTitle,
  workInfoContent,
}: WorkInfoDetailProps) {
  return (
    <ViewContext
      variant='primary'
      height={74}
      className='flex items-center justify-start flex-row'
    >
      <View className='pl-3' />
      <View className='w-10 h-10 bg-[#DFF2FE] rounded-full flex items-center justify-center'>
        {icon}
      </View>
      <View className='pr-5' />
      <View>
        <TextSize size={16} color='#364153' content={workInfoTitle} />
        <View className='pt-1' />
        <TextSize size={12} color='#364153' content={workInfoContent} />
      </View>
    </ViewContext>
  );
}
