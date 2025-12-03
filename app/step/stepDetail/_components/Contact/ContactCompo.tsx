import { Pressable, View } from "react-native";

import ContactRedirect from "@/public/svgs/StepDetail/contactIcon/contactRedirect.svg";
import Arrow from "@/public/svgs/StepDetail/modal/arrow.svg";

import TextSize from "@/src/components/ui/TextSize";
import ViewContext from "@/src/components/ui/ViewContext/ViewContext";
import { handleOpenURL } from "@/src/utils/\bstepDetail/openURL";

interface ContactCompoProps {
  variant: "insta" | "phone" | "email" | "webSite" | "modalApply";
  icon: React.ReactNode;
  title: string;
  content: string;
  iconBg: string;
  redirect?: string;
  isModal?: boolean;
}

export default function ContactCompo({
  variant,
  icon,
  title,
  content,
  iconBg,
  redirect,
  isModal,
}: ContactCompoProps) {
  return (
    <ViewContext
      variant={variant}
      minHeight={74}
      className='items-center flex-row'
    >
      <View className='pr-3' />
      <View
        className='h-10 w-10 rounded-full flex items-center justify-center'
        style={{ backgroundColor: iconBg }}
      >
        {icon && icon}
      </View>

      <View className='pr-5' />
      <View className='w-60'>
        <TextSize
          color={isModal ? "#101828" : "#4A5565"}
          size={isModal ? 16 : 12}
          content={title}
        />
        <View className='pt-1' />
        <TextSize
          color={isModal ? "#4A5565" : "#101828"}
          size={isModal ? 12 : 14}
          content={content}
        />
      </View>

      {isModal ? (
        <Arrow width={22} height={22} />
      ) : (
        <Pressable onPress={() => handleOpenURL({ redirect })}>
          <ContactRedirect width={22} height={22} />
        </Pressable>
      )}
    </ViewContext>
  );
}
