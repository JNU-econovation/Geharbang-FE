import { useCallback, useState } from "react";
import Geocoder from "react-native-geocoding";

interface UseMarkerProps {
  latitude: number;
  longitude: number;
  selectable?: boolean;
  setSelectedAddress?: (address: string) => void;
  setModalVisible?: (value: boolean) => void;
}

export function useMarker({
  latitude,
  longitude,
  selectable = true,
  setSelectedAddress,
  setModalVisible,
}: UseMarkerProps) {
  const [markerPosition, setMarkerPosition] = useState({ latitude, longitude });

  const selectAddress = useCallback(async () => {
    if (!selectable || !setSelectedAddress || !setModalVisible) return;

    try {
      const geo = await Geocoder.from(
        markerPosition.latitude,
        markerPosition.longitude
      );
      const address = geo.results[0].formatted_address;
      setSelectedAddress(address);
      setModalVisible(false);
    } catch (err) {
      console.error(err);
    }
  }, [markerPosition, selectable, setSelectedAddress, setModalVisible]);

  return {
    markerPosition,
    setMarkerPosition,
    selectAddress,
  };
}
