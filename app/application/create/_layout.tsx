import { Stack } from "expo-router";
import React from "react";

export default function ApplicationCreateLayout() {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="index" options={{ headerShown: false }} />
      <Stack.Screen name="step2" options={{ headerShown: false, gestureEnabled: false }} />
      <Stack.Screen name="step3" options={{ headerShown: false }} />
    </Stack>
  );
}
