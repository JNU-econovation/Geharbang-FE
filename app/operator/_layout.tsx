import { Stack } from 'expo-router';

export default function OperatorLayout() {
  return (
    <Stack
      screenOptions={{
        headerShown: false,
        gestureEnabled: false,
      }}
    >
      <Stack.Screen name="verify" />
      <Stack.Screen name="management" />
    </Stack>
  );
}
