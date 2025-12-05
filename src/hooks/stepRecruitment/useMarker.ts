import { useCallback, useState } from "react";
import Geocoder from "react-native-geocoding";

import { SelectedAddressProps } from "@/src/types/models/stepRecruitment/StepRecruitmentData";

interface UseMarkerProps {
  latitude: number;
  longitude: number;
  selectable?: boolean;
  setSelectedAddress: (address: SelectedAddressProps) => void;
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

  const findAddressByType = (results: any[], targetTypes: string[]) => {
    const result = results.find((item) =>
      item.types.some((t: string) => targetTypes.includes(t))
    );
    return result ? result.formatted_address : "";
  };

  const selectAddress = useCallback(async () => {
    if (!selectable || !setSelectedAddress || !setModalVisible) return;

    try {
      const geo = await Geocoder.from(
        markerPosition.latitude,
        markerPosition.longitude
      );

      const results = geo.results;

      const roadAddress = findAddressByType(results, [
        "street_address",
        "route",
      ]);

      const jibunAddress = findAddressByType(results, [
        "premise",
        "sublocality",
        "political",
      ]);

      setSelectedAddress({
        roadAddress,
        jibunAddress,
        latitude: markerPosition.latitude,
        longitude: markerPosition.longitude,
      });

      setModalVisible(false);
    } catch (err) {
      console.error("Geocoding Error:", err);
    }
  }, [markerPosition, selectable, setSelectedAddress, setModalVisible]);

  return {
    markerPosition,
    setMarkerPosition,
    selectAddress,
  };
}
