import CustomSafeAreaView from "@/src/components/layout/CustomSafeAreaView";
import BackArrorHeader from "@/src/components/ui/BackArrowHeader";
import ErrorMessage from "@/src/components/ui/ErrorMessage";
import LoadingSkeleton from "@/src/components/ui/LoadingSkeleton";
import { useGetApplicationProfile } from "@/src/hooks/applicationList/useApplicationList";
import { useLocalSearchParams } from "expo-router";
import { View } from "react-native";

export default function ProfilePage() {
  const { applicationId } = useLocalSearchParams<{ applicationId: string }>();
  const {
    data: profile,
    isLoading,
    isError,
    refetch,
  } = useGetApplicationProfile(applicationId);
  
  return (
    <CustomSafeAreaView pageColor='bg-white'>
      <View className='px-4 py-3'>
        <BackArrorHeader content='지원서' />
      </View>
      {isLoading ? (
        <LoadingSkeleton />
      ) : isError ? (
        <ErrorMessage onRetry={refetch} />
      ) : (
        <>{/* 지원서 데이터 바인딩 예정 */}</>
      )}
    </CustomSafeAreaView>
  );
}
