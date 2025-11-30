import { Stack } from "expo-router";
import React from "react";

export default function StaffApplyLayout() {
  return (
    <Stack screenOptions={{ headerShown: false, gestureEnabled: false }}>
      <Stack.Screen name="index" />
      <Stack.Screen name="result" />
    </Stack>
  );
}