import { useQuery } from '@tanstack/react-query';
import { buildAssetUrl } from '@/src/config/url';
import { getGuestHouseMap, getStepMap } from '@/src/services/map/mapService';
import { GuestHouseMapItem, StepMapItem } from '@/src/types/models/map';

export const useStepMap = () =>
  useQuery({
    queryKey: ['stepMap'],
    queryFn: async () => {
      const raw = await getStepMap();
return raw.map((item): StepMapItem => ({
        id: item.id,
        title: item.title,
        guestHouseName: item.guestHouseName,
        address: item.address,
        coordinates: [item.coordinates[0], item.coordinates[1]],
        images: item.representativeImageUrls.map((u) => buildAssetUrl(u)).filter((u): u is string => u !== null),
        region: item.region,
        instagramId: item.instagramId || undefined,
        webSite: item.webSite || undefined,
        phoneNumber: item.phoneNumber || undefined,
        isWished: item.isWished,
      }));
    },
  });

export const useGuestHouseMap = () =>
  useQuery({
    queryKey: ['guestHouseMap'],
    queryFn: async () => {
      const raw = await getGuestHouseMap();
      return raw.map((item): GuestHouseMapItem => ({
        id: item.id,
        guestHouseName: item.guestHouseName,
        address: item.address,
        coordinates: [item.coordinates[0], item.coordinates[1]],
        images: item.imageUrls.map((u) => buildAssetUrl(u)).filter((u): u is string => u !== null),
        region: item.region,
        instagramId: item.instagramId || undefined,
        webSite: item.webSite || undefined,
        phoneNumber: item.phoneNumber || undefined,
        reservationUrl: item.reservationUrl || undefined,
        isWished: item.isWished,
      }));
    },
  });
