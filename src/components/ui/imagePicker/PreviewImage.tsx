import { Ionicons } from "@expo/vector-icons";
import { Image, Pressable, View } from "react-native";

interface PreviewImageProps {
  imageUri: string;
  size: number;
  onRemoveImage: (uri: string) => void;
}

export default function PreviewImage({
  imageUri,
  size,
  onRemoveImage,
}: PreviewImageProps) {
  return (
    <View
      style={{ width: size, height: size }}
      className='rounded-xl overflow-hidden'
    >
      <Image
        source={{ uri: imageUri }}
        className='w-full h-full object-cover'
      />

      <Pressable
        onPress={() => onRemoveImage(imageUri)}
        className='absolute top-2 right-2 p-1 rounded-full bg-black/50'
      >
        <Ionicons name='close-outline' color='white' size={14} />
      </Pressable>
    </View>
  );
}
