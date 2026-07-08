import { View } from "react-native";

import Email from "@/public/svgs/StepDetail/contactIcon/email.svg";
import Insta from "@/public/svgs/StepDetail/contactIcon/insta.svg";
import Phone from "@/public/svgs/StepDetail/contactIcon/phone.svg";
import WebSite from "@/public/svgs/StepDetail/contactIcon/webSite.svg";

import ContactCompo from "@/app/step/stepDetail/_components/Contact/ContactCompo";
import SectionYPosition from "@/app/step/stepDetail/_components/SectionYPosition";
import TextSize from "@/src/components/ui/TextSize";
import ViewContext from "@/src/components/ui/ViewContext/ViewContext";
import { SetSectionYPositionProps } from "@/src/types/models/stepDetail/SetSectionYPosition";

interface ContactProps extends SetSectionYPositionProps {
  contact?: {
    email?: string;
    instagramId?: string;
    phoneNumber?: string;
    webSite?: string;
    reservationUrl?: string;
  };
  owerMessage?: string;
  webSiteTitle?: string;
}

export default function Contact({
  setSectionYPositions,
  contact,
  owerMessage,
  webSiteTitle = "웹사이트",
}: ContactProps) {
  const hasAnyContact =
    !!contact?.email ||
    !!contact?.instagramId ||
    !!contact?.phoneNumber ||
    !!contact?.webSite ||
    !!contact?.reservationUrl ||
    !!owerMessage;

  return (
    <SectionYPosition
      section='contact'
      content='연락처'
      setSectionYPositions={setSectionYPositions}
    >
      {!hasAnyContact && (
        <View className='pt-6'>
          <View className='bg-[#F9FAFB] rounded-lg p-3'>
            <TextSize color='#4A5565' size={14} content='등록된 연락처 정보가 없어요 🥲' />
          </View>
        </View>
      )}
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
            title={webSiteTitle}
            content={`${contact?.webSite}`}
            iconBg='#364153'
            redirect={contact?.webSite}
          />
        </View>
      )}

      {contact?.reservationUrl && (
        <View className='pt-4'>
          <ContactCompo
            variant='webSite'
            icon={<WebSite width={20} height={20} />}
            title='예약'
            content={`${contact?.reservationUrl}`}
            iconBg='#0EA5E9'
            redirect={contact?.reservationUrl}
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
