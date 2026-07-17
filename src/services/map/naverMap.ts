import { axiosPublic } from "@/src/services/api/customAxios";

export interface NaverAddressResult {
  roadAddress: string;
  jibunAddress: string;
  latitude: number;
  longitude: number;
}

export async function localSearch(query: string): Promise<NaverAddressResult[]> {
  if (!query.trim()) return [];

  try {
    const response = await axiosPublic.get<NaverAddressResult[]>("/api/v1/maps/local-search", {
      params: { query },
    });
    return response.data;
  } catch (e) {
    console.warn("[NaverMap] localSearch 오류:", e);
    return [];
  }
}

export async function geocodeAddress(query: string): Promise<NaverAddressResult[]> {
  if (!query.trim()) return [];

  try {
    const response = await axiosPublic.get<NaverAddressResult[]>("/api/v1/maps/geocode", {
      params: { query },
    });
    return response.data;
  } catch (e) {
    console.warn("[NaverMap] geocode 오류:", e);
    return [];
  }
}

export async function reverseGeocode(
  lat: number,
  lng: number,
): Promise<{ roadAddress: string; jibunAddress: string }> {
  try {
    const response = await axiosPublic.get<{ roadAddress: string; jibunAddress: string }>(
      "/api/v1/maps/reverse-geocode",
      {
        params: { lat, lng },
      },
    );
    return response.data;
  } catch (e) {
    console.warn("[NaverMap] reverseGeocode 오류:", e);
    return { roadAddress: "", jibunAddress: "" };
  }
}
