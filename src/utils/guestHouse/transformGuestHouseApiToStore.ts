import { buildAssetUrl } from '@/src/config/url';
import { File } from '@/src/types/File';
import { GuestHouseDetailResponse, PartiesInfo, RoomsInfo } from '@/src/types/guestHouseDetail/GuestHouseDetailResponse';
import { Party, Room } from '@/src/types/models/guestHouse/enroll';

const urlToFile = (url: string): File => ({
  uri: buildAssetUrl(url) ?? url,
  type: 'image/jpeg',
  name: 'image.jpg',
});

const parseTimeString = (timeStr: string): Date => {
  const [hours, minutes] = timeStr.split(':').map(Number);
  const date = new Date();
  date.setHours(hours, minutes, 0, 0);
  return date;
};

const reversePartyType = (type: string): string => {
  const map: Record<string, string> = {
    '디너_파티': '디너 파티',
    '클럽_파티': '클럽 파티',
  };
  return map[type] ?? type;
};

const reverseRoomType = (type: string): '여성 전용 도미토리' | '남성 전용 도미토리' => {
  if (type === '여성전용') return '여성 전용 도미토리';
  return '남성 전용 도미토리';
};

const reverseOccupancy = (headCountType: string): '1인실' | '2인실' | '3인이상' => {
  const map: Record<string, '1인실' | '2인실' | '3인이상'> = {
    '_1인실': '1인실',
    '_2인실': '2인실',
    '_3인이상': '3인이상',
  };
  return map[headCountType] ?? '1인실';
};

const reverseAmenity = (amenity: string): string => amenity.replace(/_/g, ' ');

const transformParty = (party: PartiesInfo, index: number): Party => ({
  id: `${Date.now()}_${index}`,
  type: reversePartyType(party.type),
  images: party.imageUrls.map(urlToFile),
  startTime: parseTimeString(party.startTime),
  endTime: parseTimeString(party.endTime),
  days: party.weeklyDays,
  location: party.place,
  mood: party.moods[0] ?? '',
  allowExternal: party.isExternalGuestAllowed,
  guestFee: String(party.guestFee),
  externalFee: String(party.externalGuestFee),
  description: party.information,
});

const transformRoom = (room: RoomsInfo, index: number): Room => ({
  id: `${Date.now()}_${index}`,
  name: room.name,
  type: reverseRoomType(room.type),
  occupancy: reverseOccupancy(room.headCountType),
  checkInTime: parseTimeString(room.checkInTime),
  checkOutTime: parseTimeString(room.checkOutTime),
  price: String(room.pricePerNight),
  images: room.imageUrls.map(urlToFile),
});

export const transformGuestHouseApiToStore = (detail: GuestHouseDetailResponse) => {
  const step1Data = {
    guestHouseName: detail.guestHouseName,
    workingRegion: detail.region,
    location: (() => {
      const c = detail.location.coordinates;
      const isGeoJSON = c[0] > 90;
      return {
        roadAddress: detail.location.roadNameAddress,
        jibunAddress: detail.location.lotNumberAddress,
        latitude: isGeoJSON ? c[1] : c[0],
        longitude: isGeoJSON ? c[0] : c[1],
      };
    })(),
  };

  const step2Data = {
    mainImages: detail.imageUrls.map(urlToFile),
    introduction: detail.introduction,
    facilities: detail.amenities.map(reverseAmenity),
    atmosphere: detail.moods,
  };

  const step3Data = {
    parties: detail.parties.map(transformParty),
  };

  const step4Data = {
    rooms: detail.rooms.map(transformRoom),
  };

  const step5Data = {
    instagram: detail.contact.instagramId ?? '',
    phone: detail.contact.phoneNumber ?? '',
    website: detail.contact.webSite ?? '',
    ownerMessage: detail.ownerMessage ?? '',
  };

  return { step1Data, step2Data, step3Data, step4Data, step5Data };
};
