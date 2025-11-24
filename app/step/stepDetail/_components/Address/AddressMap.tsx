import { useState } from "react";
import { Modal, View } from "react-native";

import AddressMapDetail from "./AddressMapDetail";

interface AddressMapProps {
  coordinates?: number[];
}

export default function AddressMap({ coordinates }: AddressMapProps) {
  const [modalVisible, setModalVisible] = useState(false);

  return (
    <View className='h-64'>
      <View className='relative h-full'>
        <AddressMapDetail
          latitude={coordinates?.[0] ?? 0}
          longitude={coordinates?.[1] ?? 0}
          latitudeDelta={0.0922}
          longitudeDelta={0.0421}
          modalVisible={false}
          setModalVisible={(v) => setModalVisible(v)}
          pointerEvents='none'
        />
      </View>

      <Modal visible={modalVisible} animationType='slide'>
        <AddressMapDetail
          latitude={coordinates?.[0] ?? 0}
          longitude={coordinates?.[1] ?? 0}
          latitudeDelta={0.01}
          longitudeDelta={0.01}
          modalVisible={true}
          setModalVisible={(v) => setModalVisible(v)}
        />
      </Modal>
    </View>
  );
}
