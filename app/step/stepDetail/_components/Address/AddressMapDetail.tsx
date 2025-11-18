import { Pressable } from "react-native";
import MapView, { Marker } from "react-native-maps";

import ModalCloseBtn from "@/src/components/ui/Modal/ModalCloseBtn";

interface AddressMapDetailProps {
  latitudeDelta: number;
  longitudeDelta: number;
  modalVisible: boolean;
  setModalVisible: (value: boolean) => void;
  pointerEvents?: "none";
}

export default function AddressMapDetail({
  latitudeDelta,
  longitudeDelta,
  modalVisible,
  setModalVisible,
  pointerEvents,
}: AddressMapDetailProps) {
  return (
    <>
      <MapView
        style={{ flex: 1, borderRadius: 8 }}
        initialRegion={{
          latitude: 37,
          longitude: 127,
          latitudeDelta: latitudeDelta,
          longitudeDelta: longitudeDelta,
        }}
        mapType={"standard"}
        pointerEvents={pointerEvents}
      >
        <Marker
          coordinate={{
            latitude: 37,
            longitude: 127,
          }}
        />
      </MapView>

      <Pressable
        onPress={() => setModalVisible(!modalVisible)}
        className={`absolute ${
          modalVisible ? "top-12 right-5" : "top-3 right-3"
        }`}
      >
        <ModalCloseBtn modalVisible={modalVisible} />
      </Pressable>
    </>
  );
}
