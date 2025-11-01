import { ScrollView, View } from "react-native";

import CustomSafeAreaView from "@/src/components/layout/CustomSafeAreaView";
import LoginPolicyContent from "../_components/LoginPolicy/LoginPolicyContent";
import LoginPolicyHeader from "../_components/LoginPolicy/LoginPolicyHeader";

export default function PrivacyPolicy() {
  return (
    <CustomSafeAreaView pageColor='bg-white'>
      <LoginPolicyHeader content='개인정보처리방침' />

      <ScrollView className='p-4'>
        <LoginPolicyContent
          contentTitle='1. 개인정보의 처리 목적'
          contentText={`게하르방(이하 "회사")은 다음의 목적을 위하여 개인정보를 처리합니다. 처리하고 있는 개인정보는 다음의 목적 이외의 용도로는 이용되지 않으며, 이용 목적이 변경되는 경우에는 개인정보 보호법 제18조에 따라 별도의 동의를 받는 등 필요한 조치를 이행할 예정입니다.
회원 가입 및 관리: 회원 가입의사 확인, 회원제 서비스 제공에 따른 본인 식별·인증, 회원자격 유지·관리
재화 또는 서비스 제공: 서비스 제공, 콘텐츠 제공, 맞춤 서비스 제공, 본인인증
마케팅 및 광고에의 활용: 신규 서비스 개발 및 맞춤 서비스 제공, 이벤트 및 광고성 정보 제공 및 참여기회 제공`}
        />

        <View className='pt-10' />

        <LoginPolicyContent
          contentTitle='2. 개인정보의 처리 및 보유기간'
          contentText={`1. 회사는 법령에 따른 개인정보 보유·이용기간 또는 정보주체로부터 개인정보를 수집시에 동의 받은 개인정보 보유·이용기간 내에서 개인정보를 처리·보유합니다.\n
2. 각각의 개인정보 처리 및 보유 기간은 다음과 같습니다:\n
회원 가입 및 관리: 회원 탈퇴 시까지
재화 또는 서비스 제공: 재화·서비스 공급완료 및 요금결제·정산 완료시까지
단, 관계법령 위반에 따른 수사·조사 등이 진행중인 경우에는 해당 수사·조사 종료시까지`}
        />
      </ScrollView>
    </CustomSafeAreaView>
  );
}
