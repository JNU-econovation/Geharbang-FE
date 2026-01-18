import { View } from "react-native";

import TextSize from "@/src/components/ui/TextSize";
import { ReactNode } from "react";

interface MyApplicationCompoLayoutProps {
  icon: ReactNode;
  bgColor: string;
  titleContent: string;
  chidren: ReactNode;
}

export default function MyApplicationCompoLayout({
  icon,
  bgColor,
  titleContent,
  chidren,
}: MyApplicationCompoLayoutProps) {
  return (
    <View className='flex-row gap-4'>
      <View
        className='p-3 rounded-full flex items-center justify-center'
        style={{ backgroundColor: bgColor }}
      >
        {icon}
      </View>
      <View>
        <TextSize color='#4A5565' size={16} content={titleContent} />
        <View className='pt-1' />
        {chidren}
      </View>
    </View>
  );
}
