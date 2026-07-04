export interface GuestHouseDetailResponse {
  guestHouseName: string;
  isWished: boolean;
  region: string;
  location: {
    lotNumberAddress: string;
    roadNameAddress: string;
    coordinates: [number, number];
  };
  rooms: RoomsInfo[];
  introduction: string;
  amenities: string[];
  moods: string[];
  parties: PartiesInfo[];
  contact: {
    phoneNumber: string;
    instagramId: string;
    webSite: string;
  };
  ownerMessage: string;
  imageUrls: string[];
  averageRating: number;
  reviewCount: number;
  hasMyReview: boolean;
}

export interface PartiesInfo {
  type: string;
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

export interface RoomsInfo {
  name: string;
  type: string;
  headCountType: string;
  checkInTime: string;
  checkOutTime: string;
  pricePerNight: number;
  imageUrls: string[];
}
