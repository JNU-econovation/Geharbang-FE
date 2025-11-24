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
  name: string;
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
  workScheduleType?: string[];
  gender?: string;
  pageNumber?: number;
}

export interface StaffRecruitmentResponse {
  staffRecruitmentPosts: StaffRecruitmentPost[];
}

export interface FilterState {
  region: string[];
  period: string[];
  workScheduleType: string[];
  gender: string;
}

export type FilterOption = 'views' | 'likes' | 'recent';
