import { Stack } from 'expo-router';

export default function OperatorLayout() {
  return (
    <Stack
      screenOptions={{
        headerShown: false,
        gestureEnabled: false,
      }}
    >
      <Stack.Screen name="verify/index" />
      <Stack.Screen name="management/index" />
      <Stack.Screen name="detail/[id]/index" />
    </Stack>
  );
}
