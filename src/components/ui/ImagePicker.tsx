import { useImagePicker } from "@/src/hooks/useImagePicker";
import { COLORS } from "@/src/utils/constants/colors";
import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { Image, Pressable, Text, View } from "react-native";
import { File } from "@/src/types/File";

interface ImagePickerProps {
  selectedImageFile: File;
  setSelectedImageFile: (file: File) => void;
  errorMessage?: string;
  size?: number;
}

export default function ImagePicker({
  selectedImageFile,
  setSelectedImageFile,
  errorMessage,
  size = 100,
}: ImagePickerProps) {
  const { pickImage } = useImagePicker(setSelectedImageFile);

  return (
    <View className="items-center justify-center">
      <Pressable
        onPress={pickImage}
        className={`items-center justify-center border overflow-hidden`}
        style={[{
          width: size,
          height: size,
          borderRadius: size / 2,
          backgroundColor: "#F3F4F6"
          
        }, errorMessage ? {borderColor : COLORS.PRIMARY.RED}:{ borderColor: "#afb1b4ff" , borderStyle: "dashed"}]}
      >
        {selectedImageFile.uri  ? (
          <Image
            source={{ uri: selectedImageFile.uri }}
            style={{ width: size, height: size }}
          />
        ) : (
          <Ionicons
            name="camera-outline"
            size={size * 0.2}
            color={"#9CA3AF"}
          ></Ionicons>
        )}
      </Pressable>

      <Pressable onPress={pickImage} className="pt-4">
        <Text className="text-gray-text">사진 선택</Text>
      </Pressable>

      <View style={{alignSelf:"flex-start"}} className="mt-4 ml-1">
        <Text className="text-primary-red text-xs">
          {errorMessage ? errorMessage : " "}
        </Text>
      </View>
    </View>
  );
}
