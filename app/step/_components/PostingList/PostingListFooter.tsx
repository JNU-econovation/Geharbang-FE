import React from 'react';
import { ActivityIndicator, View } from 'react-native';

interface PostingListFooterProps {
  isLoadingMore: boolean;
}

export default function PostingListFooter({
  isLoadingMore,
}: PostingListFooterProps) {
  if (!isLoadingMore) return null;

  return (
    <View className="py-4 items-center">
      <ActivityIndicator size="small" color="#0284c7" />
    </View>
  );
}
