import { Ionicons } from "@expo/vector-icons";
import { NaverMapMarkerOverlay, NaverMapView } from "@mj-studio/react-native-naver-map";
import { useState } from "react";
import { Modal, Pressable, View } from "react-native";

interface AddressMapProps {
  coordinates?: number[];
}

export default function AddressMap({ coordinates }: AddressMapProps) {
  const [modalVisible, setModalVisible] = useState(false);

  // 한국 경도는 항상 90 초과 → coordinates[0] > 90 이면 [경도,위도], 아니면 [위도,경도]
  const isGeoJSON = (coordinates?.[0] ?? 0) > 90;
  const lat = isGeoJSON ? (coordinates?.[1] ?? 33.499) : (coordinates?.[0] ?? 33.499);
  const lng = isGeoJSON ? (coordinates?.[0] ?? 126.531) : (coordinates?.[1] ?? 126.531);

  return (
    <View className='h-64'>
      <NaverMapView
        style={{ flex: 1 }}
        camera={{ latitude: lat, longitude: lng, zoom: 15 }}
        onTapMap={() => setModalVisible(true)}
      >
        <NaverMapMarkerOverlay latitude={lat} longitude={lng} />
      </NaverMapView>

      <Pressable
        onPress={() => setModalVisible(true)}
        className='absolute top-3 right-3 h-10 w-10 bg-white rounded-full items-center justify-center'
      >
        <Ionicons name='expand-outline' size={22} />
      </Pressable>

      <Modal visible={modalVisible} animationType='slide'>
        <View style={{ flex: 1 }}>
          <NaverMapView
            style={{ flex: 1 }}
            camera={{ latitude: lat, longitude: lng, zoom: 15 }}
          >
            <NaverMapMarkerOverlay latitude={lat} longitude={lng} />
          </NaverMapView>

          <Pressable
            onPress={() => setModalVisible(false)}
            className='absolute top-14 right-5 h-10 w-10 bg-white rounded-full items-center justify-center mt-1'
          >
            <Ionicons name='close-outline' size={22} />
          </Pressable>
        </View>
      </Modal>
    </View>
  );
}
