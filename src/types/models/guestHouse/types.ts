import { SORT_OPTIONS } from "@/src/utils/constants/filterOptions";

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
  lowestRoomPrice?: number;
  highestRoomPrice?: number;
  moods?: string[];
  partyType?: string[];
  roomType?: string[];
  headCountType?: string[];
  amenities?: string[];
  pageNumber?: number;
}

export interface GuestHousePostResponse {
  guestHousePosts: GuestHousePost[];
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

export type SortOption = (typeof SORT_OPTIONS)[number];
export type SortOptionKey = SortOption["key"];

export const PAGE_SIZE = 20;