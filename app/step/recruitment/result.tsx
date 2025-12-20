import { router, useLocalSearchParams } from "expo-router";
import { View } from "react-native";

import CustomSafeAreaView from "@/src/components/layout/CustomSafeAreaView";
import ResultLayout from "@/src/components/layout/ResultLayout";
import TextSize from "@/src/components/ui/TextSize";

export default function RecruitmentResultScreen() {
  const { status, recruitmentId } = useLocalSearchParams();
  const goHome = () => router.replace("/(tabs)");

  return (
    <CustomSafeAreaView pageColor='bg-white'>
      <View className='p-3 items-center'>
        <TextSize size={18} content='공고 등록' />
      </View>

      <View className='h-full px-3 pt-8 bg-[#F9FAFB]'>
        {status === "pending" && (
          <ResultLayout
            status='pending'
            title='등록 중...'
            description='스텝 공고를 등록하고 있습니다'
            primary={{ label: "등록 중..." }}
          />
        )}

        {status === "success" && (
          <ResultLayout
            status='success'
            title='공고 등록 완료!'
            description='스텝 공고가 성공적으로 등록되었습니다.'
            primary={{
              label: "홈으로 돌아가기",
              onPress: goHome,
            }}
            tertiary={{
              label: "내 공고 확인",
              onPress: () => {
                router.replace({
                  pathname: "/step/stepDetail/[id]",
                  params: { id: recruitmentId.toString() },
                });
              },
              icon: "reader-outline",
            }}
          />
        )}

        {status === "error" && (
          <ResultLayout
            status='error'
            title='등록 실패'
            description={
              "공고 등록 중 오류가 발생했습니다.\n잠시 후 다시 시도해주세요."
            }
            primary={{
              label: "다시 시도",
              onPress: () => router.replace("/step/recruitment/step5"),
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
