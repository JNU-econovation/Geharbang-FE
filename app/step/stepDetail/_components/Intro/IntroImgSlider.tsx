import { Dimensions, FlatList, Image, View } from "react-native";

export default function IntroImgSlider() {
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
          <View style={{ width: PHONEWIDTH }} key={index}>
            <Image
              source={item}
              className='w-full h-full rounded-3xl'
              resizeMode='cover'
            />
          </View>
        )}
      />
    </View>
  );
}
