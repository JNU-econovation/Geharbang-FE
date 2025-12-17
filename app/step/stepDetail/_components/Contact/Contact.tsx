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

interface ContactProps extends SetSectionYPositionProps {
  contact?: {
    email: string;
    instagramId: string;
    phoneNumber: string;
    webSite: string;
  };
  owerMessage?: string;
}

export default function Contact({
  setSectionYPositions,
  contact,
  owerMessage,
}: ContactProps) {
  return (
    <SectionYPosition
      section='contact'
      content='연락처'
      setSectionYPositions={setSectionYPositions}
    >
      {contact?.instagramId && (
        <View className='pt-6'>
          <ContactCompo
            variant='insta'
            icon={<Insta width={20} height={20} />}
            title='Instagram'
            content={`${contact?.instagramId}`}
            iconBg='#F6339A'
            redirect={`https://www.instagram.com/${contact?.instagramId}/`}
          />
        </View>
      )}

      {contact?.phoneNumber && (
        <View className='pt-4'>
          <ContactCompo
            variant='phone'
            icon={<Phone width={20} height={20} />}
            title='전화번호'
            content={`${contact?.phoneNumber}`}
            iconBg='#00C950'
            redirect={`tel:${contact?.phoneNumber}`}
          />
        </View>
      )}

      {contact?.email && (
        <View className='pt-4'>
          <ContactCompo
            variant='email'
            icon={<Email width={20} height={20} />}
            title='이메일'
            content={`${contact?.email}`}
            iconBg='#2B7FFF'
            redirect={`mailto:${contact?.email}`}
          />
        </View>
      )}

      {contact?.webSite && (
        <View className='pt-4'>
          <ContactCompo
            variant='webSite'
            icon={<WebSite width={20} height={20} />}
            title='웹사이트'
            content={`${contact?.webSite}`}
            iconBg='#364153'
            redirect={contact?.webSite}
          />
        </View>
      )}

      {owerMessage && (
        <View className='pt-4'>
          <ViewContext variant='owerMes' minHeight={74}>
            <View className='px-4 py-3'>
              <TextSize size={14} color='#973C00' content={owerMessage ?? ""} />
            </View>
          </ViewContext>
        </View>
      )}
    </SectionYPosition>
  );
}
