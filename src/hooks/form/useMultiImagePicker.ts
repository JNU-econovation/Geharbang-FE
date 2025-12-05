import * as ImagePicker from "expo-image-picker";
import { File } from "../../types/File";

interface useMultiImagePickerProps {
  selectedImageFiles: File[];
  setSelectedImageFiles: React.Dispatch<React.SetStateAction<File[]>>;
  maxCount: number;
}

export const useMultiImagePicker = ({
  selectedImageFiles,
  setSelectedImageFiles,
  maxCount,
}: useMultiImagePickerProps) => {
  const [status, requestPermission] = ImagePicker.useMediaLibraryPermissions();

  const pickImages = async (): Promise<File[]> => {
    if (!status?.granted) {
      const permission = await requestPermission();
      if (!permission.granted) return [];
    }

    const remainCount = maxCount - selectedImageFiles.length;
    if (remainCount <= 0) return [];

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ["images"],
      allowsMultipleSelection: true,
      selectionLimit: remainCount,
      quality: 1,
    });

    if (result.canceled) {
      return [];
    } else {
      const newImageFiles: File[] = result.assets.map((asset) => ({
        uri: asset.uri,
        type: asset.mimeType || "image/jpeg",
        name: asset.fileName || "image",
      }));

      return newImageFiles;
    }
  };

  const updateImages = (newImageFiles: File[]) => {
    setSelectedImageFiles((prev) => [...prev, ...newImageFiles]);
  };

  const removeImage = (uri: string) => {
    setSelectedImageFiles((prev) => prev.filter((img) => img.uri !== uri));
  };

  return { pickImages, removeImage, updateImages };
};
