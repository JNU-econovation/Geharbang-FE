import { Stack } from 'expo-router';
import React from 'react';

export default function RecruitmentLayout() {
  return (
    <Stack screenOptions={{ headerShown: false, gestureEnabled: false }}>
      <Stack.Screen name="index" />
      <Stack.Screen name="step1" />
      <Stack.Screen name="step2" />
      <Stack.Screen name="makeParty" />
      <Stack.Screen name="step3" />
      <Stack.Screen name="addRoomForm" />
      <Stack.Screen name="step4" />
      <Stack.Screen name="result" />
    </Stack>
  );
}
