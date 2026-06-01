import { DefaultTheme, ThemeProvider } from "@react-navigation/native";
import * as Sentry from "@sentry/react-native";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useFonts } from "expo-font";
import { Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { useEffect } from "react";
import "react-native-reanimated";
import { SafeAreaProvider } from "react-native-safe-area-context";

Sentry.init({
  dsn: process.env.EXPO_PUBLIC_SENTRY_DSN,
});

import FontAwesome from "@expo/vector-icons/FontAwesome";
export { ErrorBoundary } from "expo-router";

import { useAuthStore } from "@/src/stores/auth/useAuthStore";
import {
  useForegroundNotificationHandler,
  usePushNotificationNavigation,
  useRegisterPushNotifications,
} from "@/src/hooks/notification/usePushNotifications";
import { useChatWebSocket } from "@/src/hooks/chat/useChatWebSocket";
import "../global.css";

export const unstable_settings = {
  initialRouteName: "(tabs)",
};

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const loadToken = useAuthStore((state) => state.loadToken);
  const isAuthReady = useAuthStore((state) => state.isAuthReady);

  const [loaded, error] = useFonts({
    SpaceMono: require("../public/fonts/NotoSansKR.ttf"),
    ...FontAwesome.font,
  });

  useEffect(() => {
    if (error) throw error;
  }, [error]);

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  useEffect(() => {
    loadToken();
  }, []);

  if (!loaded || !isAuthReady) {
    return null;
  }

  return <RootLayoutNav />;
}

const queryClient = new QueryClient();

function RootLayoutNav() {
  return (
    <SafeAreaProvider>
      <QueryClientProvider client={queryClient}>
        <AppNotificationEffects />
        <AppChatEffects />
        <ThemeProvider value={DefaultTheme}>
          <Stack
            screenOptions={{
              headerShown: false,
              animation: "fade",
              animationDuration: 150,
            }}
          >
            <Stack.Screen name='(tabs)' />
            <Stack.Screen name='login/index' />
            <Stack.Screen
              name='application/create'
              options={{ gestureEnabled: false }}
            />
            <Stack.Screen
              name='step/recruitment'
              options={{ gestureEnabled: false }}
            />
            <Stack.Screen
              name='guestHouse/enroll'
              options={{ gestureEnabled: false }}
            />
          </Stack>
        </ThemeProvider>
      </QueryClientProvider>
    </SafeAreaProvider>
  );
}

function AppNotificationEffects() {
  useRegisterPushNotifications();
  usePushNotificationNavigation();
  useForegroundNotificationHandler();

  return null;
}

function AppChatEffects() {
  const isLogined = useAuthStore((state) => Boolean(state.accessToken));

  useChatWebSocket(isLogined ? undefined : null);

  return null;
}
