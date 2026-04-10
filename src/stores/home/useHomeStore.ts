import { create } from "zustand";

interface HomeStore {
  refreshTrigger: number;
  triggerRefresh: () => void;
}

export const useHomeStore = create<HomeStore>((set) => ({
  refreshTrigger: 0,
  triggerRefresh: () =>
    set((state) => ({ refreshTrigger: state.refreshTrigger + 1 })),
}));
