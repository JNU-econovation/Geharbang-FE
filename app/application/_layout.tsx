import { Stack } from "expo-router";
import React from "react";

export default function ApplicationLayout() {
  return (
    <Stack>
      <Stack.Screen name="create" options={{ headerShown: false }} />
    </Stack>
  );
}
