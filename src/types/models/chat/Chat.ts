export interface ChatRoom {
  id: number;
  applicationRecordId: number;
  staffRecruitmentId: number;
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
