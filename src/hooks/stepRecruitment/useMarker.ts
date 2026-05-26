import { useCallback, useState } from "react";

import {
  geocodeAddress,
  localSearch,
  NaverAddressResult,
  reverseGeocode,
} from "@/src/services/map/naverMap";
import { SelectedAddressProps } from "@/src/types/models/stepRecruitment/Step1Data";

interface UseMarkerProps {
  latitude: number;
  longitude: number;
  selectable?: boolean;
  setSelectedAddress?: (address: SelectedAddressProps) => void;
  setModalVisible?: (value: boolean) => void;
}

export function useMarker({
  latitude,
  longitude,
  selectable = true,
  setSelectedAddress,
  setModalVisible,
}: UseMarkerProps) {
  const [markerPosition, setMarkerPositionState] = useState({ latitude, longitude });
  const [hasMarker, setHasMarker] = useState(false);
  const [searchResults, setSearchResults] = useState<NaverAddressResult[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  const [selectedNaverAddress, setSelectedNaverAddress] =
    useState<NaverAddressResult | null>(null);

  const setMarkerPosition = useCallback((pos: { latitude: number; longitude: number }) => {
    setMarkerPositionState(pos);
    setHasMarker(true);
    setSelectedNaverAddress(null);
  }, []);

  const clearSearchResults = useCallback(() => {
    setSearchResults([]);
  }, []);

  const searchLocation = useCallback(async (keyword: string) => {
    if (!keyword.trim()) return;

    setIsSearching(true);
    try {
      const [geocodeResults, placeResults] = await Promise.all([
        geocodeAddress(keyword),
        localSearch(keyword),
      ]);
      const merged = [
        ...placeResults,
        ...geocodeResults.filter(
          (g) => !placeResults.some((p) => p.roadAddress && p.roadAddress === g.roadAddress),
        ),
      ];
      setSearchResults(merged);
    } finally {
      setIsSearching(false);
    }
  }, []);

  const selectSearchResult = useCallback((result: NaverAddressResult) => {
    setMarkerPositionState({ latitude: result.latitude, longitude: result.longitude });
    setHasMarker(true);
    setSelectedNaverAddress(result);
    setSearchResults([]);
  }, []);

  const selectAddress = useCallback(async () => {
    if (!selectable || !setSelectedAddress || !setModalVisible) return;

    try {
      if (selectedNaverAddress) {
        setSelectedAddress({
          roadAddress: selectedNaverAddress.roadAddress,
          jibunAddress: selectedNaverAddress.jibunAddress,
          latitude: selectedNaverAddress.latitude,
          longitude: selectedNaverAddress.longitude,
        });
      } else {
        const result = await reverseGeocode(
          markerPosition.latitude,
          markerPosition.longitude,
        );
        setSelectedAddress({
          roadAddress: result.roadAddress,
          jibunAddress: result.jibunAddress,
          latitude: markerPosition.latitude,
          longitude: markerPosition.longitude,
        });
      }
    } catch (e) {
      console.error("주소 선택 오류", e);
      setSelectedAddress({
        roadAddress: "",
        jibunAddress: "",
        latitude: markerPosition.latitude,
        longitude: markerPosition.longitude,
      });
    } finally {
      setModalVisible(false);
    }
  }, [markerPosition, selectable, setSelectedAddress, setModalVisible, selectedNaverAddress]);

  return {
    markerPosition,
    hasMarker,
    setMarkerPosition,
    searchResults,
    isSearching,
    searchLocation,
    selectSearchResult,
    selectAddress,
    clearSearchResults,
  };
}
