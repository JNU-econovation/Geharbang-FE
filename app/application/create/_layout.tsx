import { Stack } from "expo-router";
import React from "react";

export default function ApplicationCreateLayout() {
  return (
    <Stack screenOptions={{ headerShown: false, gestureEnabled: false}}>
      <Stack.Screen name="index" />
      <Stack.Screen name="step2"/>
      <Stack.Screen name="result" />
    </Stack>
  );
}
