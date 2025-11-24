import { Alert, Linking } from "react-native";

interface handleOpenURLProps {
  redirect?: string;
}

export const handleOpenURL = async ({ redirect }: handleOpenURLProps) => {
  if (!redirect) {
    Alert.alert("오류", "유효한 링크가 없습니다.");
    return;
  }

  try {
    await Linking.openURL(redirect);
  } catch (error) {
    Alert.alert("오류", "링크를 여는 과정에서 오류가 발생했습니다.");
  }
};
