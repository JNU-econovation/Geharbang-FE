import { axiosOptionalAuth } from '../api/customAxios';

export interface GuestHouseMapResponse {
  id: number;
  guestHouseName: string;
  address: string;
  coordinates: [number, number];
  region: string;
  imageUrls: string[];
  webSite: string;
  instagramId: string;
  phoneNumber: string;
  reservationUrl: string;
  isWished: boolean;
}

export interface StepMapResponse {
  id: number;
  title: string;
  guestHouseName: string;
  address: string;
  coordinates: [number, number];
  region: string;
  representativeImageUrls: string[];
  webSite: string;
  instagramId: string;
  phoneNumber: string;
  isWished: boolean;
}

export const getGuestHouseMap = async (): Promise<GuestHouseMapResponse[]> => {
  const response = await axiosOptionalAuth.get<GuestHouseMapResponse[]>('/api/v1/guest-houses/map');
  return response.data;
};

export const getStepMap = async (): Promise<StepMapResponse[]> => {
  const response = await axiosOptionalAuth.get<StepMapResponse[]>('/api/v1/staff-recruitment/map');
  return response.data;
};
