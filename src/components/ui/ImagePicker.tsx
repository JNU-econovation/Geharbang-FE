import { useImagePicker } from "@/src/hooks/useImagePicker";
import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { Image, Pressable, Text, View } from "react-native";

interface ImagePickerProps {
  selectedImageFile: string | null;
  setSelectedImageFile: (uri: string | null) => void;
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
        className={`items-center justify-center bg-gray-100 border overflow-hidden ${errorMessage ? "border-primary-red" : "border-dashed border-gray-400"}`}
        style={{
          width: size,
          height: size,
          borderRadius: size / 2,
        }}
      >
        {selectedImageFile ? (
          <Image
            source={{ uri: selectedImageFile }}
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

      <Pressable onPress={pickImage} className="mt-3">
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
