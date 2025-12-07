import Constants from "expo-constants";
import { useState } from "react";
import { TextInput, View } from "react-native";
import Geocoder from "react-native-geocoding";
import MapView, { Marker } from "react-native-maps";

import ModalBtn from "@/src/components/ui/Modal/ModalBtn";
import { useMarker } from "@/src/hooks/stepRecruitment/useMarker";
import { SelectedAddressProps } from "@/src/types/models/stepRecruitment/Step1Data";

const GOOGLE_MAPS_API_KEY = Constants.expoConfig?.extra?.googleMapsApiKey;
Geocoder.init(GOOGLE_MAPS_API_KEY);

interface AddressMapDetailProps {
  latitude: number;
  longitude: number;
  latitudeDelta: number;
  longitudeDelta: number;
  modalVisible: boolean;
  setModalVisible: (value: boolean) => void;
  setSelectedAddress?: (address: SelectedAddressProps) => void;
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
  const { markerPosition, setMarkerPosition, selectAddress, searchLocation } =
    useMarker({
      latitude,
      longitude,
      selectable,
      setSelectedAddress,
      setModalVisible,
    });

  const [searchKeyword, setSearchKeyword] = useState("");

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

      {selectable && (
        <View className='w-9/12 absolute top-12 left-5'>
          <TextInput
            placeholder='주소 검색'
            value={searchKeyword}
            onChangeText={setSearchKeyword}
            onSubmitEditing={() => searchLocation(searchKeyword)}
            className='
      bg-white
      h-12
      px-4
      rounded-lg
      border
      border-gray-200
      text-[15px]'
          />
        </View>
      )}

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
