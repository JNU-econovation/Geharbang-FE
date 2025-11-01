import * as ImagePicker from "expo-image-picker";

export function useImagePicker(
  setSelectedImageFile: (uri: string | null) => void
) {
  const [status, requestPermission] = ImagePicker.useMediaLibraryPermissions();

  const pickImage = async (): Promise<string | null> => {
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

    const uri = result.assets[0].uri;
    setSelectedImageFile(uri);
    return uri;
  };

  return { pickImage };
}
