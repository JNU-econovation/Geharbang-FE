import * as SecureStore from "expo-secure-store";

export async function setAccessToken(key: string, value: string) {
  try {
    await SecureStore.setItemAsync(key, value);
  } catch (error) {
    console.error("Token 저장 실패", error);
  }
}

export async function getAccessToken(key: string): Promise<string | null> {
  try {
    const token = await SecureStore.getItemAsync(key);
    return token;
  } catch (error) {
    console.error("Token 조회 실패", error);
    return null;
  }
}
