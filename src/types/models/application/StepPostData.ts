import { Gender } from "../../Gender";

export interface StepPostData {
  guestHouseName: string;
  workingRegion: string;
  location: string;
  workingStartDate: string;
  workingPeriod: "단기" | "중기" | "장기" | "";
  workingTimeAndWork: IWorkingTimeAndWork[];
  gender: Gender;
}

export interface IWorkingTimeAndWork {
  workingTimeName: string;
  startTime: string;
  endTime: string;
  thatTimeWork: string;
  perWorkingDay: "로테이션" | "7일 기준" | "";
  workingCount: number;
  closedCount: number;
}
