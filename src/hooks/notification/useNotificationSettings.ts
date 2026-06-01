import {
  getNotificationSetting,
  NotificationSettingUpdateRequest,
  updateNotificationSetting,
} from "@/src/services/notification/notificationSetting";
import { useAuthStore } from "@/src/stores/auth/useAuthStore";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

const SETTING_QUERY_KEY = ["notification-settings"] as const;

export const useNotificationSettings = () => {
  const isLogined = useAuthStore((state) => Boolean(state.accessToken));

  return useQuery({
    queryKey: SETTING_QUERY_KEY,
    queryFn: getNotificationSetting,
    enabled: isLogined,
  });
};

export const useUpdateNotificationSettings = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (request: NotificationSettingUpdateRequest) =>
      updateNotificationSetting(request),
    onSuccess: (data) => {
      queryClient.setQueryData(SETTING_QUERY_KEY, data);
    },
    onError: () => {
      queryClient.invalidateQueries({ queryKey: SETTING_QUERY_KEY });
    },
  });
};
