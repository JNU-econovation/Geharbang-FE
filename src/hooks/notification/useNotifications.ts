import {
  getNotifications,
  getUnreadNotificationCount,
  markAllNotificationsAsRead,
  markNotificationAsRead,
} from "@/src/services/notification/notification";
import { useAuthStore } from "@/src/stores/auth/useAuthStore";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

export const NOTIFICATION_QUERY_KEYS = {
  list: (pageNumber = 0) => ["notifications", pageNumber] as const,
  unreadCount: ["notifications", "unreadCount"] as const,
};

export const useNotifications = (pageNumber = 0) => {
  const isLogined = useAuthStore((state) => Boolean(state.accessToken));

  return useQuery({
    queryKey: NOTIFICATION_QUERY_KEYS.list(pageNumber),
    queryFn: () => getNotifications(pageNumber),
    enabled: isLogined,
  });
};

export const useUnreadNotificationCount = () => {
  const isLogined = useAuthStore((state) => Boolean(state.accessToken));

  return useQuery({
    queryKey: NOTIFICATION_QUERY_KEYS.unreadCount,
    queryFn: getUnreadNotificationCount,
    enabled: isLogined,
  });
};

export const useMarkNotificationAsRead = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: markNotificationAsRead,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["notifications"] });
    },
  });
};

export const useMarkAllNotificationsAsRead = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: markAllNotificationsAsRead,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["notifications"] });
    },
  });
};
