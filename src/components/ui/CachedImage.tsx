import { Image, ImageContentFit, ImageProps } from "expo-image";
import { cssInterop } from "nativewind";
import { StyleProp, ImageStyle, StyleSheet } from "react-native";

cssInterop(Image, { className: "style" });

interface CachedImageProps extends Omit<ImageProps, "source"> {
  uri: string;
  style?: StyleProp<ImageStyle>;
  className?: string;
  contentFit?: ImageContentFit;
}

export default function CachedImage({
  uri,
  style,
  className,
  contentFit = "cover",
  ...props
}: CachedImageProps) {
  return (
    <Image
      source={{ uri }}
      style={[styles.placeholder, style]}
      className={className}
      contentFit={contentFit}
      cachePolicy="memory-disk"
      transition={200}
      {...props}
    />
  );
}

const styles = StyleSheet.create({
  placeholder: {
    backgroundColor: "#E5E7EB",
  },
});
