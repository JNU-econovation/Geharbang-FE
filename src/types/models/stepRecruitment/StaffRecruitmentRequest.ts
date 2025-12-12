export interface LocationRequest {
  lotNumberAddress: string;
  roadNameAddress: string;
  coordinates: [number, number];
}

export interface JobRequest {
  name: string;
  startTime: string;
  endTime: string;
  job: string;
  standard: '로테이션' | '7일_기준';
  workDays: number | null;
  restDays: number | null;
  weeklyWorkingDays: string | null;
}

export interface WorkingInformationRequest {
  startDate: string;
  workingPeriod: string;
  jobs: JobRequest[];
}

export interface FeatureRequest {
  gender: string;
  Advantages: string[];
  EmployeeBenefits: string[];
}

export interface IntroductionRequest {
  content: string;
  imageUrls: string[];
}

export interface ContactRequest {
  phoneNumber?: string;
  instagramId?: string;
  email?: string;
  webSite?: string;
}

export interface StaffRecruitmentRequest {
  title: string;
  guestHouseName: string;
  region: string;
  location: LocationRequest;
  representativeImageUrls: string[];
  workingInformation: WorkingInformationRequest;
  feature: FeatureRequest;
  introduction: IntroductionRequest;
  contact: ContactRequest;
  ownerMessage: string;
  questions: string[];
}
