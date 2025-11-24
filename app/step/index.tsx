import { router, useLocalSearchParams } from "expo-router";
import { Pressable, Text } from "react-native";

import CustomSafeAreaView from "@/src/components/layout/CustomSafeAreaView";
import BackArrorHeader from "@/src/components/ui/BackArrowHeader";

export default function Step() {
  const { id } = useLocalSearchParams();

  return (
    <CustomSafeAreaView pageColor='bg-white'>
      <BackArrorHeader content='스텝 공고 상세 이동' />
      <Pressable onPress={() => router.push(`/step/stepDetail/${id}`)}>
        <Text>이동하기</Text>
      </Pressable>
    </CustomSafeAreaView>
  );
}
