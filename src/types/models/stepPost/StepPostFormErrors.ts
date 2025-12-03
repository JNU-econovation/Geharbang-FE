export interface StepPostFormErrors {
  guestHouseName: string;
  workingRegion: string;
  location: string;
  workingStartDate: string;
  workingPeriod: string;
  workingTimeAndWork: workingTimeAndWorkErrors[];
  gender: string;
}

export interface workingTimeAndWorkErrors {
  workingTimeName: string;
  startTime: string;
  endTime: string;
  thatTimeWork: string;
  perWorkingDay: string;
  workingCount: string;
  closedCount: string;
}
