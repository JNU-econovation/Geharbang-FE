import {
  GuestHousePostParams,
  GuestHousePostResponse,
} from "@/src/types/models/guestHouse/types";
import { axiosOptionalAuth } from "../api/customAxios";

export const getGuestHousePostList = async (
  params: GuestHousePostParams
): Promise<GuestHousePostResponse> => {
  const queryParams = new URLSearchParams();

  if (params.sort) queryParams.append("sort", params.sort);

  if (params.keyword) queryParams.append("keyword", params.keyword);

  if (params.region && params.region.length > 0) {
    params.region.forEach((r) => queryParams.append("region", r));
  }

  if (params.lowestRoomPrice != null) {
    queryParams.append("lowestRoomPrice", params.lowestRoomPrice.toString());
  }

  if (params.highestRoomPrice != null) {
    queryParams.append("highestRoomPrice", params.highestRoomPrice.toString());
  }

  if (params.moods && params.moods.length > 0) {
    params.moods.forEach((m) => queryParams.append("moods", m));
  }

  if (params.partyType && params.partyType.length > 0) {
    params.partyType.forEach((p) => queryParams.append("partyType", p));
  }

  if (params.roomType && params.roomType.length > 0) {
    params.roomType.forEach((r) => queryParams.append("roomType", r));
  }

  if (params.headCountType && params.headCountType.length > 0) {
    params.headCountType.forEach((h) => queryParams.append("headCountType", h));
  }

  if (params.amenities && params.amenities.length > 0) {
    params.amenities.forEach((a) => queryParams.append("amenities", a));
  }

  if (params.pageNumber !== undefined) {
    queryParams.append("pageNumber", params.pageNumber.toString());
  }

  const url = `/api/v1/guest-houses?${queryParams.toString()}`;
  const response = await axiosOptionalAuth.get<GuestHousePostResponse>(url);

  return response.data;
};
