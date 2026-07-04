import { axiosOptionalAuth, axiosPrivate } from "@/src/services/api/customAxios";
import {
  ReviewSaveRequest,
  ReviewSaveResponse,
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
