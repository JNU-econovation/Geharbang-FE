import BackArrow from "@/src/components/ui/BackArrow";
import { Text, View } from "react-native";
export default function GuestHouseDetail() {
  return (
    <View className='pt-40 pl-5'>
      <BackArrow size={20} color='black' />
      <Text>게하 상세보기 페이지</Text>
    </View>
  );
}
