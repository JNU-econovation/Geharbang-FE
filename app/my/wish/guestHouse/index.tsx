import { ActivityIndicator, ScrollView, View } from "react-native";

import CustomSafeAreaView from "@/src/components/layout/CustomSafeAreaView";
import BackArrorHeader from "@/src/components/ui/BackArrowHeader";
import Button from "@/src/components/ui/Button/Button";
import TextSize from "@/src/components/ui/TextSize";
import GuestHouseCard from "@/app/step/_components/GuestHouseCard";
import { useGetMyWishedGuestHouses } from "@/src/hooks/wish/useMyWishedPosts";
import { COLORS } from "@/src/utils/constants/colors";

export default function WishedGuestHouseScreen() {
  const { data, isLoading, isError, refetch } = useGetMyWishedGuestHouses();

  const posts = data?.guestHousePosts ?? [];

  return (
    <CustomSafeAreaView pageColor='bg-white'>
      <View className='px-3 pt-3 pb-4 border-b-[1px] border-[#E5E5E5] bg-white'>
        <BackArrorHeader content='찜한 게스트하우스' />
      </View>

      {isLoading ? (
        <View className='pt-2 h-64 items-center justify-center'>
          <ActivityIndicator size={80} color={COLORS.PRIMARY.BLUE} />
        </View>
      ) : isError ? (
        <View className='py-8 items-center'>
          <TextSize size={18} color={COLORS.GRAY.TEXT} content='잠시 오류가 발생했어요' />
          <View className='pt-4' />
          <Button
            variant='gray'
            height={56}
            width={320}
            content='다시 시도'
            textColor='#000'
            onPress={() => refetch()}
          />
        </View>
      ) : posts.length === 0 ? (
        <View className='flex-1 items-center justify-center'>
          <TextSize size={16} color={COLORS.GRAY.TEXT} content='찜한 게스트하우스가 없어요' />
        </View>
      ) : (
        <ScrollView className='pt-3'>
          {posts.map((item) => (
            <GuestHouseCard key={item.id} type='guestHouse' item={item} />
          ))}
        </ScrollView>
      )}
    </CustomSafeAreaView>
  );
}
