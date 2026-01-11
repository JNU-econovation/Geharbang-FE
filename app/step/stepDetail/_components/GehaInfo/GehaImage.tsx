import { Image, Pressable, View } from "react-native";
import Swiper from "react-native-swiper";

import Bed from "@/public/svgs/GuestHouse/bed.svg";
import ModalImage from "@/src/components/ui/Modal/ModalImage";
import TextSize from "@/src/components/ui/TextSize";
import { useImageModal } from "@/src/hooks/stepDetail/useImageModal";

interface GehaImageProps {
  images?: string[];
  height?: number;
  page?: boolean;
  type?: boolean;
  party?: boolean;
  headCountType?: string;
}

export default function GehaImage({
  images,
  height,
  page,
  type,
  party,
  headCountType,
}: GehaImageProps) {
  const {
    modalVisible,
    imageIdx,
    modalIdx,
    setModalVisible,
    setImageIdx,
    setModalIdx,
  } = useImageModal();

  if (!images || images.length === 0) {
    return;
  }

  const resolveImageUri = (uri: string) => {
    if (uri.startsWith("https")) return uri;
    return `${process.env.EXPO_PUBLIC_BASE_URL}${uri}`;
  };

  if (headCountType === "_1인실") {
    headCountType = "1인실";
  } else if (headCountType === "_2인실") {
    headCountType = "2인실";
  } else if (headCountType === "_3인이상") {
    headCountType = "3인이상";
  }

  return (
    <View className='w-full' style={{ height }}>
      {type && (
        <View className='absolute top-3 right-3 z-10'>
          <View className='rounded-xl py-2 px-3 bg-black/70 flex-row gap-1'>
            <Bed width={16} height={16} />
            <TextSize color='#ffffff' size={14} content={headCountType} />
          </View>
        </View>
      )}

      <Swiper
        loop={false}
        onIndexChanged={(idx) => setImageIdx(idx)}
        showsPagination={false}
      >
        {images?.map((img, index) => (
          <Pressable
            key={index}
            onPress={() => {
              setModalVisible(true);
              setImageIdx(index);
            }}
          >
            <Image
              source={{ uri: resolveImageUri(img) }}
              className={`w-full h-full ${(party || type) && "rounded-t-lg"}`}
              resizeMode='cover'
            />
          </Pressable>
        ))}
      </Swiper>

      {page && (
        <View className='absolute bottom-3 right-3'>
          <View className='rounded-2xl py-2 px-3 bg-black/70'>
            <TextSize
              color='#ffffff'
              size={12}
              content={`${imageIdx + 1} / ${images?.length} `}
            />
          </View>
        </View>
      )}

      <ModalImage
        modalVisible={modalVisible}
        modalIdx={modalIdx}
        images={images}
        setModalIdx={setModalIdx}
        setModalVisible={setModalVisible}
      />
    </View>
  );
}
