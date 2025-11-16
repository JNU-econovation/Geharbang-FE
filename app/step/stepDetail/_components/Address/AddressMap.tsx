import { useState } from "react";
import { Modal, View } from "react-native";
import AddressMapDetail from "./AddressMapDetail";

export default function AddressMap() {
  const [modalVisible, setModalVisible] = useState(false);

  return (
    <View className='h-64'>
      <View className='relative h-full'>
        <AddressMapDetail
          latitudeDelta={0.0922}
          longitudeDelta={0.0421}
          modalVisible={false}
          setModalVisible={(v) => setModalVisible(v)}
          pointerEvents='none'
        />
      </View>

      <Modal visible={modalVisible} animationType='slide'>
        <AddressMapDetail
          latitudeDelta={0.01}
          longitudeDelta={0.01}
          modalVisible={true}
          setModalVisible={(v) => setModalVisible(v)}
        />
      </Modal>
    </View>
  );
}
