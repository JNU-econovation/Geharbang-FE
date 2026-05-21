import { router, useLocalSearchParams } from "expo-router";
import { View } from "react-native";

import CustomSafeAreaView from "@/src/components/layout/CustomSafeAreaView";
import TextSize from "@/src/components/ui/TextSize";
import ResultLayout from "../../../src/components/layout/ResultLayout";

export default function CreateResultScreen() {
  const { status } = useLocalSearchParams();
  const goHome = () => router.replace("/(tabs)");

  return (
    <CustomSafeAreaView pageColor='bg-white'>
      <View className='p-3 items-center'>
        <TextSize size={18} content='지원서 작성 완료' />
      </View>

      <View className='h-full px-3 pt-8 bg-[#F9FAFB]'>
        {status === "pending" && (
          <ResultLayout
            status='pending'
            title='제출 중...'
            description='지원서를 제출하고 있습니다'
            primary={{ label: "제출 중..." }}
          />
        )}

        {status === "success" && (
          <ResultLayout
            status='success'
            title='지원서 작성 완료!'
            description='공통 지원서를 성공적으로 작성했습니다.'
            primary={{
              label: "→ 스텝 지원하러 가기",
              onPress: () => router.replace("/step"),
            }}
            secondary={{ label: "내 지원서 확인", icon: "reader-outline", onPress: () => router.replace("/my/application" as any) }}
            tertiary={{
              label: "홈으로 돌아가기",
              onPress: goHome,
              icon: "home-outline",
            }}
          />
        )}

        {status === "error" && (
          <ResultLayout
            status='error'
            title='제출 실패'
            description={
              "지원서 제출 중 오류가 발생했습니다.\n잠시 후 다시 시도해주세요."
            }
            primary={{
              label: "다시 시도",
              onPress: () => router.replace("/application/create/step2"),
            }}
            tertiary={{
              label: "홈으로 돌아가기",
              onPress: goHome,
              icon: "home-outline",
            }}
          />
        )}
      </View>
    </CustomSafeAreaView>
  );
}
