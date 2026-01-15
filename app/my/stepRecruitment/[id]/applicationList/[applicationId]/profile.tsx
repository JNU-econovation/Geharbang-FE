import CustomSafeAreaView from "@/src/components/layout/CustomSafeAreaView";
import BackArrorHeader from "@/src/components/ui/BackArrowHeader";
import { View } from "react-native";

export default function ProfilePage() {
  return (
    <CustomSafeAreaView pageColor='bg-white'>
      <View className='px-4 py-3'>
        <BackArrorHeader content='지원서' />
      </View>
    </CustomSafeAreaView>
  );
}
