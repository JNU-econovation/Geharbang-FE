/**
 * 게스트하우스 등록 API 요청 타입
 * POST /api/v1/guest-houses
 */

// 위치 정보
export interface LocationRequest {
  lotNumberAddress: string;
  roadNameAddress: string;
  coordinates: [number, number];
}

// 파티 정보
export interface PartyRequest {
  type: string;
  otherPartyType: string | null;
  startTime: string;
  endTime: string;
  weeklyDays: string[];
  place: string;
  moods: string[];
  isExternalGuestAllowed: boolean;
  guestFee: number;
  externalGuestFee: number;
  imageUrls: string[];
  information: string;
}

// 객실 정보
export interface RoomRequest {
  name: string;
  type: string;
  headCountType: string;
  checkInTime: string;
  checkOutTime: string;
  pricePerNight: number;
  imageUrls: string[];
}

// 연락처 정보
export interface ContactRequest {
  phoneNumber: string | null;
  instagramId: string | null;
  webSite: string | null;
}

// 전체 게스트하우스 등록 요청
export interface GuestHouseEnrollRequest {
  guestHouseName: string;
  imageUrls: string[];
  region: string;
  location: LocationRequest;
  introduction: string;
  amenities: string[];
  moods: string[];
  parties: PartyRequest[];
  rooms: RoomRequest[];
  contact: ContactRequest;
  ownerMessage: string | null;
}

// API 응답 타입
export interface GuestHouseEnrollResponse {
  guestHouseId: number;
}
