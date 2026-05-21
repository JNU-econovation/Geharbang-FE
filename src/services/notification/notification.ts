import { axiosPrivate } from "@/src/services/api/customAxios";
import {
  NotificationsResponse,
  UnreadNotificationCountResponse,
} from "@/src/types/models/notification/Notification";

export const getNotifications = async (
  pageNumber = 0,
): Promise<NotificationsResponse> => {
  const response = await axiosPrivate.get<NotificationsResponse>(
    "/api/v1/notifications",
    {
      params: {
        pageNumber,
      },
    },
  );
  return response.data;
};

export const getUnreadNotificationCount =
  async (): Promise<UnreadNotificationCountResponse> => {
    const response = await axiosPrivate.get<UnreadNotificationCountResponse>(
      "/api/v1/notifications/unread-count",
    );
    return response.data;
  };

export const markNotificationAsRead = async (id: number): Promise<void> => {
  await axiosPrivate.patch(`/api/v1/notifications/${id}/read`);
};

export const markAllNotificationsAsRead = async (): Promise<void> => {
  await axiosPrivate.patch("/api/v1/notifications/read-all");
};
