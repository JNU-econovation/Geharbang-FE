import { router, useLocalSearchParams } from "expo-router";
import { StatusBar, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import ResultLayout from "../_components/ResultLayout";

export default function ResultScreen() {
  const { status } = useLocalSearchParams();
  const goHome = () => router.replace("/(tabs)");

  return (
    <>
      <StatusBar barStyle="dark-content" />
      <SafeAreaView className="flex-1 bg-white">
        <View className="p-3 items-center ">
          <Text className="text-lg">지원서 작성 완료</Text>
        </View>

        <View className="h-full px-3 pt-8 pb-8 bg-[#F9FAFB]">

          {status === "pending" && (
            <ResultLayout
              status="pending"
              title="제출 중..."
              description="지원서를 제출하고 있습니다"
              primary={{ label: "제출 중..." }}
            />
          )}

          {status === "success" && (
            <ResultLayout
              status="success"
              title="지원서 작성 완료!"
              description="공통 지원서를 성공적으로 작성했습니다."
              primary={{ label: "→ 스텝 지원하러 가기" }}
              secondary={{ label: "내 지원서 확인", icon: "reader-outline" }}
              tertiary={{ label: "홈으로 돌아가기", onPress: goHome, icon: "home-outline" }}
            />
          )}

          {status === "error" && (
            <ResultLayout
              status="error"
              title="제출 실패"
              description={"지원서 제출 중 오류가 발생했습니다.\n잠시 후 다시 시도해주세요."}
              primary={{ label: "다시 시도", onPress: () => router.replace("/application/create/step2") }}
              tertiary={{ label: "홈으로 돌아가기", onPress: goHome, icon: "home-outline" }}
            />
          )}
        </View>
      </SafeAreaView>
    </>
  );
}
