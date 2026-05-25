export interface ChatRoom {
  id: number;
  applicationRecordId: number | null;
  staffRecruitmentId: number | null;
  guestHousePostId: number | null;
  staffRecruitmentTitle: string;
  opponentId: number;
  opponentName: string | null;
  opponentImageUrl: string;
  lastMessage: string | null;
  lastMessageAt: string | null;
  unreadCount: number;
}

export interface ChatMessage {
  id: number;
  chatRoomId: number;
  senderId: number;
  content: string;
  isRead: boolean;
  createdAt: string;
}

export interface ChatRoomsResponse {
  chatRooms: ChatRoom[];
}

export interface ChatMessagesResponse {
  messages: ChatMessage[];
}

export interface ChatRoomCreateResponse {
  chatRoomId: number;
}

export interface ChatRoomCreateRequest {
  applicationRecordId?: number;
  staffRecruitmentId?: number;
  guestHousePostId?: number;
}
