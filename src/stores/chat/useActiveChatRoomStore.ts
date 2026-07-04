import { create } from "zustand";

interface ActiveChatRoomStore {
  activeRoomId: number | null;
  setActiveRoomId: (roomId: number | null) => void;
}

export const useActiveChatRoomStore = create<ActiveChatRoomStore>((set) => ({
  activeRoomId: null,
  setActiveRoomId: (roomId) => set({ activeRoomId: roomId }),
}));
