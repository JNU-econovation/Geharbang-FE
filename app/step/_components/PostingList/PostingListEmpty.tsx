import ErrorMessage from "@/src/components/ui/ErrorMessage";
import LoadingSkeleton from "@/src/components/ui/LoadingSkeleton";
import React from "react";
import { Text, View } from "react-native";

interface PostingListEmptyProps {
  isLoading: boolean;
  error: string | null;
  onRetry: () => void;
}

export default function PostingListEmpty({
  isLoading,
  error,
  onRetry,
}: PostingListEmptyProps) {
  if (isLoading) {
    return <LoadingSkeleton variant='card' count={5} />;
  }

  if (error) {
    return <ErrorMessage message={error} onRetry={onRetry} />;
  }

  return (
    <View className='flex-1 items-center justify-center py-20'>
      <Text className='text-gray-500 text-base'>검색 결과가 없습니다</Text>
    </View>
  );
}
