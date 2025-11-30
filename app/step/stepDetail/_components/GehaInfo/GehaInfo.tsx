import { View } from "react-native";

import TextSize from "@/src/components/ui/TextSize";

import GehaLocation from "@/public/svgs/StepDetail/gehaLocation.svg";
import GehaName from "@/public/svgs/StepDetail/gehaName.svg";

import GehaDetailInfo from "./GehaDetailInfo";

interface GehaInfpProps {
  title?: string;
  guesthouseName?: string;
  region?: string;
}

export default function GehaInfo({
  title,
  guesthouseName,
  region,
}: GehaInfpProps) {
  return (
    <>
      <TextSize size={20} color='#101828' content={title} />

      <View className='pt-8' />

      <GehaDetailInfo
        icon={<GehaName width={14} height={14} />}
        content={guesthouseName}
      />
      <View className='pt-2' />

      <GehaDetailInfo
        icon={<GehaLocation width={14} height={14} />}
        content={region}
      />
    </>
  );
}
