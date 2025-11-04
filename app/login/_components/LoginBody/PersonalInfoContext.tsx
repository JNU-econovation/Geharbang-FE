import { Href, Link } from "expo-router";
import { View } from "react-native";

import TextSize from "@/src/components/ui/TextSize";

interface PersonalInfoContextProps {
  link: Href;
  content: string;
}

export default function PersonalInfoContext({
  link,
  content,
}: PersonalInfoContextProps) {
  return (
    <Link href={link}>
      <View className='border-b border-[#0EA5E9]'>
        <TextSize size={14} color='#0EA5E9' content={content} />
      </View>
    </Link>
  );
}
