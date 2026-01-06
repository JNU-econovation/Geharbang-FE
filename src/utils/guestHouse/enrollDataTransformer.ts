import {
  ContactRequest,
  GuestHouseEnrollRequest,
  LocationRequest,
  PartyRequest,
  RoomRequest,
} from '@/src/types/api/guestHouse/GuestHouseEnrollRequest';
import {
  GuestHouseEnrollData,
  Party,
  Room,
} from '@/src/types/models/guestHouse/enroll';
import { formatTime } from '@/src/utils/common/dateFormatter';

const transformPartyType = (type: string): string => {
  const typeMap: Record<string, string> = {
    술파티: '술파티',
    포틀럭: '포틀럭',
    '디너 파티': '디너_파티',
    '클럽 파티': '클럽_파티',
    기타: '기타',
  };
  return typeMap[type] || type;
};

const transformRoomType = (type: string): string => {
  const typeMap: Record<string, string> = {
    '여성 전용 도미토리': '여성전용',
    '남성 전용 도미토리': '남성전용',
  };
  return typeMap[type] || type;
};

const transformOccupancy = (occupancy: string): string => {
  return `_${occupancy}`;
};

const transformAmenity = (amenity: string): string => {
  return amenity.replace(/ /g, '_');
};

const transformImagesToUrls = (files: Array<{ uri: string }>): string[] => {
  return files.map((file) => {
    if (file.uri.startsWith('file://')) {
      throw new Error(
        '이미지가 아직 업로드되지 않았습니다. 이미지를 먼저 업로드해주세요.',
      );
    }
    return file.uri;
  });
};

const transformParty = (party: Party): PartyRequest => {
  return {
    type: transformPartyType(party.type),
    otherPartyType: party.type === '기타' ? party.customTypeName || null : null,
    startTime: formatTime(party.startTime),
    endTime: formatTime(party.endTime),
    weeklyDays: party.days,
    place: party.location,
    moods: party.mood ? [party.mood] : [],
    isExternalGuestAllowed: party.allowExternal,
    guestFee: parseInt(party.guestFee, 10) || 0,
    externalGuestFee: parseInt(party.externalFee, 10) || 0,
    imageUrls: transformImagesToUrls(party.images),
    information: party.description,
  };
};

const transformRoom = (room: Room): RoomRequest => {
  return {
    name: room.name,
    type: transformRoomType(room.type),
    headCountType: transformOccupancy(room.occupancy),
    checkInTime: formatTime(room.checkInTime),
    checkOutTime: formatTime(room.checkOutTime),
    pricePerNight: parseInt(room.price, 10) || 0,
    imageUrls: transformImagesToUrls(room.images),
  };
};

const transformLocation = (
  location: GuestHouseEnrollData['location'],
): LocationRequest => {
  if (!location) {
    throw new Error('위치 정보가 없습니다.');
  }

  return {
    lotNumberAddress: location.jibunAddress || '',
    roadNameAddress: location.roadAddress || '',
    coordinates: [location.longitude || 0, location.latitude || 0],
  };
};

const transformContact = (data: GuestHouseEnrollData): ContactRequest => {
  return {
    phoneNumber: data.phone || '',
    instagramId: data.instagram || '',
    webSite: data.website || '',
  };
};

export const transformEnrollDataToRequest = (
  data: GuestHouseEnrollData,
): GuestHouseEnrollRequest => {
  return {
    guestHouseName: data.guestHouseName,
    imageUrls: transformImagesToUrls(data.mainImages),
    region: data.workingRegion,
    location: transformLocation(data.location),
    introduction: data.introduction,
    amenities: data.facilities.map(transformAmenity),
    moods: data.atmosphere,
    parties: data.parties.map(transformParty),
    rooms: data.rooms.map(transformRoom),
    contact: transformContact(data),
    ownerMessage: data.ownerMessage,
  };
};
