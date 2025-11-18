import { Dimensions, FlatList, Image, Pressable, View } from "react-native";

import ModalImage from "@/src/components/ui/Modal/ModalImage";
import { useImageModal } from "@/src/hooks/stepDetail/useImageModal";

export default function IntroImgSlider() {
  const { modalVisible, setModalVisible, currentIdx, setCurrentIdx } =
    useImageModal();

  const images = [
    require("@/public/images/test1.png"),
    require("@/public/images/test1.png"),
    require("@/public/images/test1.png"),
    require("@/public/images/test1.png"),
    require("@/public/images/test1.png"),
  ];

  const PHONEWIDTH = Dimensions.get("window").width * 0.6;
  return (
    <View className='h-48'>
      <FlatList
        data={images}
        horizontal
        showsHorizontalScrollIndicator={false}
        decelerationRate='normal'
        contentContainerStyle={{ gap: 20 }}
        renderItem={({ item, index }) => (
          <Pressable
            key={index}
            style={{ width: PHONEWIDTH }}
            onPress={() => {
              setModalVisible(!modalVisible);
            }}
          >
            <Image
              source={item}
              className='w-full h-full rounded-3xl'
              resizeMode='cover'
            />
          </Pressable>
        )}
      />

      <ModalImage
        modalVisible={modalVisible}
        currentIdx={currentIdx}
        images={images}
        setModalVisible={setModalVisible}
        setCurrentIdx={setCurrentIdx}
      />
    </View>
  );
}
