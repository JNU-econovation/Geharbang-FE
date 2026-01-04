import { GuestHouseEnrollData, Party, Room } from '../models/guestHouse/enroll';

type Updater<T> = T | ((prev: T) => T);

// Step별 데이터 타입
export interface Step1Data {
  guestHouseName: string;
  workingRegion: string;
  location: GuestHouseEnrollData['location'];
}

export interface Step2Data {
  mainImages: GuestHouseEnrollData['mainImages'];
  introduction: string;
  facilities: string[];
  atmosphere: string[];
  parties: Party[];
}

export interface Step3Data {
  rooms: Room[];
}

export interface Step4Data {
  instagram: string;
  phone: string;
  email: string;
  website: string;
  ownerMessage: string;
}

// 각 Step의 Slice 타입
export interface Step1Slice {
  step1Data: Step1Data;
  setStep1Update: <K extends keyof Step1Data>(key: K, value: Step1Data[K]) => void;
}

export interface Step2Slice {
  step2Data: Step2Data;
  setStep2Update: <K extends keyof Step2Data>(key: K, value: Updater<Step2Data[K]>) => void;
  addParty: (party: Party) => void;
  removeParty: (partyId: string) => void;
  updateParty: (partyId: string, party: Party) => void;
}

export interface Step3Slice {
  step3Data: Step3Data;
  setStep3Update: <K extends keyof Step3Data>(key: K, value: Updater<Step3Data[K]>) => void;
  addRoom: (room: Room) => void;
  removeRoom: (roomId: string) => void;
  updateRoom: (roomId: string, room: Room) => void;
}

export interface Step4Slice {
  step4Data: Step4Data;
  setStep4Update: <K extends keyof Step4Data>(key: K, value: Step4Data[K]) => void;
}

// 모든 Slice를 합친 타입
export type AllSlices = Step1Slice & Step2Slice & Step3Slice & Step4Slice;

// 전체 Store 타입
export interface GuestHouseStore extends AllSlices {
  enrollData: GuestHouseEnrollData;

  updateEnrollData: <K extends keyof GuestHouseEnrollData>(
    key: K,
    value: Updater<GuestHouseEnrollData[K]>,
  ) => void;

  resetAllData: () => void;
}
