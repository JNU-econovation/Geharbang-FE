import { GuestHouseDetailResponse } from "@/src/types/guestHouseDetail/GuestHouseDetailResponse";
import { axiosPublic } from "../api/customAxios";

export const getGuestHouseDetail = async (
  id: string
): Promise<GuestHouseDetailResponse> => {
  const response = await axiosPublic.get(`/api/v1/guest-houses/${id}/details`);
  return response.data;
};
