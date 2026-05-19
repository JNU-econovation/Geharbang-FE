import { Modal, View } from "react-native";
import CachedImage from "@/src/components/ui/CachedImage";
import Swiper from "react-native-swiper";
import { buildAssetUrl } from "@/src/config/url";

import TextSize from "../TextSize";
import ModalBtn from "./ModalBtn";

interface ModalImageProps {
  modalVisible: boolean;
  modalIdx: number;
  images?: string[];
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
      <View className='absolute top-16 left-0 right-0 items-center z-10'>
        <TextSize
          color='#000000'
          size={17}
          content={`${modalIdx + 1} / ${images?.length} `}
        />
      </View>

      <View className='z-10'>
        <ModalBtn
          modalVisible={modalVisible}
          onPress={() => setModalVisible(false)}
        />
      </View>

      <View className='flex-1 bg-[#ffffff]'>
        <Swiper
          loop={false}
          index={modalIdx}
          onIndexChanged={(idx) => setModalIdx(idx)}
          showsPagination={false}
        >
          {images?.map((img, i) => {
            const imageUri = buildAssetUrl(img);

            return (
              <View key={i}>
                {imageUri ? (
                  <CachedImage uri={imageUri} className='w-full h-full' contentFit='contain' />
                ) : (
                  <View className='w-full h-full bg-[#F3F4F6]' />
                )}
              </View>
            );
          })}
        </Swiper>
      </View>
    </Modal>
  );
}
