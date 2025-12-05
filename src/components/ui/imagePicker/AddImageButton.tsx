import { COLORS } from "@/src/utils/constants/colors";
import { Pressable } from "react-native";
import Flex from "../../layout/Flex";
import TextSize from "../TextSize";

interface AddImageButtonProps {
  onAdd: () => void;
  size: number;
  currentImages: number;
  maxImages: number;
  error: boolean;
}

export default function AddImageButton({
  onAdd,
  size,
  currentImages,
  maxImages,
  error,
}: AddImageButtonProps) {
  return (
    <Pressable
      onPress={onAdd}
      style={{ width: size, height: size }}
      className={`border-2 rounded-xl bg-gray-50 pt-4 
        ${error ? "border-primary-red" : "border-gray-border"}`}
    >
      <Flex items='center' justify='center' gap={4}>
        <TextSize size={24} color={COLORS.GRAY.TEXT} content='+' />
        <TextSize size={14} color={COLORS.GRAY.TEXT} content='사진 추가' />
        <TextSize
          size={14}
          color={COLORS.GRAY.TEXT}
          content={`${currentImages}/${maxImages}`}
        />
      </Flex>
    </Pressable>
  );
}
