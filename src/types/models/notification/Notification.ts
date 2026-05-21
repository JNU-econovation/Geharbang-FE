export type NotificationType =
  | "CERTIFICATE_APPROVED"
  | "CERTIFICATE_REJECTED"
  | "STAFF_APPLICATION_CREATED"
  | "APPLICATION_ACCEPTED";

export type NotificationTargetType =
  | "CERTIFICATE"
  | "STAFF_RECRUITMENT"
  | "APPLICATION_RECORD";

export interface NotificationItem {
  id: number;
  type: NotificationType;
  title: string;
  content: string;
  targetType: NotificationTargetType;
  targetId: number | null;
  isRead: boolean;
  createdAt: string;
}

export interface NotificationsResponse {
  notifications: NotificationItem[];
}

export interface UnreadNotificationCountResponse {
  unreadCount: number;
}
