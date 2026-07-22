export interface ReviewSaveRequest {
  rating: number;
  content: string;
  imageUrls: string[];
}

export interface Review {
  id: number;
  guestHousePostId?: number;
  staffRecruitmentId?: number;
  userId: number;
  authorName: string;
  authorProfileImageUrl: string;
  rating: number;
  content: string;
  imageUrls: string[];
  isMine: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface ReviewsResponse {
  reviews: Review[];
}

export interface ReviewSaveResponse {
  reviewId: number;
}

export interface ReviewSummaryResponse {
  averageRating: number;
  reviewCount: number;
  hasMyReview: boolean;
  canWriteReview: boolean;
}

export interface ReviewCategoryGroup {
  category: string;
  reviewIds: number[];
}

export interface ReviewKeywordGroup {
  keyword: string;
  score: number;
  reviewIds: number[];
}

export interface ReviewInsightsResponse {
  categories: ReviewCategoryGroup[];
  keywords: ReviewKeywordGroup[];
}

export interface ReviewReportResponse {
  guestHousePostId: number;
  guestHouseName: string;
  reviewCount: number;
  report: string;
}
