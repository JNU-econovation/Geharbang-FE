import { DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { useFonts } from 'expo-font';
import { Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect } from 'react';
import 'react-native-reanimated';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import * as Sentry from '@sentry/react-native';

Sentry.init({
  dsn: process.env.EXPO_PUBLIC_SENTRY_DSN,
  enabled: process.env.NODE_ENV === 'production',
});

import FontAwesome from '@expo/vector-icons/FontAwesome';
export { ErrorBoundary } from 'expo-router';

import { useAuthStore } from '@/src/stores/auth/useAuthStore';
import '../global.css';

export const unstable_settings = {
  initialRouteName: '(tabs)',
};

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const loadToken = useAuthStore((state) => state.loadToken);
  const isAuthReady = useAuthStore((state) => state.isAuthReady);

  const [loaded, error] = useFonts({
    SpaceMono: require('../public/fonts/NotoSansKR.ttf'),
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
        <ThemeProvider value={DefaultTheme}>
          <Stack screenOptions={{ headerShown: false }}>
            <Stack.Screen name="(tabs)" />
            <Stack.Screen name="login" />
            <Stack.Screen
              name="application/create"
              options={{ gestureEnabled: false }}
            />
            <Stack.Screen
              name="step/recruitment"
              options={{ gestureEnabled: false }}
            />
            <Stack.Screen
              name="guestHouse/enroll"
              options={{ gestureEnabled: false }}
            />
            <Stack.Screen name="modal" options={{ presentation: 'modal' }} />
          </Stack>
        </ThemeProvider>
      </QueryClientProvider>
    </SafeAreaProvider>
  );
}
