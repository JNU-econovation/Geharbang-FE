import { StepDetailResponse } from "@/src/types/models/stepDetail/StepDetailResponse";
import { Step1Data } from "@/src/types/models/stepRecruitment/Step1Data";
import { Step2Data } from "@/src/types/models/stepRecruitment/Step2Data";
import { Step3Data } from "@/src/types/models/stepRecruitment/Step3Data";
import { Step4Data } from "@/src/types/models/stepRecruitment/Step4Data";
import { Step5Data } from "@/src/types/models/stepRecruitment/Step5Data";

export interface StorePreloadData {
  step1Data: Step1Data;
  step2Data: Step2Data;
  step3Data: Step3Data;
  step4Data: Step4Data;
  step5Data: Step5Data;
}

const parseTime = (timeStr: string): Date => {
  const [hours, minutes] = timeStr.split(":").map(Number);
  const date = new Date();
  date.setHours(hours, minutes, 0, 0);
  return date;
};

const parseWeeklyWorkingDays = (str: string): number => {
  const match = str?.match(/주(\d+)일/);
  return match ? parseInt(match[1]) : 0;
};

export const transformApiToStore = (data: StepDetailResponse): StorePreloadData => {
  const step1Data: Step1Data = {
    guestHouseName: data.guestHouseName,
    workingRegion: data.region,
    location: {
      roadAddress: data.location.address,
      jibunAddress: data.location.address,
      longitude: data.location.coordinates[0],
      latitude: data.location.coordinates[1],
    },
  };

  const step2Data: Step2Data = {
    workingStartDate: data.workingInformation.startDate,
    workingPeriod: data.workingInformation.workingPeriod as Step2Data["workingPeriod"],
    workingTimeAndWork: data.workingInformation.jobs.map((job) => {
      const isRotation = job.workType === "로테이션";
      return {
        workingTimeName: job.name,
        startTime: parseTime(job.startTIme),
        endTime: parseTime(job.endTime),
        thatTimeWork: job.job,
        perWorkingDay: job.workType as "로테이션" | "_7일_기준" | "",
        workingCount: isRotation ? job.workDays : parseWeeklyWorkingDays(job.weeklyWorkingDays),
        closedCount: isRotation ? job.restDays : "",
      };
    }),
    gender: data.feature.gender as Step2Data["gender"],
  };

  const step3Data: Step3Data = {
    title: data.title,
    introduction: data.introduction.content,
    advantages: data.feature.advantages.map((text, i) => ({
      id: i.toString(),
      text,
    })),
    employeeBenefits: data.feature.employeeBenefits.map((text, i) => ({
      id: i.toString(),
      text,
    })),
    mainImageUrls: data.representativeImages,
    introImageUrls: data.introduction.images,
    mainImageFiles: [],
    introImageFiles: [],
  };

  const step4Data: Step4Data = {
    instagram: data.contact.instagramId ?? "",
    phone: data.contact.phoneNumber ?? "",
    email: data.contact.email ?? "",
    website: data.contact.webSite ?? "",
    ownerMessage: data.ownerMessage ?? "",
  };

  const step5Data: Step5Data = {
    questions: [],
  };

  return { step1Data, step2Data, step3Data, step4Data, step5Data };
};
