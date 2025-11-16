import { router } from "expo-router";
import { Pressable, Text } from "react-native";

import CustomSafeAreaView from "@/src/components/layout/CustomSafeAreaView";
import BackArrorHeader from "@/src/components/ui/BackArrorHeader";

export default function Step() {
  return (
    <CustomSafeAreaView pageColor='bg-white'>
      <BackArrorHeader content='스텝 공고 상세 이동' />
      <Pressable onPress={() => router.push("/step/stepDetail")}>
        <Text>이동하기</Text>
      </Pressable>
    </CustomSafeAreaView>
  );
}
