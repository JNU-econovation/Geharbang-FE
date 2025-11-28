import React from 'react';

import CustomSafeAreaView from '@/src/components/layout/CustomSafeAreaView';
import PostingListScreen from './_components/PostingListScreen';

export default function Step() {
  return (
    <>
      <CustomSafeAreaView
        pageColor="bg-white"
        statusBarBackgroundColor="bg-white"
      >
        <PostingListScreen />
      </CustomSafeAreaView>
    </>
  );
}