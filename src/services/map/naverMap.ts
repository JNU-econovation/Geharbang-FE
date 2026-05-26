const CLIENT_ID = process.env.EXPO_PUBLIC_NAVER_MAP_CLIENT_ID ?? "";
const CLIENT_SECRET = process.env.EXPO_PUBLIC_NAVER_MAP_CLIENT_SECRET ?? "";

const LOCAL_CLIENT_ID = process.env.EXPO_PUBLIC_NAVER_LOCAL_CLIENT_ID ?? "";
const LOCAL_CLIENT_SECRET = process.env.EXPO_PUBLIC_NAVER_LOCAL_CLIENT_SECRET ?? "";

const NAVER_HEADERS = {
  "X-NCP-APIGW-API-KEY-ID": CLIENT_ID,
  "X-NCP-APIGW-API-KEY": CLIENT_SECRET,
};

export interface NaverAddressResult {
  roadAddress: string;
  jibunAddress: string;
  latitude: number;
  longitude: number;
}

export async function localSearch(query: string): Promise<NaverAddressResult[]> {
  if (!query.trim()) return [];
  if (!LOCAL_CLIENT_ID) {
    console.warn("[NaverMap] LOCAL_CLIENT_ID 없음 — env var 확인 필요");
    return [];
  }

  try {
    const url = `https://openapi.naver.com/v1/search/local.json?query=${encodeURIComponent(query)}&display=5`;
    const response = await fetch(url, {
      headers: {
        "X-Naver-Client-Id": LOCAL_CLIENT_ID,
        "X-Naver-Client-Secret": LOCAL_CLIENT_SECRET,
      },
    });

    if (!response.ok) {
      console.warn("[NaverMap] localSearch 실패:", response.status, await response.text().catch(() => ""));
      return [];
    }

    const data = await response.json();
    console.log("[NaverMap] localSearch 결과:", JSON.stringify(data.items?.slice(0, 2)));
    if (!data.items || data.items.length === 0) return [];

    return data.items
      .map((item: any) => ({
        roadAddress: item.roadAddress ?? "",
        jibunAddress: item.address ?? "",
        latitude: parseInt(item.mapy) / 1e7,
        longitude: parseInt(item.mapx) / 1e7,
      }))
      .filter((r: NaverAddressResult) => r.latitude !== 0 && r.longitude !== 0);
  } catch (e) {
    console.warn("[NaverMap] localSearch 오류:", e);
    return [];
  }
}

export async function geocodeAddress(query: string): Promise<NaverAddressResult[]> {
  if (!query.trim()) return [];

  try {
    const url = `https://maps.apigw.ntruss.com/map-geocode/v2/geocode?query=${encodeURIComponent(query)}&count=5`;
    const response = await fetch(url, { headers: NAVER_HEADERS });

    if (!response.ok) {
      console.warn("[NaverMap] geocode 실패:", response.status, await response.text().catch(() => ""));
      return [];
    }

    const data = await response.json();
    if (!data.addresses || data.addresses.length === 0) return [];

    return data.addresses.map((addr: any) => ({
      roadAddress: addr.roadAddress ?? "",
      jibunAddress: addr.jibunAddress ?? "",
      latitude: parseFloat(addr.y),
      longitude: parseFloat(addr.x),
    }));
  } catch {
    return [];
  }
}

export async function reverseGeocode(
  lat: number,
  lng: number,
): Promise<{ roadAddress: string; jibunAddress: string }> {
  try {
    const url = `https://maps.apigw.ntruss.com/map-reversegeocode/v2/gc?coords=${lng},${lat}&output=json&orders=roadaddr,addr`;
    const response = await fetch(url, { headers: NAVER_HEADERS });

    if (!response.ok) {
      console.warn("[NaverMap] reverseGeocode 실패:", response.status, await response.text().catch(() => ""));
      return { roadAddress: "", jibunAddress: "" };
    }

    const data = await response.json();
    const results: any[] = data.results ?? [];

    const roadResult = results.find((r) => r.name === "roadaddr");
    const addrResult = results.find((r) => r.name === "addr");

    const buildAddress = (r: any, includeRoadName: boolean) => {
      if (!r) return "";
      const area1 = r.region?.area1?.name ?? "";
      const area2 = r.region?.area2?.name ?? "";
      const area3 = r.region?.area3?.name ?? "";
      const landName = includeRoadName ? (r.land?.name ?? "") : "";
      const num1 = r.land?.number1 ?? "";
      const num2 = r.land?.number2 ? `-${r.land.number2}` : "";
      return [area1, area2, area3, landName, `${num1}${num2}`]
        .filter(Boolean)
        .join(" ");
    };

    return {
      roadAddress: buildAddress(roadResult, true),
      jibunAddress: buildAddress(addrResult, false),
    };
  } catch {
    return { roadAddress: "", jibunAddress: "" };
  }
}
