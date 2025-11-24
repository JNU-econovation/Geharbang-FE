import { Image, Modal, Pressable, View } from "react-native";
import Swiper from "react-native-swiper";
import TextSize from "../TextSize";
import ModalCloseBtn from "./ModalCloseBtn";

interface ModalImageProps {
  modalVisible: boolean;
  modalIdx: number;
  images: any[];
  setModalIdx: (value: React.SetStateAction<number>) => void;
  setModalVisible: (value: React.SetStateAction<boolean>) => void;
}

export default function ModalImage({
  modalVisible,
  modalIdx,
  images,
  setModalIdx,
  setModalVisible,
}: ModalImageProps) {
  return (
    <Modal visible={modalVisible} animationType='slide'>
      <View className='absolute top-14 left-0 right-0 items-center z-10'>
        <TextSize
          color='#000000'
          size={17}
          content={`${modalIdx} / ${images.length} `}
        />
      </View>

      <Pressable
        onPress={() => setModalVisible(!modalVisible)}
        className='absolute top-12 right-5 z-10'
      >
        <ModalCloseBtn modalVisible={modalVisible} />
      </Pressable>

      <View className='flex-1 bg-[#ffffff]'>
        <Swiper
          loop={false}
          onIndexChanged={(idx) => setModalIdx(idx + 1)}
          showsPagination={false}
        >
          {images.map((img, i) => (
            <View key={i}>
              <Image
                source={img}
                className='w-full h-full'
                resizeMode='contain'
              />
            </View>
          ))}
        </Swiper>
      </View>
    </Modal>
  );
}
