import { Pressable, View } from "react-native";
import CachedImage from "@/src/components/ui/CachedImage";
import Swiper from "react-native-swiper";

import Bed from "@/public/svgs/GuestHouse/bed.svg";
import ModalImage from "@/src/components/ui/Modal/ModalImage";
import TextSize from "@/src/components/ui/TextSize";
import { useImageModal } from "@/src/hooks/stepDetail/useImageModal";
import { buildAssetUrl } from "@/src/config/url";

interface GehaImageProps {
  images?: string[];
  height?: number;
  page?: boolean;
  type?: boolean;
  party?: boolean;
  headCount?: number;
}

export default function GehaImage({
  images,
  height,
  page,
  type,
  party,
  headCount,
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

  return (
    <View className='w-full' style={{ height }}>
      {type && (
        <View className='absolute top-3 right-3 z-10'>
          <View className='rounded-xl py-2 px-3 bg-black/70 flex-row gap-1'>
            <Bed width={16} height={16} />
            <TextSize color='#ffffff' size={14} content={`${headCount || 1}인`} />
          </View>
        </View>
      )}

      <Swiper
        loop={false}
        onIndexChanged={(idx) => setImageIdx(idx)}
        showsPagination={false}
      >
        {images?.map((img, index) => {
          const imageUri = buildAssetUrl(img);
          return (
            <Pressable
              key={index}
              onPress={() => {
                setModalVisible(true);
                setImageIdx(index);
              }}
            >
              {imageUri ? (
                <CachedImage
                  uri={imageUri}
                  className={`w-full h-full ${(party || type) && "rounded-t-lg"}`}
                />
              ) : (
                <View
                  className={`w-full h-full bg-gray-100 ${(party || type) && "rounded-t-lg"}`}
                />
              )}
            </Pressable>
          );
        })}
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
