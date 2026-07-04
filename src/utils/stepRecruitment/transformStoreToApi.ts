import {
  ContactRequest,
  FeatureRequest,
  IntroductionRequest,
  JobRequest,
  LocationRequest,
  StaffRecruitmentRequest,
  WorkingInformationRequest,
} from '@/src/types/models/stepRecruitment/StaffRecruitmentRequest';
import { Step1Data } from '@/src/types/models/stepRecruitment/Step1Data';
import { Step2Data } from '@/src/types/models/stepRecruitment/Step2Data';
import { Step3Data } from '@/src/types/models/stepRecruitment/Step3Data';
import { Step4Data } from '@/src/types/models/stepRecruitment/Step4Data';
import { Step5Data } from '@/src/types/models/stepRecruitment/Step5Data';
import { AllSlices } from '@/src/types/store/stepRecruitmentStore';

export interface StepRecruitmentData {
  step1Data: Step1Data;
  step2Data: Step2Data;
  step3Data: Step3Data;
  step4Data: Step4Data;
  step5Data: Step5Data;
}

const formatTime = (date: Date): string => {
  const hours = date.getHours().toString().padStart(2, '0');
  const minutes = date.getMinutes().toString().padStart(2, '0');
  return `${hours}:${minutes}`;
};

export const transformStoreToApi = (
  store: AllSlices | StepRecruitmentData,
): StaffRecruitmentRequest => {
  const { step1Data, step2Data, step3Data, step4Data, step5Data } = store;

  const location: LocationRequest = {
    lotNumberAddress:
      step1Data.location?.jibunAddress || step1Data.location?.roadAddress || '',
    roadNameAddress:
      step1Data.location?.roadAddress || step1Data.location?.jibunAddress || '',
    coordinates: [
      step1Data.location?.longitude || 0,
      step1Data.location?.latitude || 0,
    ],
  };

  const jobs: JobRequest[] = step2Data.workingTimeAndWork.map((work) => {
    const isRotation = work.perWorkingDay === '로테이션';
    const is7DayBased = work.perWorkingDay === '_7일_기준';

    return {
      name: work.workingTimeName,
      startTime: formatTime(work.startTime),
      endTime: formatTime(work.endTime),
      job: work.thatTimeWork,
      standard: isRotation ? '로테이션' : '_7일_기준',
      workDays: isRotation
        ? typeof work.workingCount === 'number'
          ? work.workingCount
          : null
        : null,
      restDays: isRotation
        ? typeof work.closedCount === 'number'
          ? work.closedCount
          : null
        : null,
      weeklyWorkingDays: is7DayBased ? `주${work.workingCount}일` : null,
    };
  });

  const workingInformation: WorkingInformationRequest = {
    startDate: step2Data.workingStartDate,
    workingPeriod: step2Data.workingPeriod,
    jobs,
  };

  const feature: FeatureRequest = {
    gender: step2Data.gender,
    advantages: step3Data.advantages
      .map((adv) => adv.text)
      .filter((text) => text.trim() !== ''),
    employeeBenefits: step3Data.employeeBenefits
      .map((benefit) => benefit.text)
      .filter((text) => text.trim() !== ''),
  };

  const introduction: IntroductionRequest = {
    content: step3Data.introduction,
    imageUrls: step3Data.introImageUrls,
  };

  const contact: ContactRequest = {
    phoneNumber: step4Data.phone,
    instagramId: step4Data.instagram,
    email: step4Data.email,
    webSite: step4Data.website,
  };

  const questions: string[] = step5Data.questions.map((q) => q.text);

  return {
    title: step3Data.title,
    guestHouseName: step1Data.guestHouseName,
    region: step1Data.workingRegion,
    location,
    representativeImageUrls: step3Data.mainImageUrls,
    workingInformation,
    feature,
    introduction,
    contact,
    ownerMessage: step4Data.ownerMessage,
    questions,
  };
};
