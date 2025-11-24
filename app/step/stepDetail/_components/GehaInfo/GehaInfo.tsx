import { View } from "react-native";

import TextSize from "@/src/components/ui/TextSize";

import GehaLocation from "@/public/svgs/StepDetail/gehaLocation.svg";
import GehaName from "@/public/svgs/StepDetail/gehaName.svg";

import GehaDetailInfo from "./GehaDetailInfo";

export default function GehaInfo() {
  return (
    <>
      <TextSize
        size={20}
        color='#101828'
        content='제주 바다뷰 게스트하우스 직원'
      />

      <View className='pt-8' />

      <GehaDetailInfo
        icon={<GehaName width={14} height={14} />}
        content='제주 오션뷰 게스트하우스'
      />
      <View className='pt-2' />

      <GehaDetailInfo
        icon={<GehaLocation width={14} height={14} />}
        content='제주시 애월읍'
      />
    </>
  );
}
