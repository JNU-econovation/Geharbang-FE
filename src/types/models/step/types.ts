import { SORT_OPTIONS } from "@/src/utils/constants/filterOptions";
import { PerWorkingDay } from "../stepRecruitment/PerWorkingDay";

export interface GuestHouse {
  id: number;
  name: string;
  location: string;
  period: string;
  views: number;
  likes: number;
  createdAt: string;
  image: string;
}

export interface StaffRecruitmentPost {
  id: number;
  title: string;
  tags: string[];
  region: string;
  isWished: boolean;
  imageUrl: string;
}

export interface StaffRecruitmentParams {
  keyword?: string;
  sort?: string;
  region?: string[];
  period?: string[];
  workType?: PerWorkingDay;
  workDays?: number;
  restDays?: number;
  workScheduleType?: string[];
  gender?: string;
  pageNumber?: number;
}

export interface StaffRecruitmentResponse {
  staffRecruitmentPosts: StaffRecruitmentPost[];
  // 백엔드가 제공하는 경우 (선택사항)
  hasNext?: boolean;
  totalPages?: number;
  pageSize?: number;
}

export interface FilterState {
  region: string[];
  period: string[];
  workType: PerWorkingDay;
  workDays: number | null;
  restDays: number | null;
  workScheduleType: string[];
  gender: string;
}

export type SortOption = (typeof SORT_OPTIONS)[number];
export type SortOptionKey = SortOption["key"];

// 페이지네이션 상수
export const PAGE_SIZE = 20; // 백엔드 기본값
