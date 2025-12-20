import { TOKEN_KEYS } from "@/src/utils/constants/TokenKeys";
import { getAccessToken } from "@/src/utils/login/secureStore";
import { create } from "zustand";

interface AuthStore {
  accessToken: string | null;
  isAuthReady: boolean;
  setAccessToken: (token: string | null) => void;
  loadToken: () => Promise<void>;
}

export const useAuthStore = create<AuthStore>((set) => ({
  accessToken: null,
  isAuthReady: false,

  setAccessToken: (token) => set({ accessToken: token }),

  loadToken: async () => {
    const token = await getAccessToken(TOKEN_KEYS.ACCESS_TOKEN);
    set({ accessToken: token, isAuthReady: true });
  },
}));
