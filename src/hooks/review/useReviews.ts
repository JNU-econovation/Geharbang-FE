import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import {
  createReview,
  createStaffRecruitmentReview,
  deleteReview,
  getAllReviews,
  getReviewInsights,
  getReviewReport,
  getReviewSummary,
  getStaffRecruitmentReviewSummary,
  getStaffRecruitmentReviews,
  updateReview,
} from "@/src/services/review/review";
import { ReviewSaveRequest } from "@/src/types/models/review/Review";

export type ReviewTargetType = "guestHouse" | "staffRecruitment";

const reviewListKey = (targetType: ReviewTargetType, targetId: number) => [
  "reviews",
  targetType,
  targetId,
];

const reviewSummaryKey = (targetType: ReviewTargetType, targetId: number) => [
  "reviewSummary",
  targetType,
  targetId,
];

const reviewInsightsKey = (targetType: ReviewTargetType, targetId: number) => [
  "reviewInsights",
  targetType,
  targetId,
];

const reviewReportKey = (guestHousePostId: number) => [
  "reviewReport",
  guestHousePostId,
];

export const useReviews = (
  targetType: ReviewTargetType,
  targetId: number,
  enabled = true,
) => {
  return useQuery({
    queryKey: reviewListKey(targetType, targetId),
    queryFn: () =>
      targetType === "guestHouse"
        ? getAllReviews(targetId)
        : getStaffRecruitmentReviews(targetId),
    enabled: enabled && Number.isFinite(targetId),
  });
};

export const useReviewSummary = (
  targetType: ReviewTargetType,
  targetId: number,
  enabled = true,
) => {
  return useQuery({
    queryKey: reviewSummaryKey(targetType, targetId),
    queryFn: () =>
      targetType === "guestHouse"
        ? getReviewSummary(targetId)
        : getStaffRecruitmentReviewSummary(targetId),
    enabled: enabled && Number.isFinite(targetId),
  });
};

export const useReviewInsights = (
  targetType: ReviewTargetType,
  targetId: number,
  enabled = true,
) => {
  return useQuery({
    queryKey: reviewInsightsKey(targetType, targetId),
    queryFn: () => getReviewInsights(targetId),
    enabled: enabled && targetType === "guestHouse" && Number.isFinite(targetId),
  });
};

export const useReviewReport = (
  guestHousePostId: number,
  enabled = true,
) => {
  return useQuery({
    queryKey: reviewReportKey(guestHousePostId),
    queryFn: () => getReviewReport(guestHousePostId),
    enabled: enabled && Number.isFinite(guestHousePostId) && guestHousePostId > 0,
  });
};

export const useCreateReview = (
  targetType: ReviewTargetType,
  targetId: number,
  onSuccess?: () => void,
) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: ReviewSaveRequest) =>
      targetType === "guestHouse"
        ? createReview(targetId, data)
        : createStaffRecruitmentReview(targetId, data),
    onSuccess: async () => {
      await Promise.all([
        queryClient.invalidateQueries({
          queryKey: reviewListKey(targetType, targetId),
        }),
        queryClient.invalidateQueries({
          queryKey: reviewSummaryKey(targetType, targetId),
        }),
        queryClient.invalidateQueries({
          queryKey: reviewInsightsKey(targetType, targetId),
        }),
        queryClient.invalidateQueries({
          queryKey: reviewReportKey(targetId),
        }),
      ]);
      onSuccess?.();
    },
  });
};

export const useUpdateReview = (
  targetType: ReviewTargetType,
  targetId: number,
  reviewId: number,
  onSuccess?: () => void,
) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: ReviewSaveRequest) => updateReview(reviewId, data),
    onSuccess: async () => {
      await Promise.all([
        queryClient.invalidateQueries({
          queryKey: reviewListKey(targetType, targetId),
        }),
        queryClient.invalidateQueries({
          queryKey: reviewSummaryKey(targetType, targetId),
        }),
        queryClient.invalidateQueries({
          queryKey: reviewInsightsKey(targetType, targetId),
        }),
        queryClient.invalidateQueries({
          queryKey: reviewReportKey(targetId),
        }),
      ]);
      onSuccess?.();
    },
  });
};

export const useDeleteReview = (
  targetType: ReviewTargetType,
  targetId: number,
  onSuccess?: () => void,
) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (reviewId: number) => deleteReview(reviewId),
    onSuccess: async () => {
      await Promise.all([
        queryClient.invalidateQueries({
          queryKey: reviewListKey(targetType, targetId),
        }),
        queryClient.invalidateQueries({
          queryKey: reviewSummaryKey(targetType, targetId),
        }),
        queryClient.invalidateQueries({
          queryKey: reviewInsightsKey(targetType, targetId),
        }),
        queryClient.invalidateQueries({
          queryKey: reviewReportKey(targetId),
        }),
      ]);
      onSuccess?.();
    },
  });
};
