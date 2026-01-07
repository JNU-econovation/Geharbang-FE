import * as Linking from "expo-linking";
import { useRouter } from "expo-router";
import { useEffect } from "react";
import { ActivityIndicator, View } from "react-native";

import { setAccessToken } from "@/src/utils/login/secureStore";

function pickString(v: unknown) {
  return typeof v === "string" && v.length > 0 ? v : undefined;
}

export default function OAuthCallback() {
  const router = useRouter();

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
        setAccessToken("accessToken", accessToken),
        setAccessToken("userId", userId),
      ]);

      if (cancelled) return;
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
  }, [router]);

  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <ActivityIndicator />
    </View>
  );
}
