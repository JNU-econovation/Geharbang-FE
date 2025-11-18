import { Linking, Pressable, View } from "react-native";

import ContactRedirect from "@/public/svgs/StepDetail/contactIcon/contactRedirect.svg";

import TextSize from "@/src/components/ui/TextSize";
import ViewContext from "@/src/components/ui/ViewContext/ViewContext";

interface ContactCompoProps {
  variant: "insta" | "phone" | "email" | "webSite";
  icon: React.ReactNode;
  title: string;
  content: string;
  iconBg: string;
  redirect: string;
}

export default function ContactCompo({
  variant,
  icon,
  title,
  content,
  iconBg,
  redirect,
}: ContactCompoProps) {
  return (
    <ViewContext
      variant={variant}
      height={74}
      className='items-center flex-row'
    >
      <View className='pr-5' />
      <View
        className='h-10 w-10 rounded-full flex items-center justify-center'
        style={{ backgroundColor: iconBg }}
      >
        {icon && icon}
      </View>

      <View className='pr-3' />
      <View className='w-60'>
        <TextSize color='#4A5565' size={12} content={title} />
        <View className='pt-1' />
        <TextSize color='#101828' size={14} content={content} />
      </View>

      <Pressable onPress={() => Linking.openURL(redirect)}>
        <ContactRedirect width={22} height={22} />
      </Pressable>
    </ViewContext>
  );
}
