import { router, useLocalSearchParams } from "expo-router";
import { View } from "react-native";

import CustomSafeAreaView from "@/src/components/layout/CustomSafeAreaView";
import ResultLayout from "@/src/components/layout/ResultLayout";
import TextSize from "@/src/components/ui/TextSize";

export default function ApplyResultScreen() {
  const { status } = useLocalSearchParams();
  const goHome = () => router.replace("/(tabs)");
  const goStepList = () => router.replace("/step");

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
            title='지원 완료!'
            description={
              "사장님이 지원서를 검토 중입니다 \n 보통 1-3일 내 연락드립니다"
            }
            primary={{ label: "→ 다른 공고 보기", onPress: goStepList }}
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
            title='지원 실패'
            description={
              "지원서 제출 중 오류가 발생했습니다.\n잠시 후 다시 시도해주세요."
            }
            primary={{
              label: "다시 시도",
              onPress: () => router.back(),
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
