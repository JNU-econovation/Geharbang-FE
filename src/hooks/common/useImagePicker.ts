import * as ImagePicker from "expo-image-picker";
import { File } from "../../types/File";

export function useImagePicker(setSelectedImageFile: (file: File) => void) {
  const [status, requestPermission] = ImagePicker.useMediaLibraryPermissions();

  const pickImage = async (): Promise<File | null> => {
    if (!status?.granted) {
      const permission = await requestPermission();
      if (!permission.granted) return null;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ["images"],
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });

    if (result.canceled) return null;

    const imageFile = {
      uri: result.assets[0].uri,
      type: result.assets[0].mimeType || "image/jpeg",
      name: result.assets[0].fileName || "image",
    };

    setSelectedImageFile(imageFile);

    return imageFile;
  };

  return { pickImage };
}
