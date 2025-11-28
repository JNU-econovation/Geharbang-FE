import { Image, Pressable, View } from "react-native";
import Swiper from "react-native-swiper";

import ModalImage from "@/src/components/ui/Modal/ModalImage";
import TextSize from "@/src/components/ui/TextSize";
import { useImageModal } from "@/src/hooks/stepDetail/useImageModal";

interface GehaImageProps {
  images?: string[];
}

export default function GehaImage({ images }: GehaImageProps) {
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

  return (
    <View className='w-full h-72'>
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
              source={{ uri: `${process.env.EXPO_PUBLIC_BASE_URL}${img}` }}
              className='w-full h-full'
              resizeMode='contain'
            />
          </Pressable>
        ))}
      </Swiper>

      <View className='absolute bottom-3 right-3'>
        <View className='rounded-2xl py-2 px-3 bg-black/70'>
          <TextSize
            color='#ffffff'
            size={12}
            content={`${imageIdx + 1} / ${images?.length} `}
          />
        </View>
      </View>

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
