import { CHAT_QUERY_KEYS } from "@/src/hooks/chat/useChat";
import { registerPushToken } from "@/src/services/notification/pushToken";
import { useAuthStore } from "@/src/stores/auth/useAuthStore";
import { NotificationTargetType, NotificationType } from "@/src/types/models/notification/Notification";
import { getExpoNotifications } from "@/src/utils/notification/getExpoNotifications";
import Constants from "expo-constants";
import { router } from "expo-router";
import { useEffect } from "react";
import { Platform } from "react-native";
import { useQueryClient } from "@tanstack/react-query";

const Notifications = getExpoNotifications();

// foreground에서도 알림을 보여 테스트와 실제 수신 체감을 일관되게 맞춘다.
Notifications?.setNotificationHandler?.({
  handleNotification: async () => ({
    shouldPlaySound: true,
    shouldSetBadge: false,
    shouldShowBanner: true,
    shouldShowList: true,
  }),
});

interface PushNotificationData {
  type?: NotificationType;
  targetType?: NotificationTargetType;
  targetId?: number | string;
}

const getProjectId = () =>
  Constants.expoConfig?.extra?.eas?.projectId ??
  Constants.easConfig?.projectId;

const navigateByPushData = (data: PushNotificationData) => {
  const targetId = data.targetId ? String(data.targetId) : undefined;

  if (data.type === "CHAT_MESSAGE_CREATED" && targetId) {
    router.push(`/chats/${targetId}` as any);
    return;
  }

  if (data.type === "STAFF_APPLICATION_CREATED") {
    router.push("/my/stepRecruitment" as any);
    return;
  }

  if (data.type === "APPLICATION_ACCEPTED") {
    router.push("/my/application/status" as any);
    return;
  }

  if (data.targetType === "CERTIFICATE") {
    router.push("/(tabs)/profile" as any);
    return;
  }

  router.push("/notifications" as any);
};

export const useRegisterPushNotifications = () => {
  const accessToken = useAuthStore((state) => state.accessToken);
  const isAuthReady = useAuthStore((state) => state.isAuthReady);

  useEffect(() => {
    if (!isAuthReady || !accessToken) {
      return;
    }

    const register = async () => {
      try {
        const notifications = getExpoNotifications();
        if (!notifications) {
          return;
        }

        if (Platform.OS === "android") {
          await notifications.setNotificationChannelAsync("default", {
            name: "default",
            importance: notifications.AndroidImportance.MAX,
          });
        }

        const permission = await notifications.getPermissionsAsync();
        const finalPermission =
          permission.status === "granted"
            ? permission
            : await notifications.requestPermissionsAsync();

        if (finalPermission.status !== "granted") {
          return;
        }

        const projectId = getProjectId();
        if (!projectId) {
          return;
        }

        const token = await notifications.getExpoPushTokenAsync({ projectId });
        await registerPushToken({
          token: token.data,
          platform: Platform.OS,
        });
      } catch (error) {
        console.warn("Failed to register push token", error);
      }
    };

    register();
  }, [accessToken, isAuthReady]);
};

export const usePushNotificationNavigation = () => {
  useEffect(() => {
    const notifications = getExpoNotifications();
    if (!notifications) {
      return;
    }

    const subscription = notifications.addNotificationResponseReceivedListener(
      (response: any) => {
        navigateByPushData(
          response.notification.request.content.data as PushNotificationData,
        );
      },
    );

    return () => {
      subscription.remove();
    };
  }, []);
};

export const useForegroundNotificationHandler = () => {
  const queryClient = useQueryClient();

  useEffect(() => {
    const notifications = getExpoNotifications();
    if (!notifications) {
      return;
    }

    const subscription = notifications.addNotificationReceivedListener(
      (notification: any) => {
        const data = notification.request.content.data as PushNotificationData;

        if (data.type === "CHAT_MESSAGE_CREATED") {
          queryClient.invalidateQueries({ queryKey: CHAT_QUERY_KEYS.rooms });
        }

        queryClient.invalidateQueries({ queryKey: ["notifications"] });
      },
    );

    return () => {
      subscription.remove();
    };
  }, [queryClient]);
};
