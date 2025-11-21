import { View } from "react-native";

import Email from "@/public/svgs/StepDetail/contactIcon/email.svg";
import Insta from "@/public/svgs/StepDetail/contactIcon/insta.svg";
import Phone from "@/public/svgs/StepDetail/contactIcon/phone.svg";
import WebSite from "@/public/svgs/StepDetail/contactIcon/webSite.svg";

import TextSize from "@/src/components/ui/TextSize";
import ViewContext from "@/src/components/ui/ViewContext/ViewContext";
import { SetSectionYPositionProps } from "@/src/types/models/stepDetail/SetSectionYPosition";

import SectionYPosition from "../SectionYPosition";
import ContactCompo from "./ContactCompo";

export default function Contact({
  setSectionYPositions,
}: SetSectionYPositionProps) {
  return (
    <SectionYPosition
      section='contact'
      content='연락처'
      setSectionYPositions={setSectionYPositions}
    >
      <View className='pt-6' />

      <ContactCompo
        variant='insta'
        icon={<Insta width={20} height={20} />}
        title='Instagram'
        content='@jeju_oceanview_house'
        iconBg='#F6339A'
        redirect={`https://jejuoceanview.com`} // scheme + contentx
      />

      <View className='pt-4' />
      <ContactCompo
        variant='phone'
        icon={<Phone width={20} height={20} />}
        title='전화번호'
        content='010-1234-5678'
        iconBg='#00C950'
        redirect={`tel:010-1234-5678`}
      />

      <View className='pt-4' />
      <ContactCompo
        variant='email'
        icon={<Email width={20} height={20} />}
        title='이메일'
        content='info@jejuoceanview.com'
        iconBg='#2B7FFF'
        redirect={`mailto:jdyjsh77@naver.com`}
      />

      <View className='pt-4' />
      <ContactCompo
        variant='webSite'
        icon={<WebSite width={20} height={20} />}
        title='웹사이트'
        content='jejuoceanview.com'
        iconBg='#364153'
        redirect={`https://jejuoceanview.com`}
      />

      <View className='pt-4' />

      <ViewContext variant='owerMes' height={74}>
        <View className='px-4 py-3'>
          <TextSize
            size={14}
            color='#973C00'
            content='💡 궁금한 점이 있으시면 언제든지 연락주세요. 빠르고 친절하게 답변 드리겠습니다!'
          />
        </View>
      </ViewContext>
    </SectionYPosition>
  );
}
