export interface StepMapItem {
  id: number;
  title: string;
  guestHouseName: string;
  address: string;
  coordinates: [number, number]; // [lng, lat]
  images: string[];
  region: string;
  instagramId?: string;
  webSite?: string;
  phoneNumber?: string;
  isWished: boolean;
}

export interface GuestHouseMapItem {
  id: number;
  guestHouseName: string;
  address: string;
  coordinates: [number, number]; // [lng, lat]
  images: string[];
  region: string;
  instagramId?: string;
  webSite?: string;
  phoneNumber?: string;
  reservationUrl?: string;
  isWished: boolean;
}
