import * as SecureStore from "expo-secure-store";

export async function setAccessToken(key: string, value: string) {
  try {
    await SecureStore.setItemAsync(key, value);
  } catch (error) {
    console.error("Token 저장 실패", error);
  }
}
