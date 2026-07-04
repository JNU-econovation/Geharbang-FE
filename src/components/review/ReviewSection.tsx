import { useMemo, useState } from "react";
import {
  ActivityIndicator,
  Alert,
  GestureResponderEvent,
  Modal,
  Pressable,
  ScrollView,
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

function ReviewItem({
  review,
  onEdit,
  onDelete,
  isDeleting,
}: {
  review: Review;
  onEdit: (review: Review) => void;
  onDelete: (reviewId: number) => void;
  isDeleting: boolean;
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
      <TextSize size={14} color='#364153' content={review.content} />
      <View className='pt-3' />
      <ReviewImages imageUrls={review.imageUrls} />
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

  const { data, isPending, isError, refetch } = useReviews(
    targetType,
    targetId,
    targetId > 0,
  );
  const { data: summary } = useReviewSummary(targetType, targetId, targetId > 0);
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

      <View className='pt-2'>
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
        ) : (
          reviews.map((review) => (
            <ReviewItem
              key={review.id}
              review={review}
              onEdit={handleOpenEditModal}
              onDelete={handleDelete}
              isDeleting={deleteReviewMutation.isPending}
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
