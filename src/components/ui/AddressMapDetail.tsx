import Constants from "expo-constants";
import Geocoder from "react-native-geocoding";
import MapView, { Marker } from "react-native-maps";

import ModalBtn from "@/src/components/ui/Modal/ModalBtn";
import { useMarker } from "@/src/hooks/stepPost/useMarker";
import { SelectedAddressProps } from "@/src/types/models/application/StepPostData";

const GOOGLE_MAPS_API_KEY = Constants.expoConfig?.extra?.googleMapsApiKey;
Geocoder.init(GOOGLE_MAPS_API_KEY);

interface AddressMapDetailProps {
  latitude: number;
  longitude: number;
  latitudeDelta: number;
  longitudeDelta: number;
  modalVisible: boolean;
  setModalVisible: (value: boolean) => void;
  setSelectedAddress: (address: SelectedAddressProps) => void;
  selectable?: boolean;
  pointerEvents?: "none";
}

export default function AddressMapDetail({
  latitude,
  longitude,
  latitudeDelta,
  longitudeDelta,
  modalVisible,
  setModalVisible,
  setSelectedAddress,
  selectable,
  pointerEvents,
}: AddressMapDetailProps) {
  const { markerPosition, setMarkerPosition, selectAddress } = useMarker({
    latitude,
    longitude,
    selectable,
    setSelectedAddress,
    setModalVisible,
  });

  return (
    <>
      <MapView
        style={{ flex: 1, borderRadius: 8 }}
        region={{
          latitude: markerPosition.latitude,
          longitude: markerPosition.longitude,
          latitudeDelta,
          longitudeDelta,
        }}
        mapType='standard'
        onPress={(e) =>
          selectable && setMarkerPosition(e.nativeEvent.coordinate)
        }
        pointerEvents={pointerEvents}
      >
        <Marker coordinate={markerPosition} draggable={selectable} />
      </MapView>

      <ModalBtn
        modalVisible={modalVisible}
        onPress={() => setModalVisible(false)}
      />

      {selectable && (
        <ModalBtn
          modalVisible={modalVisible}
          onPress={selectAddress}
          selectable={true}
        />
      )}
    </>
  );
}
