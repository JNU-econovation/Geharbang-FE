import { Pressable, View } from "react-native";

import { SelectedAddressProps } from "@/src/types/models/stepRecruitment/Step1Data";
import TextSize from "./TextSize";

interface AddressMapDetailProps {
  latitude: number;
  longitude: number;
  initialZoom?: number;
  modalVisible: boolean;
  setModalVisible: (value: boolean) => void;
  setSelectedAddress?: (address: SelectedAddressProps) => void;
  selectable?: boolean;
}

export default function AddressMapDetail({
  latitude,
  longitude,
  setModalVisible,
  selectable,
}: AddressMapDetailProps) {
  return (
    <View className='flex-1 items-center justify-center rounded-lg bg-[#F3F4F6] px-6'>
      <View className='items-center gap-3'>
        <TextSize
          size={16}
          color='#101828'
          content='웹에서는 지도를 표시할 수 없어요'
        />
        <TextSize
          size={14}
          color='#6B7280'
          content={`좌표: ${latitude.toFixed(4)}, ${longitude.toFixed(4)}`}
        />
        {selectable && (
          <TextSize
            size={14}
            color='#6B7280'
            content='모바일 앱에서 위치 검색과 선택을 사용할 수 있어요.'
          />
        )}
        <Pressable
          onPress={() => setModalVisible(false)}
          className='mt-2 rounded-lg bg-white px-4 py-2'
        >
          <TextSize size={14} color='#101828' content='닫기' />
        </Pressable>
      </View>
    </View>
  );
}
