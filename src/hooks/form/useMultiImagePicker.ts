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

  const pickImages = async (): Promise<void> => {
    if (!status?.granted) {
      const permission = await requestPermission();
      if (!permission.granted) return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ["images"],
      allowsMultipleSelection: true,
      selectionLimit: maxCount - selectedImageFiles.length,
      quality: 1,
    });

    if (!result.canceled) {
      const newImageFiles: File[] = result.assets.map((asset) => ({
        uri: asset.uri,
        type: asset.mimeType || "image/jpeg",
        name: asset.fileName || "image",
      }));

      setSelectedImageFiles((prev) => [...prev, ...newImageFiles]);
    }
  };

  const removeImage = (uri: string) => {
    setSelectedImageFiles((prev) => prev.filter((img) => img.uri !== uri));
  };

  return { pickImages, removeImage };
};
