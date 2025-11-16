import TextSize from "@/src/components/ui/TextSize";
import { View } from "react-native";

interface WorkDateWeekProps {
  content: string;
}

export default function WorkDateWeek({ content }: WorkDateWeekProps) {
  return (
    <View className='h-10 w-10 bg-[#F3F4F6] rounded-lg flex items-center justify-center'>
      <TextSize size={14} color='#101828' content={content} />
    </View>
  );
}
