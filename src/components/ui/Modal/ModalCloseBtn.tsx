import { Ionicons } from "@expo/vector-icons";
import { View } from "react-native";

interface ModalCloseBtnProps {
  modalVisible: boolean;
}

export default function ModalCloseBtn({ modalVisible }: ModalCloseBtnProps) {
  return (
    <View className='h-10 w-10 bg-[#ffffff] rounded-full flex items-center justify-center'>
      <Ionicons
        name={modalVisible ? "close-outline" : "expand-outline"}
        size={22}
      />
    </View>
  );
}
