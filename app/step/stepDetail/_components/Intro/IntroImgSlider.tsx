import { Dimensions, FlatList, Image, Pressable, View } from "react-native";

import ModalImage from "@/src/components/ui/Modal/ModalImage";
import { useImageModal } from "@/src/hooks/stepDetail/useImageModal";

interface IntroImgSliderProps {
  images?: string[];
}

export default function IntroImgSlider({ images }: IntroImgSliderProps) {
  const { modalVisible, setModalVisible, modalIdx, setModalIdx } =
    useImageModal();

  const PHONEWIDTH = Dimensions.get("window").width * 0.6;

  return (
    <View className='h-48'>
      <FlatList
        data={images}
        keyExtractor={(index) => index.toString()}
        horizontal
        showsHorizontalScrollIndicator={false}
        decelerationRate='normal'
        contentContainerStyle={{ gap: 20 }}
        renderItem={({ item, index }) => (
          <Pressable
            style={{ width: PHONEWIDTH }}
            onPress={() => {
              setModalVisible(true);
              setModalIdx(index);
            }}
          >
            <Image
              source={{ uri: `${process.env.EXPO_PUBLIC_BASE_URL}${item}` }}
              className='w-full h-full rounded-3xl'
              resizeMode='cover'
            />
          </Pressable>
        )}
      />

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
