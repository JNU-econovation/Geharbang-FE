import { axiosPrivate } from "@/src/services/api/customAxios";

export interface NotificationSettingResponse {
  pushEnabled: boolean;
  chatPushEnabled: boolean;
}

export interface NotificationSettingUpdateRequest {
  pushEnabled?: boolean;
  chatPushEnabled?: boolean;
}

export const getNotificationSetting =
  async (): Promise<NotificationSettingResponse> => {
    const response = await axiosPrivate.get<NotificationSettingResponse>(
      "/api/v1/notification-settings",
    );
    return response.data;
  };

export const updateNotificationSetting = async (
  request: NotificationSettingUpdateRequest,
): Promise<NotificationSettingResponse> => {
  const response = await axiosPrivate.patch<NotificationSettingResponse>(
    "/api/v1/notification-settings",
    request,
  );
  return response.data;
};
