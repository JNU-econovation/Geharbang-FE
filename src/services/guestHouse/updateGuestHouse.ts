import { GuestHouseEnrollRequest } from '@/src/types/api/guestHouse/GuestHouseEnrollRequest';
import { axiosPrivate } from '../api/customAxios';

export const updateGuestHouse = async (
  id: number,
  data: GuestHouseEnrollRequest,
): Promise<void> => {
  await axiosPrivate.put(`/api/v1/guest-houses/${id}`, data);
};
