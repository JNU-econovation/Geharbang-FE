import { View } from "react-native";

import TextSize from "@/src/components/ui/TextSize";
import { formatRegionLabel } from "@/src/utils/region";

import GehaLocation from "@/public/svgs/StepDetail/gehaLocation.svg";
import GehaName from "@/public/svgs/StepDetail/gehaName.svg";

import GehaDetailInfo from "./GehaDetailInfo";

interface GehaInfpProps {
  title?: string;
  guestHouseName?: string;
  region?: string;
}

export default function GehaInfo({
  title,
  guestHouseName,
  region,
}: GehaInfpProps) {
  return (
    <View className='gap-2'>
      <TextSize size={20} color='#101828' content={title} />

      {guestHouseName && (
        <GehaDetailInfo
          icon={<GehaName width={14} height={14} />}
          content={guestHouseName}
        />
      )}

      <GehaDetailInfo
        icon={<GehaLocation width={14} height={14} />}
        content={formatRegionLabel(region)}
      />
    </View>
  );
}
