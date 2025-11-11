import { useImagePicker } from "@/src/hooks/useImagePicker";
import { File } from "@/src/types/File";
import { COLORS } from "@/src/utils/constants/colors";
import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { Image, Pressable, View} from "react-native";
import Flex from "../layout/Flex";
import TextSize from "./TextSize";

interface ImagePickerProps {
  selectedImageFile: File;
  setSelectedImageFile: (file: File) => void;
  error?: boolean;
}

export default function ImagePicker({
  selectedImageFile,
  setSelectedImageFile,
  error,
}: ImagePickerProps) {
  const { pickImage } = useImagePicker(setSelectedImageFile);

  return (
    <Flex items="center" justify="center" gap={10}>
      <Pressable
        onPress={pickImage}
        className="border overflow-hidden rounded-full"
        style={[
          {
            width: 100,
            height: 100,
            borderRadius: 50,
            backgroundColor: "#F3F4F6",
          },
          error
            ? { borderColor: COLORS.PRIMARY.RED }
            : { borderColor: "#afb1b4ff", borderStyle: "dashed" },
        ]}
      >
        <View className="flex-1 justify-center items-center">
          {selectedImageFile.uri ? (
            <Image
              source={{ uri: selectedImageFile.uri }}
              style={{ width: 100, height: 100 }}
            />
          ) : (
            <Ionicons
              name="camera-outline"
              size={20}
              color={"#9CA3AF"}
            ></Ionicons>
          )}
        </View>
      </Pressable>

      <Pressable onPress={pickImage}>
        <TextSize size={14} color={COLORS.GRAY.TEXT} content="사진 선택"/>
      </Pressable>
    </Flex>
  );
}
