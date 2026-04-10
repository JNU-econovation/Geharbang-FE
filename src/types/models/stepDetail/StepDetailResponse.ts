export interface StepDetailResponse {
  representativeImages: string[];
  title: string;
  guestHouseName: string;
  region: string;
  location: {
    address: string;
    coordinates: [number, number];
  };
  workingInformation: {
    startDate: string;
    isStartDateNegotiable: boolean;
    workingPeriod: string;
    jobs: JobInfo[];
  };
  introduction: {
    content: string;
    images: string[];
  };
  feature: {
    gender: string;
    advantages: string[];
    employeeBenefits: string[];
  };
  contact: {
    instagramId: string;
    phoneNumber: string;
    email: string;
    webSite: string;
  };
  isWished: boolean;
  ownerMessage: string;
}

export interface JobInfo {
  name: string;
  startTIme: string;
  endTime: string;
  job: string;
  workDays: number;
  restDays: number;
  workType: string;
  weeklyWorkingDays: string;
}
