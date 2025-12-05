import React from "react";
import { ScrollView, useWindowDimensions } from "react-native";

import { useMultiImagePicker } from "@/src/hooks/form/useMultiImagePicker";
import { File } from "@/src/types/File";
import AddImageButton from "./AddImageButton";
import PreviewImage from "./PreviewImage";

interface MultiImagePickerProps {
  selectedImageFiles: File[];
  setSelectedImageFiles: React.Dispatch<React.SetStateAction<File[]>>;
  maxCount: number;
  error: boolean;
  clearError: () => void;
}

export default function MultiImagePicker({
  selectedImageFiles,
  setSelectedImageFiles,
  maxCount,
  error,
  clearError,
}: MultiImagePickerProps) {
  const { width } = useWindowDimensions();
  const IMAGE_SIZE = width * 0.3;

  const currentCount = selectedImageFiles.length;
  const showAddButton = currentCount < maxCount;

  const { pickImages, removeImage } = useMultiImagePicker({
    selectedImageFiles,
    setSelectedImageFiles,
    maxCount,
  });

  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      contentContainerClassName='gap-1.5'
    >
      {showAddButton && (
        <AddImageButton
          onAdd={() => {
            pickImages();
            clearError();
          }}
          currentImages={currentCount}
          maxImages={maxCount}
          error={error}
          size={IMAGE_SIZE}
        />
      )}
      {selectedImageFiles.map((image, index) => (
        <PreviewImage
          key={index}
          imageUri={image.uri}
          size={IMAGE_SIZE}
          onRemoveImage={removeImage}
        />
      ))}
    </ScrollView>
  );
}
