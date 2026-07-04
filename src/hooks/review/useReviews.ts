import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import {
  createReview,
  createStaffRecruitmentReview,
  deleteReview,
  getReviewSummary,
  getReviews,
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

export const useReviews = (
  targetType: ReviewTargetType,
  targetId: number,
  enabled = true,
) => {
  return useQuery({
    queryKey: reviewListKey(targetType, targetId),
    queryFn: () =>
      targetType === "guestHouse"
        ? getReviews(targetId)
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
      ]);
      onSuccess?.();
    },
  });
};
