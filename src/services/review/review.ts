import { axiosOptionalAuth, axiosPrivate } from "@/src/services/api/customAxios";
import {
  ReviewSaveRequest,
  ReviewSaveResponse,
  ReviewInsightsResponse,
  ReviewReportResponse,
  ReviewSummaryResponse,
  ReviewsResponse,
} from "@/src/types/models/review/Review";

export const createReview = async (
  guestHousePostId: number,
  data: ReviewSaveRequest
): Promise<number> => {
  const response = await axiosPrivate.post<ReviewSaveResponse>(
    `/api/v1/guest-houses/${guestHousePostId}/reviews`,
    data
  );
  return response.data.reviewId;
};

export const createStaffRecruitmentReview = async (
  staffRecruitmentId: number,
  data: ReviewSaveRequest
): Promise<number> => {
  const response = await axiosPrivate.post<ReviewSaveResponse>(
    `/api/v1/staff-recruitment/${staffRecruitmentId}/reviews`,
    data
  );
  return response.data.reviewId;
};

const REVIEW_PAGE_SIZE = 10;

export const getReviews = async (
  guestHousePostId: number,
  pageNumber = 0
): Promise<ReviewsResponse> => {
  const response = await axiosOptionalAuth.get<ReviewsResponse>(
    `/api/v1/guest-houses/${guestHousePostId}/reviews`,
    { params: { pageNumber } }
  );
  return response.data;
};

// 리뷰 인사이트(카테고리/키워드 칩)는 전체 리뷰를 기준으로 집계되므로,
// 목록도 페이지 단위로 끊지 않고 전부 불러와야 칩 개수와 실제 필터 결과가 어긋나지 않는다.
export const getAllReviews = async (
  guestHousePostId: number
): Promise<ReviewsResponse> => {
  const allReviews: ReviewsResponse["reviews"] = [];
  let pageNumber = 0;

  while (true) {
    const { reviews } = await getReviews(guestHousePostId, pageNumber);
    allReviews.push(...reviews);
    if (reviews.length < REVIEW_PAGE_SIZE) {
      break;
    }
    pageNumber += 1;
  }

  return { reviews: allReviews };
};

export const getStaffRecruitmentReviews = async (
  staffRecruitmentId: number,
  pageNumber = 0
): Promise<ReviewsResponse> => {
  const response = await axiosOptionalAuth.get<ReviewsResponse>(
    `/api/v1/staff-recruitment/${staffRecruitmentId}/reviews`,
    { params: { pageNumber } }
  );
  return response.data;
};

export const getReviewSummary = async (
  guestHousePostId: number
): Promise<ReviewSummaryResponse> => {
  const response = await axiosOptionalAuth.get<ReviewSummaryResponse>(
    `/api/v1/guest-houses/${guestHousePostId}/review-summary`
  );
  return response.data;
};

export const getStaffRecruitmentReviewSummary = async (
  staffRecruitmentId: number
): Promise<ReviewSummaryResponse> => {
  const response = await axiosOptionalAuth.get<ReviewSummaryResponse>(
    `/api/v1/staff-recruitment/${staffRecruitmentId}/review-summary`
  );
  return response.data;
};

export const updateReview = async (
  reviewId: number,
  data: ReviewSaveRequest
): Promise<void> => {
  await axiosPrivate.put(`/api/v1/reviews/${reviewId}`, data);
};

export const deleteReview = async (reviewId: number): Promise<void> => {
  await axiosPrivate.delete(`/api/v1/reviews/${reviewId}`);
};

export const getReviewInsights = async (
  guestHousePostId: number
): Promise<ReviewInsightsResponse> => {
  const response = await axiosOptionalAuth.get<ReviewInsightsResponse>(
    `/api/v1/guest-houses/${guestHousePostId}/review-insights`
  );
  return response.data;
};

export const getReviewReport = async (
  guestHousePostId: number
): Promise<ReviewReportResponse> => {
  const response = await axiosPrivate.get<ReviewReportResponse>(
    `/api/v1/operator/guest-houses/${guestHousePostId}/review-report`
  );
  return response.data;
};
