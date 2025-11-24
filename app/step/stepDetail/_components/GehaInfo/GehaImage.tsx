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

  return (
    <View className='w-full h-72'>
      <Swiper
        loop={false}
        onIndexChanged={(idx) => setImageIdx(idx + 1)}
        showsPagination={false}
      >
        {images?.map((img, i) => (
          <Pressable key={i} onPress={() => setModalVisible(!modalVisible)}>
            <Image
              source={{ uri: img }}
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
            content={`${imageIdx} / ${images?.length} `}
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
