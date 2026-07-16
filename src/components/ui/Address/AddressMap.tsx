import { Ionicons } from "@expo/vector-icons";
import { NaverMapMarkerOverlay, NaverMapView } from "@mj-studio/react-native-naver-map";
import { useState } from "react";
import { Modal, Pressable, View } from "react-native";
import GuestHouseMarkerSvg from "@/src/components/map/GuestHouseMarkerSvg";
import StepMarkerSvg from "@/src/components/map/StepMarkerSvg";

const MARKER_W = 36;
const MARKER_H = 44;

interface AddressMapProps {
  coordinates?: number[];
  markerType?: 'guesthouse' | 'step';
}

export default function AddressMap({ coordinates, markerType }: AddressMapProps) {
  const [modalVisible, setModalVisible] = useState(false);

  // coordinates[0] = 경도, coordinates[1] = 위도
  const lng = coordinates?.[0] ?? 126.531;
  const lat = coordinates?.[1] ?? 33.499;

  const renderMarker = () => {
    if (markerType === 'guesthouse' || markerType === 'step') {
      return (
        <NaverMapMarkerOverlay
          latitude={lat}
          longitude={lng}
          width={MARKER_W}
          height={MARKER_H}
          anchor={{ x: 0.5, y: 1 }}
        >
          <View collapsable={false} style={{ width: MARKER_W, height: MARKER_H }}>
            {markerType === 'guesthouse' ? (
              <StepMarkerSvg isSelected={false} width={MARKER_W} height={MARKER_H} />
            ) : (
              <GuestHouseMarkerSvg isSelected={false} width={MARKER_W} height={MARKER_H} />
            )}
          </View>
        </NaverMapMarkerOverlay>
      );
    }
    return <NaverMapMarkerOverlay latitude={lat} longitude={lng} />;
  };

  return (
    <View className='h-64'>
      <NaverMapView
        style={{ flex: 1 }}
        camera={{ latitude: lat, longitude: lng, zoom: 15 }}
        onTapMap={() => setModalVisible(true)}
      >
        {renderMarker()}
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
            {renderMarker()}
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
