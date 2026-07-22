import { useMemo, useState } from "react";
import {
  ActivityIndicator,
  Alert,
  GestureResponderEvent,
  Modal,
  Pressable,
  ScrollView,
  Text,
  TextInput,
  View,
} from "react-native";
import { FontAwesome } from "@expo/vector-icons";

import { buildAssetUrl } from "@/src/config/url";
import Button from "@/src/components/ui/Button/Button";
import CachedImage from "@/src/components/ui/CachedImage";
import MultiImagePicker from "@/src/components/ui/imagePicker/MultiImagePicker";
import TextSize from "@/src/components/ui/TextSize";
import { useRequireLogin } from "@/src/hooks/common/useRequireLogin";
import {
  ReviewTargetType,
  useCreateReview,
  useDeleteReview,
  useReviewInsights,
  useReviewSummary,
  useReviews,
  useUpdateReview,
} from "@/src/hooks/review/useReviews";
import { uploadReviewImages } from "@/src/services/review/uploadReviewImages";
import { File } from "@/src/types/File";
import { Review } from "@/src/types/models/review/Review";
import { COLORS } from "@/src/utils/constants/colors";

interface ReviewSectionProps {
  targetType: ReviewTargetType;
  targetId: number;
  averageRating?: number;
  reviewCount?: number;
  hasMyReview?: boolean;
  onReviewSubmitted?: () => void;
}

const MAX_REVIEW_IMAGE_COUNT = 5;

type ReviewFilter = {
  label: string;
  type: "category" | "keyword";
  reviewIds: number[];
};

const CATEGORY_HIGHLIGHT_TERMS: Record<string, string[]> = {
  만족도: ["만족", "좋", "추천", "다음"],
  서비스: ["친절", "안내", "직원", "사장님"],
  분위기: ["분위기", "조용", "시끄럽", "파티", "활발"],
  청결도: ["청결", "깨끗", "청소", "화장실"],
  위치: ["위치", "가까", "주변"],
  전망: ["전망", "바다", "뷰"],
  "음식/조식": ["음식", "조식", "바베큐", "주방"],
  가격: ["가격", "가성비", "비용"],
  비품: ["비품", "침대", "침구", "매트리스"],
  편의시설: ["편의", "시설", "공용", "주방"],
  주차공간: ["주차"],
};

const getVisibleReviewFilters = (
  filters: ReviewFilter[],
  reviews: Review[],
): ReviewFilter[] => {
  const visibleReviewIds = new Set(reviews.map((review) => review.id));

  return filters
    .map((filter) => ({
      ...filter,
      reviewIds: filter.reviewIds.filter((reviewId) =>
        visibleReviewIds.has(reviewId),
      ),
    }))
    .filter((filter) => filter.reviewIds.length > 0);
};

const formatDate = (date: string) => {
  const parsed = new Date(date);
  if (Number.isNaN(parsed.getTime())) {
    return "";
  }

  const year = parsed.getFullYear();
  const month = String(parsed.getMonth() + 1).padStart(2, "0");
  const day = String(parsed.getDate()).padStart(2, "0");
  return `${year}.${month}.${day}`;
};

const getReviewErrorMessage = (targetType: ReviewTargetType) => {
  if (targetType === "staffRecruitment") {
    return "합격한 스텝 공고에만 리뷰를 작성할 수 있어요.";
  }

  return "리뷰를 저장할 수 없어요. 잠시 후 다시 시도해주세요.";
};

const escapeRegExp = (value: string) =>
  value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");

const getReviewHighlightTerms = (filter: ReviewFilter | null) => {
  if (!filter) {
    return [];
  }

  if (filter.type === "keyword") {
    return [filter.label];
  }

  return CATEGORY_HIGHLIGHT_TERMS[filter.label] ?? [filter.label];
};

function RatingStars({
  rating,
  onChange,
  size = 22,
}: {
  rating: number;
  onChange?: (rating: number) => void;
  size?: number;
}) {
  const getIconName = (value: number) => {
    if (rating >= value) {
      return "star";
    }

    if (rating >= value - 0.5) {
      return "star-half-o";
    }

    return "star-o";
  };

  const handlePress = (value: number, event: GestureResponderEvent) => {
    const nextRating = event.nativeEvent.locationX <= size / 2 ? value - 0.5 : value;
    onChange?.(Math.max(0.5, nextRating));
  };

  return (
    <View className='flex-row items-center gap-1'>
      {[1, 2, 3, 4, 5].map((value) => (
        <Pressable
          key={value}
          disabled={!onChange}
          onPress={(event) => handlePress(value, event)}
          hitSlop={8}
        >
          <FontAwesome
            name={getIconName(value)}
            size={size}
            color={value <= Math.round(rating) ? "#F59E0B" : "#D1D5DB"}
          />
        </Pressable>
      ))}
    </View>
  );
}

function ReviewImages({ imageUrls }: { imageUrls: string[] }) {
  if (imageUrls.length === 0) {
    return null;
  }

  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      contentContainerClassName='gap-2'
    >
      {imageUrls.map((url, index) => {
        const imageUri = buildAssetUrl(url);
        if (!imageUri) {
          return null;
        }

        return (
          <View
            key={`${url}-${index}`}
            className='rounded-lg overflow-hidden bg-gray-100'
            style={{ width: 88, height: 88 }}
          >
            <CachedImage uri={imageUri} className='w-full h-full' />
          </View>
        );
      })}
    </ScrollView>
  );
}

function HighlightedReviewContent({
  content,
  highlightTerms,
}: {
  content: string;
  highlightTerms: string[];
}) {
  const validTerms = highlightTerms
    .map((term) => term.trim())
    .filter((term) => term.length > 0);

  if (validTerms.length === 0) {
    return <TextSize size={14} color='#364153' content={content} />;
  }

  const pattern = new RegExp(`(${validTerms.map(escapeRegExp).join("|")})`, "gi");
  const parts = content.split(pattern).filter((part) => part.length > 0);

  return (
    <Text
      allowFontScaling={false}
      style={{
        fontSize: 14,
        color: "#364153",
        lineHeight: 22,
        flexShrink: 1,
      }}
    >
      {parts.map((part, index) => {
        const isHighlighted = validTerms.some(
          (term) => part.toLowerCase() === term.toLowerCase(),
        );

        return (
          <Text
            key={`${part}-${index}`}
            allowFontScaling={false}
            style={
              isHighlighted
                ? {
                    color: COLORS.PRIMARY.BLUE,
                    fontWeight: "700",
                  }
                : undefined
            }
          >
            {part}
          </Text>
        );
      })}
    </Text>
  );
}

function ReviewItem({
  review,
  onEdit,
  onDelete,
  isDeleting,
  highlightTerms,
}: {
  review: Review;
  onEdit: (review: Review) => void;
  onDelete: (reviewId: number) => void;
  isDeleting: boolean;
  highlightTerms: string[];
}) {
  return (
    <View className='py-4 border-b border-gray-100'>
      <View className='flex-row items-start justify-between gap-3'>
        <View className='flex-1'>
          <TextSize
            size={15}
            color='#101828'
            weight='600'
            content={review.authorName || "게하르방 사용자"}
          />
          <View className='pt-1' />
          <View className='flex-row items-center gap-2'>
            <RatingStars rating={review.rating} size={15} />
            <TextSize
              size={12}
              color={COLORS.GRAY.TEXT}
              content={formatDate(review.createdAt)}
            />
          </View>
        </View>
        {review.isMine && (
          <View className='flex-row items-center gap-3'>
            <Pressable onPress={() => onEdit(review)} hitSlop={8}>
              <TextSize size={13} color={COLORS.PRIMARY.BLUE} content='수정' />
            </Pressable>
            <Pressable
              disabled={isDeleting}
              onPress={() => onDelete(review.id)}
              hitSlop={8}
            >
              <TextSize size={13} color={COLORS.PRIMARY.RED} content='삭제' />
            </Pressable>
          </View>
        )}
      </View>
      <View className='pt-3' />
      <HighlightedReviewContent
        content={review.content}
        highlightTerms={highlightTerms}
      />
      <View className='pt-3' />
      <ReviewImages imageUrls={review.imageUrls} />
    </View>
  );
}

function ReviewInsightChips({
  filters,
  selectedFilter,
  onSelect,
}: {
  filters: ReviewFilter[];
  selectedFilter?: ReviewFilter | null;
  onSelect: (filter: ReviewFilter) => void;
}) {
  if (filters.length === 0) {
    return null;
  }

  const rows = filters.reduce<ReviewFilter[][]>(
    (acc, filter, index) => {
      acc[index % 2].push(filter);
      return acc;
    },
    [[], []],
  );

  return (
    <View className='pt-3'>
      <View className='gap-2'>
        {rows.map((row, rowIndex) => (
          <ScrollView
            key={`review-insight-row-${rowIndex}`}
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerClassName='gap-2 pr-4'
          >
            {row.map((filter) => {
              const isSelected =
                selectedFilter?.type === filter.type &&
                selectedFilter?.label === filter.label;
              return (
                <Pressable
                  key={`${filter.type}-${filter.label}`}
                  onPress={() => onSelect(filter)}
                  className={`px-3 py-2 rounded-full border ${
                    isSelected
                      ? "bg-primary-blue border-primary-blue"
                      : "bg-white border-gray-200"
                  }`}
                >
                  <TextSize
                    size={13}
                    color={isSelected ? "#ffffff" : "#364153"}
                    content={`${filter.label} ${filter.reviewIds.length}`}
                  />
                </Pressable>
              );
            })}
          </ScrollView>
        ))}
      </View>
    </View>
  );
}

export default function ReviewSection({
  targetType,
  targetId,
  averageRating = 0,
  reviewCount = 0,
  hasMyReview = false,
  onReviewSubmitted,
}: ReviewSectionProps) {
  const { requireLogin } = useRequireLogin();
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [editingReview, setEditingReview] = useState<Review | null>(null);
  const [rating, setRating] = useState(5);
  const [content, setContent] = useState("");
  const [selectedImageFiles, setSelectedImageFiles] = useState<File[]>([]);
  const [existingImageUrls, setExistingImageUrls] = useState<string[]>([]);
  const [isUploadingImages, setIsUploadingImages] = useState(false);
  const [selectedFilter, setSelectedFilter] = useState<ReviewFilter | null>(null);

  const { data, isPending, isError, refetch } = useReviews(
    targetType,
    targetId,
    targetId > 0,
  );
  const { data: summary } = useReviewSummary(targetType, targetId, targetId > 0);
  const { data: insights } = useReviewInsights(
    targetType,
    targetId,
    targetId > 0,
  );
  const createReviewMutation = useCreateReview(targetType, targetId, () => {
    closeModal();
    onReviewSubmitted?.();
  });
  const updateReviewMutation = useUpdateReview(
    targetType,
    targetId,
    editingReview?.id ?? 0,
    () => {
      closeModal();
      onReviewSubmitted?.();
    },
  );
  const deleteReviewMutation = useDeleteReview(targetType, targetId, () => {
    onReviewSubmitted?.();
  });

  const reviews = data?.reviews ?? [];
  const allCategoryFilters = useMemo<ReviewFilter[]>(
    () =>
      insights?.categories?.map((group) => ({
        label: group.category,
        type: "category" as const,
        reviewIds: group.reviewIds,
      })) ?? [],
    [insights?.categories],
  );
  const allKeywordFilters = useMemo<ReviewFilter[]>(
    () =>
      insights?.keywords?.map((group) => ({
        label: group.keyword,
        type: "keyword" as const,
        reviewIds: group.reviewIds,
      })) ?? [],
    [insights?.keywords],
  );
  const categoryFilters = useMemo(
    () => getVisibleReviewFilters(allCategoryFilters, reviews),
    [allCategoryFilters, reviews],
  );
  const keywordFilters = useMemo(
    () => getVisibleReviewFilters(allKeywordFilters, reviews),
    [allKeywordFilters, reviews],
  );
  const visibleReviews = useMemo(() => {
    if (!selectedFilter) {
      return reviews;
    }

    const selectedReviewIds = new Set(selectedFilter.reviewIds);
    return reviews.filter((review) => selectedReviewIds.has(review.id));
  }, [reviews, selectedFilter]);
  const insightFilters = useMemo(
    () =>
      [...categoryFilters, ...keywordFilters]
        .sort((a, b) => b.reviewIds.length - a.reviewIds.length)
        .slice(0, 12),
    [categoryFilters, keywordFilters],
  );
  const selectedFilterLabel = selectedFilter
    ? selectedFilter.label
    : "";
  const reviewHighlightTerms = useMemo(
    () => getReviewHighlightTerms(selectedFilter),
    [selectedFilter],
  );
  const currentAverageRating = summary?.averageRating ?? averageRating;
  const currentReviewCount = summary?.reviewCount ?? reviewCount;
  const currentHasMyReview = summary?.hasMyReview ?? hasMyReview;
  const currentCanWriteReview =
    targetType === "guestHouse"
      ? !currentHasMyReview
      : (summary?.canWriteReview ?? false);
  const displayRating = useMemo(
    () => currentAverageRating.toFixed(1),
    [currentAverageRating],
  );
  const isSubmitting =
    isUploadingImages ||
    createReviewMutation.isPending ||
    updateReviewMutation.isPending;

  const handleSelectFilter = (filter: ReviewFilter) => {
    setSelectedFilter((current) =>
      current?.type === filter.type && current?.label === filter.label
        ? null
        : filter,
    );
  };

  const closeModal = () => {
    setIsModalVisible(false);
    setEditingReview(null);
    setRating(5);
    setContent("");
    setSelectedImageFiles([]);
    setExistingImageUrls([]);
    setIsUploadingImages(false);
  };

  const handleOpenCreateModal = () => {
    requireLogin(() => {
      setEditingReview(null);
      setRating(5);
      setContent("");
      setSelectedImageFiles([]);
      setExistingImageUrls([]);
      setIsModalVisible(true);
    });
  };

  const handleOpenEditModal = (review: Review) => {
    setEditingReview(review);
    setRating(review.rating);
    setContent(review.content);
    setSelectedImageFiles([]);
    setExistingImageUrls(review.imageUrls);
    setIsModalVisible(true);
  };

  const handleSubmit = async () => {
    const trimmedContent = content.trim();
    if (trimmedContent.length < 10) {
      Alert.alert("리뷰 작성", "리뷰 내용을 10자 이상 작성해주세요.");
      return;
    }

    try {
      setIsUploadingImages(true);
      const uploadedImageUrls = await uploadReviewImages(selectedImageFiles);
      const imageUrls = [...existingImageUrls, ...uploadedImageUrls];
      setIsUploadingImages(false);

      const payload = {
        rating,
        content: trimmedContent,
        imageUrls,
      };

      if (editingReview) {
        updateReviewMutation.mutate(payload, {
          onError: () => {
            Alert.alert("리뷰 수정", getReviewErrorMessage(targetType));
          },
        });
        return;
      }

      createReviewMutation.mutate(payload, {
        onError: () => {
          Alert.alert("리뷰 작성", getReviewErrorMessage(targetType));
        },
      });
    } catch {
      setIsUploadingImages(false);
      Alert.alert("이미지 업로드", "사진 업로드에 실패했어요.");
    }
  };

  const handleDelete = (reviewId: number) => {
    Alert.alert("리뷰 삭제", "작성한 리뷰를 삭제할까요?", [
      { text: "취소", style: "cancel" },
      {
        text: "삭제",
        style: "destructive",
        onPress: () => {
          deleteReviewMutation.mutate(reviewId, {
            onError: () => {
              Alert.alert("리뷰 삭제", "리뷰를 삭제할 수 없어요.");
            },
          });
        },
      },
    ]);
  };

  return (
    <View>
      <View className='flex-row items-center justify-between'>
        <TextSize content='리뷰' size={20} color='#101828' weight='bold' />
        {currentCanWriteReview && (
          <Pressable onPress={handleOpenCreateModal} hitSlop={8}>
            <TextSize size={14} color={COLORS.PRIMARY.BLUE} content='작성하기' />
          </Pressable>
        )}
      </View>
      {targetType === "staffRecruitment" && !currentCanWriteReview && !currentHasMyReview && (
        <View className='pt-2'>
          <TextSize
            size={13}
            color={COLORS.GRAY.TEXT}
            content='합격한 스텝 공고에만 리뷰를 작성할 수 있어요.'
          />
        </View>
      )}

      <View className='mt-5 p-4 border border-gray-200 rounded-lg bg-white'>
        <View className='flex-row items-center justify-between'>
          <View>
            <TextSize size={13} color={COLORS.GRAY.TEXT} content='평균 평점' />
            <View className='pt-1' />
            <View className='flex-row items-end gap-1'>
              <TextSize
                size={28}
                color='#101828'
                weight='700'
                content={displayRating}
              />
              <TextSize size={13} color={COLORS.GRAY.TEXT} content='/ 5.0' />
            </View>
          </View>
          <View className='items-end'>
            <RatingStars rating={currentAverageRating} size={19} />
            <View className='pt-2' />
            <TextSize
              size={13}
              color={COLORS.GRAY.TEXT}
              content={`${currentReviewCount}개의 리뷰`}
            />
          </View>
        </View>
      </View>

      {targetType === "guestHouse" && (
        <View className='mt-4 p-4 border border-gray-200 rounded-lg bg-white'>
          <View className='flex-row items-center justify-between'>
            <TextSize
              size={15}
              color='#101828'
              weight='600'
              content='리뷰에서 자주 언급된 내용'
            />
            {selectedFilter && (
              <Pressable onPress={() => setSelectedFilter(null)} hitSlop={8}>
                <TextSize
                  size={13}
                  color={COLORS.PRIMARY.BLUE}
                  content='전체보기'
                />
              </Pressable>
            )}
          </View>
          <View className='pt-2'>
            <TextSize
              size={13}
              color={COLORS.GRAY.TEXT}
              content='많이 나온 주제를 눌러 관련 리뷰만 모아볼 수 있어요.'
            />
          </View>
          <ReviewInsightChips
            filters={insightFilters}
            selectedFilter={selectedFilter}
            onSelect={handleSelectFilter}
          />
          {insightFilters.length === 0 && (
            <View className='pt-3'>
              <TextSize
                size={13}
                color={COLORS.GRAY.TEXT}
                content='분석할 리뷰가 조금 더 쌓이면 키워드를 보여드릴게요.'
              />
            </View>
          )}
        </View>
      )}

      <View className='pt-2'>
        {selectedFilter && reviews.length > 0 && (
          <View className='pt-2 pb-1'>
            <TextSize
              size={13}
              color={COLORS.GRAY.TEXT}
              content={`${selectedFilterLabel} 관련 리뷰 ${visibleReviews.length}개`}
            />
          </View>
        )}
        {isPending ? (
          <View className='py-8 items-center'>
            <ActivityIndicator color={COLORS.PRIMARY.BLUE} />
          </View>
        ) : isError ? (
          <View className='py-6 items-center gap-3'>
            <TextSize
              size={14}
              color={COLORS.GRAY.TEXT}
              content='리뷰를 불러오지 못했어요.'
            />
            <Pressable onPress={() => refetch()}>
              <TextSize
                size={14}
                color={COLORS.PRIMARY.BLUE}
                content='다시 시도'
              />
            </Pressable>
          </View>
        ) : reviews.length === 0 ? (
          <View className='py-8 items-center'>
            <TextSize
              size={14}
              color={COLORS.GRAY.TEXT}
              content='아직 작성된 리뷰가 없어요.'
            />
          </View>
        ) : visibleReviews.length === 0 ? (
          <View className='py-8 items-center'>
            <TextSize
              size={14}
              color={COLORS.GRAY.TEXT}
              content='선택한 조건에 해당하는 리뷰가 현재 목록에 없어요.'
            />
          </View>
        ) : (
          visibleReviews.map((review) => (
            <ReviewItem
              key={review.id}
              review={review}
              onEdit={handleOpenEditModal}
              onDelete={handleDelete}
              isDeleting={deleteReviewMutation.isPending}
              highlightTerms={reviewHighlightTerms}
            />
          ))
        )}
      </View>

      <Modal visible={isModalVisible} transparent animationType='fade'>
        <View className='flex-1 justify-end bg-black/40'>
          <View className='max-h-[88%] bg-white rounded-t-2xl'>
            <ScrollView
              keyboardShouldPersistTaps='handled'
              contentContainerClassName='px-4 pt-5 pb-8'
            >
              <View className='flex-row items-center justify-between'>
                <TextSize
                  size={18}
                  color='#101828'
                  weight='700'
                  content={editingReview ? "리뷰 수정" : "리뷰 작성"}
                />
                <Pressable onPress={closeModal} hitSlop={8}>
                  <TextSize size={24} color={COLORS.GRAY.TEXT} content='×' />
                </Pressable>
              </View>

              <View className='pt-6 items-center'>
                <RatingStars rating={rating} onChange={setRating} size={34} />
                <View className='pt-2' />
                <TextSize
                  size={14}
                  color={COLORS.GRAY.TEXT}
                  content={`${rating.toFixed(1)}점을 선택했어요.`}
                />
              </View>

              <View className='pt-5'>
                <TextInput
                  value={content}
                  onChangeText={setContent}
                  placeholder='이용 경험을 자세히 남겨주세요.'
                  placeholderTextColor={COLORS.GRAY.PLACEHOLDER}
                  multiline
                  maxLength={500}
                  textAlignVertical='top'
                  className='border border-gray-200 rounded-lg p-3 text-[15px]'
                  style={{ minHeight: 132, lineHeight: 22 }}
                />
                <View className='pt-2 items-end'>
                  <TextSize
                    size={12}
                    color={COLORS.GRAY.TEXT}
                    content={`${content.length}/500`}
                  />
                </View>
              </View>

              <View className='pt-5'>
                <View className='flex-row items-center justify-between'>
                  <TextSize
                    size={15}
                    color='#101828'
                    weight='600'
                    content='사진 첨부'
                  />
                  <TextSize
                    size={12}
                    color={COLORS.GRAY.TEXT}
                    content={`${existingImageUrls.length + selectedImageFiles.length}/${MAX_REVIEW_IMAGE_COUNT}`}
                  />
                </View>
                <View className='pt-3' />
                <MultiImagePicker
                  selectedImageFiles={selectedImageFiles}
                  setSelectedImageFiles={setSelectedImageFiles}
                  existingImageUrls={existingImageUrls}
                  setExistingImageUrls={setExistingImageUrls}
                  maxCount={MAX_REVIEW_IMAGE_COUNT}
                  error={false}
                  clearError={() => undefined}
                />
              </View>

              <View className='pt-5'>
                <Button
                  variant='primary'
                  height={52}
                  textColor='#ffffff'
                  content={editingReview ? "수정하기" : "등록하기"}
                  isPending={isSubmitting}
                  onPress={handleSubmit}
                />
              </View>
            </ScrollView>
          </View>
        </View>
      </Modal>
    </View>
  );
}
