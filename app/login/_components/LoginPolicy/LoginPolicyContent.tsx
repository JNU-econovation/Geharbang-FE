import TextSize from "@/src/components/ui/TextSize";
import { View } from "react-native";

interface ContentProps {
  contentTitle: string;
  contentText: string;
}

export default function LoginPolicyContent({
  contentTitle,
  contentText,
}: ContentProps) {
  return (
    <>
      <TextSize size={16} color='#101828' content={contentTitle} />

      <View className='pt-2' />
      <TextSize size={14} color='#364153' content={contentText} />
    </>
  );
}
