export interface StepPostFormErrors {
  guestHouseName: string;
  workingRegion: string;
  location: string;
  workingStartDate: string;
  workingPeriod: string;
  workingTimeAndWork: WorkingTimeAndWorkErrors[];
  gender: string;
}

export interface WorkingTimeAndWorkErrors {
  workingTimeName: string;
  startTime: string;
  endTime: string;
  thatTimeWork: string;
  perWorkingDay: string;
  workingCount: string;
  closedCount: string;
}
