
export interface GuestHousePost {
  id: number;
  guestHouseName: string;
  tags: string[];
  region: string;
  isWished: boolean;
  imageUrl: string;
}

export interface GuestHousePostParams {
  keyword?: string;
  sort?: string;
  region?: string[];
  lowestRoomPrices?: number;
  highestRoomPrice?: number;
  moods?: string[];
  partyType?: string[];
  roomType?: string[];
  headCountType?: string[];
  amenities?: string[];
  pageNumber?: number;
}

export interface GuestHousePostResponse {
  GuestHousePosts: GuestHousePost[];
  hasNext?: boolean;
  totalPages?: number;
  pageSize?: number;
}

export interface FilterState {
  region: string[];
  lowestRoomPrice: number | null;
  highestRoomPrice: number | null;
  moods: string[];
  partyType: string[];
  roomType: string[];
  headCountType: string[];
  amenities: string[];
}
