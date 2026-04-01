import { File } from '@/src/types/File';
import { SelectedAddressProps } from '../../stepRecruitment/Step1Data';

export interface Party {
  id: string;
  type: string;
  customTypeName?: string;
  images: File[];
  startTime: Date;
  endTime: Date;
  days: string[];
  location: string;
  mood: string;
  allowExternal: boolean;
  guestFee: string;
  externalFee: string;
  description: string;
}

export interface Room {
  id: string;
  name: string;
  type: '여성 전용 도미토리' | '남성 전용 도미토리';
  occupancy: '1인실' | '2인실' | '3인이상';
  checkInTime: Date;
  checkOutTime: Date;
  price: string;
  images: File[];
}

export interface Step1Data {
  guestHouseName: string;
  workingRegion: string;
  location: SelectedAddressProps | null;
}

export interface Step2Data {
  mainImages: File[];
  introduction: string;
  facilities: string[]; // 편의시설 (태그 선택 + 직접 입력)
  atmosphere: string[]; // 최대 2개
}

export interface Step3Data {
  parties: Party[];
}

export interface Step4Data {
  rooms: Room[];
}

export interface Step5Data {
  instagram: string;
  phone: string;
  website: string;
  ownerMessage: string;
}

export interface GuestHouseEnrollData {
  guestHouseName: string;
  workingRegion: string;
  location: SelectedAddressProps | null;

  // Step 2: 게하 정보
  mainImages: File[];
  introduction: string;
  facilities: string[]; // 편의시설 (태그 선택 + 직접 입력)
  atmosphere: string[]; // 최대 2개
  parties: Party[];

  // Step 3: 객실 타입
  rooms: Room[];

  // Step 4: 연락처 및 기타
  instagram: string;
  phone: string;
  website: string;
  ownerMessage: string;
}

// 초기값
export const initialGuestHouseEnrollData: GuestHouseEnrollData = {
  // Step 1
  guestHouseName: '',
  workingRegion: '',
  location: null,

  // Step 2
  mainImages: [],
  introduction: '',
  facilities: [],
  atmosphere: [],
  parties: [],

  // Step 3
  rooms: [],

  // Step 4
  instagram: '',
  phone: '',
  website: '',
  ownerMessage: '',
};
