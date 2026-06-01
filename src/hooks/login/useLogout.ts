import { useAuthStore } from "@/src/stores/auth/useAuthStore";
import { unregisterPushToken } from "@/src/services/notification/pushToken";
import { TOKEN_KEYS } from "@/src/utils/constants/TokenKeys";
import { removeAccessToken } from "@/src/utils/login/secureStore";
import { getExpoNotifications } from "@/src/utils/notification/getExpoNotifications";
import { useQueryClient } from "@tanstack/react-query";
import Constants from "expo-constants";
import { router } from "expo-router";
import { Alert, Platform } from "react-native";

export const useLogout = () => {
  const setAccessToken = useAuthStore((state) => state.setAccessToken);
  const queryClient = useQueryClient();

  const unregisterCurrentPushToken = async () => {
    try {
      const projectId =
        Constants.expoConfig?.extra?.eas?.projectId ??
        Constants.easConfig?.projectId;
      const notifications = getExpoNotifications();
      const token = projectId && notifications
        ? await notifications.getExpoPushTokenAsync({ projectId }).catch(
            () => null,
          )
        : null;
      if (token?.data) {
        await unregisterPushToken({
          token: token.data,
          platform: Platform.OS,
        }).catch(() => undefined);
      }
    } catch {
      // 푸시 토큰 해제 실패가 로컬 로그아웃을 막지 않도록 무시한다.
    }
  };

  const performLogout = async () => {
    try {
      await unregisterCurrentPushToken();
      await Promise.allSettled([
        removeAccessToken(TOKEN_KEYS.ACCESS_TOKEN),
        removeAccessToken(TOKEN_KEYS.USER_ID),
      ]);
      setAccessToken(null);
      queryClient.clear();

      Alert.alert("로그아웃 되었습니다", "", [
        { text: "확인", onPress: () => router.replace("/(tabs)") },
      ]);
    } catch (e) {
      Alert.alert("오류", "로그아웃 중 문제가 발생했습니다.");
    }
  };

  const handleLogout = () => {
    Alert.alert("로그아웃", "정말 로그아웃 하시겠습니까?", [
      { text: "취소", style: "cancel" },
      {
        text: "로그아웃",
        style: "destructive",
        onPress: performLogout,
      },
    ]);
  };

  return handleLogout;
};
