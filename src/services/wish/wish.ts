import {
  GuestHousePostResponse,
} from "@/src/types/models/guestHouse/types";
import {
  StaffRecruitmentResponse,
} from "@/src/types/models/step/types";
import { axiosPrivate } from "../api/customAxios";

export const addStaffRecruitmentWish = async (id: number): Promise<number> => {
  const response = await axiosPrivate.post<{ wishId: number }>(
    `/api/v1/wish/staff-recruitment/${id}`
  );
  return response.data.wishId;
};

export const deleteStaffRecruitmentWish = async (id: number): Promise<void> => {
  await axiosPrivate.delete(`/api/v1/wish/staff-recruitment/${id}`);
};

export const addGuestHouseWish = async (id: number): Promise<number> => {
  const response = await axiosPrivate.post<{ wishId: number }>(
    `/api/v1/wish/guest-houses/${id}`
  );
  return response.data.wishId;
};

export const deleteGuestHouseWish = async (id: number): Promise<void> => {
  await axiosPrivate.delete(`/api/v1/wish/guest-houses/${id}`);
};

export const getMyWishedStaffRecruitments = async (
  pageNumber = 0
): Promise<StaffRecruitmentResponse> => {
  const response = await axiosPrivate.get<StaffRecruitmentResponse>(
    "/api/v1/wish/staff-recruitment/my",
    {
      params: {
        pageNumber,
      },
    }
  );
  return response.data;
};

export const getMyWishedGuestHouses = async (
  pageNumber = 0
): Promise<GuestHousePostResponse> => {
  const response = await axiosPrivate.get<GuestHousePostResponse>(
    "/api/v1/wish/guest-houses/my",
    {
      params: {
        pageNumber,
      },
    }
  );
  return response.data;
};
