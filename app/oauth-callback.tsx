import * as Linking from "expo-linking";
import { useRouter } from "expo-router";
import { useEffect } from "react";
import { ActivityIndicator, View } from "react-native";

import { useAuthStore } from "@/src/stores/auth/useAuthStore";
import { TOKEN_KEYS } from "@/src/utils/constants/TokenKeys";
import { setAccessToken } from "@/src/utils/login/secureStore";

function pickString(v: unknown) {
  return typeof v === "string" && v.length > 0 ? v : undefined;
}

export default function OAuthCallback() {
  const router = useRouter();
  const setAccessTokenStore = useAuthStore((state) => state.setAccessToken);

  useEffect(() => {
    let cancelled = false;

    const handleUrl = async (url: string) => {
      const { queryParams } = Linking.parse(url);
      const accessToken = pickString(queryParams?.accessToken);
      const userId = pickString(queryParams?.userId);

      if (!accessToken || !userId) {
        router.replace("/login");
        return;
      }

      await Promise.all([
        setAccessToken(TOKEN_KEYS.ACCESS_TOKEN, accessToken),
        setAccessToken(TOKEN_KEYS.USER_ID, userId),
      ]);

      if (cancelled) return;
      setAccessTokenStore(accessToken);
      router.replace("/(tabs)");
    };

    (async () => {
      try {
        const initialUrl = await Linking.getInitialURL();
        if (!initialUrl || cancelled) {
          router.replace("/login");
          return;
        }
        await handleUrl(initialUrl);
      } catch (e) {
        router.replace("/login");
      }
    })();

    const sub = Linking.addEventListener("url", ({ url }) => {
      handleUrl(url).catch(() => router.replace("/login"));
    });

    return () => {
      cancelled = true;
      sub.remove();
    };
  }, [router, setAccessTokenStore]);

  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <ActivityIndicator />
    </View>
  );
}
