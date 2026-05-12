import { useApplicationExist } from "@/src/hooks/stepDetail/useApplicationExist";
import { router } from "expo-router";
import { Alert } from "react-native";

export const useCheckApplication = () => {
  const { isApplicationExist, isLoading } = useApplicationExist();

  const checkApplication = (callback: () => void) => {
    if (isLoading) {
      return;
    }

    if (isApplicationExist) {
      Alert.alert(
        "이미 작성된 지원서가 있습니다",
        "공통 지원서는 1회만 작성 가능합니다",
        [
          { text: "닫기", style: "cancel" },
          {
            text: "내 지원서 보기",
            onPress: () => router.push("/my/application"),
          },
        ],
      );
      return;
    }

    callback();
  };

  return { checkApplication };
};
