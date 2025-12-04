import { useState } from "react";
import { Modal, Pressable } from "react-native";

import AddressMapDetail from "@/src/components/ui/AddressMapDetail";
import FormField from "@/src/components/ui/Form/FormField";
import TextSize from "@/src/components/ui/TextSize";
import ViewContext from "@/src/components/ui/ViewContext/ViewContext";

interface GuestHouseLocationProps {
  selectedAddress: string;
  setSelectedAddress: (address: string) => void;
  errorMsg?: string;
  error?: boolean;
}

export default function GuestHouseLocation({
  selectedAddress,
  setSelectedAddress,
  errorMsg,
  error,
}: GuestHouseLocationProps) {
  const [modalVisible, setModalVisible] = useState(false);

  return (
    <FormField label='위치' required={true} errorMessage={errorMsg}>
      <Pressable onPress={() => setModalVisible(true)}>
        <ViewContext
          variant='modalApply'
          minHeight={45}
          className='p-3 flex justify-center'
          error={error}
        >
          <TextSize
            size={16}
            color={selectedAddress ? "#101828" : "#ADAEBC"}
            content={selectedAddress || "근무 위치를 검색하세요"}
          />
        </ViewContext>
      </Pressable>

      <Modal visible={modalVisible} animationType='slide'>
        <AddressMapDetail
          latitude={33.499}
          longitude={126.531}
          latitudeDelta={0.01}
          longitudeDelta={0.01}
          modalVisible={true}
          setModalVisible={(v) => setModalVisible(v)}
          setSelectedAddress={(address) => setSelectedAddress(address)}
          selectable={true}
        />
      </Modal>
    </FormField>
  );
}
