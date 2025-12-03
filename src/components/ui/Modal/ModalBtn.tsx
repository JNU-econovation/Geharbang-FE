import { Ionicons } from "@expo/vector-icons";
import { Pressable } from "react-native";

interface ModalBtnProps {
  modalVisible: boolean;
  onPress: () => void | Promise<void>;
  selectable?: boolean;
}

export default function ModalBtn({
  modalVisible,
  onPress,
  selectable,
}: ModalBtnProps) {
  return (
    <Pressable
      onPress={onPress}
      className={`absolute ${
        selectable
          ? "top-[105px] right-5"
          : modalVisible
          ? "top-14 right-5"
          : "top-3 right-3"
      } h-10 w-10 bg-white rounded-full flex items-center justify-center`}
    >
      <Ionicons
        name={
          selectable
            ? "checkmark"
            : modalVisible
            ? "close-outline"
            : "expand-outline"
        }
        size={22}
      />
    </Pressable>
  );
}
