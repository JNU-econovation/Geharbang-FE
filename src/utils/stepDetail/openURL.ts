import { Alert, Linking } from "react-native";

interface handleOpenURLProps {
  redirect: string;
}

export const handleOpenURL = async ({ redirect }: handleOpenURLProps) => {
  try {
    const openURL = await Linking.canOpenURL(redirect);

    if (!openURL) {
      Alert.alert("알림", "해당 링크를 열 수 없습니다.");
      return;
    }

    await Linking.openURL(redirect);
  } catch (error) {
    Alert.alert("오류", "링크를 여는 과정에서 오류가 발생했습니다.");
  }
};
