import {
  MyGuestHouse,
  Status,
} from "@/src/types/models/guestHouse/MyGuestHouse";
import { axiosPrivate } from "../api/customAxios";

// 사장님 게스트하우스 목록 보기
export const getMyGuestHouse = async (): Promise<MyGuestHouse[]> => {
  const response = await axiosPrivate.get(`/api/v1/guest-houses/owner`);
  return response.data.guestHousePosts;
};

// 사장님 게스트하우스 활성/비활성화
export const patchMyGuestHouseStatus = async (
  id: number,
  status: Status,
): Promise<void> => {
  const response = await axiosPrivate.patch(`/api/v1/guest-houses/${id}`, {
    status,
  });
};

// 사장님 게스트하우스 삭제
export const deleteMyGuestHouse = async (id: number): Promise<void> => {
  const response = await axiosPrivate.delete(`/api/v1/guest-houses/${id}`);
};
