import { ScrollView, View } from "react-native";

import CustomSafeAreaView from "@/src/components/layout/CustomSafeAreaView";
import BackArrorHeader from "../../../src/components/ui/BackArrorHeader";
import LoginPolicyContent from "../_components/LoginPolicy/LoginPolicyContent";

export default function ServiceUseCondition() {
  return (
    <CustomSafeAreaView pageColor='bg-white'>
      <>
        <View className='px-4 py-3'>
          <BackArrorHeader content='서비스 이용약관' />
        </View>

        <View className='pt-3' />
        <View className='border-b w-full border-[#E5E7EB]' />
      </>

      <ScrollView className='p-4'>
        <LoginPolicyContent
          contentTitle='제1조 (목적)'
          contentText='본 약관은 게하르방(이하 "회사"라 합니다)이 제공하는 제주도 게스트하우스 플랫폼 서비스(이하 "서비스"라 합니다)의 이용과 관련하여 회사와 이용자 간의 권리, 의무 및 책임사항, 기타 필요한 사항을 규정함을 목적으로 합니다.'
        />

        <View className='pt-10' />

        <LoginPolicyContent
          contentTitle='제2조 (용어의 정의)'
          contentText={`본 약관에서 사용하는 용어의 정의는 다음과 같습니다:\n
"서비스"라 함은 게하르방이 제공하는 제주도 게스트하우스 예약 및 관련 부가서비스를 의미합니다.
"이용자"라 함은 본 약관에 따라 회사가 제공하는 서비스를 받는 회원 및 비회원을 말합니다.
"회원"이라 함은 회사와 서비스 이용계약을 체결하고 이용자 아이디를 부여받은 자를 말합니다.
"게스트하우스"라 함은 서비스를 통해 숙박 서비스를 제공하는 사업자를 의미합니다.`}
        />

        <View className='pt-10' />

        <LoginPolicyContent
          contentTitle='제3조 (약관의 게시와 개정)'
          contentText={`1. 회사는 본 약관의 내용을 이용자가 쉽게 알 수 있도록 서비스 초기 화면에 게시합니다.\n
2. 회사는 필요한 경우 관련 법령을 위배하지 않는 범위에서 본 약관을 개정할 수 있습니다.`}
        />
      </ScrollView>
    </CustomSafeAreaView>
  );
}
