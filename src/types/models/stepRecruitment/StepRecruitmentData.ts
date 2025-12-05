import { Gender } from "../../Gender";

export interface StepRecruitmentData {
  guestHouseName: string;
  workingRegion: string;
  location: SelectedAddressProps | null;
  workingStartDate: string;
  workingPeriod: "단기" | "중기" | "장기" | "";
  workingTimeAndWork: IWorkingTimeAndWork[];
  gender: Gender;
}

export interface IWorkingTimeAndWork {
  workingTimeName: string;
  startTime: Date;
  endTime: Date;
  thatTimeWork: string;
  perWorkingDay: "로테이션" | "_7일_기준" | "";
  workingCount: number | "";
  closedCount: number | "";
}

export interface SelectedAddressProps {
  roadAddress: string;
  jibunAddress: string;
  latitude: number;
  longitude: number;
}
