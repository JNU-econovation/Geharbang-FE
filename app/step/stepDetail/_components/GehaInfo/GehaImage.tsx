import { useState } from "react";
import { Image, View } from "react-native";
import Swiper from "react-native-swiper";

import TextSize from "@/src/components/ui/TextSize";

export default function GehaImage() {
  const [currentIdx, setCurrentIdx] = useState(1);
  const images = [
    require("@/public/images/test1.png"),
    require("@/public/images/test1.png"),
    require("@/public/images/test1.png"),
    require("@/public/images/test1.png"),
    require("@/public/images/test1.png"),
  ];

  return (
    <View className='w-full h-72'>
      <Swiper
        loop={false}
        onIndexChanged={(idx) => setCurrentIdx(idx + 1)}
        showsPagination={false}
      >
        {images.map((img, i) => (
          <Image
            key={i}
            source={img}
            className='w-full h-full'
            resizeMode='contain'
          />
        ))}
      </Swiper>

      <View className='absolute bottom-3 right-3'>
        <View className='rounded-2xl py-2 px-3 bg-black/70'>
          <TextSize
            color='#ffffff'
            size={12}
            content={`${currentIdx} / ${images.length} `}
          />
        </View>
      </View>
    </View>
  );
}
