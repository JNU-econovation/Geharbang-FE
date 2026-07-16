import {
  NaverMapMarkerOverlay,
  NaverMapView,
  NaverMapViewRef,
} from "@mj-studio/react-native-naver-map";
import { useCallback, useEffect, useRef, useState } from "react";
import {
  ActivityIndicator,
  FlatList,
  Keyboard,
  Pressable,
  TextInput,
  View,
} from "react-native";

import ModalBtn from "@/src/components/ui/Modal/ModalBtn";
import { useMarker } from "@/src/hooks/stepRecruitment/useMarker";
import { NaverAddressResult } from "@/src/services/map/naverMap";
import { SelectedAddressProps } from "@/src/types/models/stepRecruitment/Step1Data";
import TextSize from "./TextSize";

interface AddressMapDetailProps {
  latitude: number;
  longitude: number;
  initialZoom?: number;
  modalVisible: boolean;
  setModalVisible: (value: boolean) => void;
  setSelectedAddress?: (address: SelectedAddressProps) => void;
  selectable?: boolean;
}

export default function AddressMapDetail({
  latitude,
  longitude,
  initialZoom = 13,
  modalVisible,
  setModalVisible,
  setSelectedAddress,
  selectable,
}: AddressMapDetailProps) {
  const mapRef = useRef<NaverMapViewRef>(null);

  const {
    markerPosition,
    hasMarker,
    setMarkerPosition,
    searchResults,
    isSearching,
    searchLocation,
    selectSearchResult,
    selectAddress,
    clearSearchResults,
  } = useMarker({
    latitude,
    longitude,
    selectable,
    setSelectedAddress,
    setModalVisible,
  });

  const [searchKeyword, setSearchKeyword] = useState("");
  const [hasSearched, setHasSearched] = useState(false);
  const debounceTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const justSelected = useRef(false);

  const handleSearch = useCallback(
    (keyword: string) => {
      if (debounceTimer.current) clearTimeout(debounceTimer.current);
      if (!keyword.trim()) return;
      setHasSearched(true);
      searchLocation(keyword);
    },
    [searchLocation],
  );

  useEffect(() => {
    if (searchKeyword.length < 2) {
      clearSearchResults();
      setHasSearched(false);
      return;
    }
    if (justSelected.current) {
      justSelected.current = false;
      return;
    }
    if (debounceTimer.current) clearTimeout(debounceTimer.current);
    debounceTimer.current = setTimeout(() => {
      setHasSearched(true);
      searchLocation(searchKeyword);
    }, 400);
    return () => {
      if (debounceTimer.current) clearTimeout(debounceTimer.current);
    };
  }, [searchKeyword, searchLocation, clearSearchResults]);

  const handleTapMap = useCallback(
    (event: { latitude: number; longitude: number }) => {
      if (!selectable) return;
      setMarkerPosition(event);
      clearSearchResults();
      Keyboard.dismiss();
    },
    [selectable, setMarkerPosition, clearSearchResults],
  );

  const handleSelectResult = useCallback(
    (result: NaverAddressResult) => {
      justSelected.current = true;
      selectSearchResult(result);
      setSearchKeyword(result.roadAddress || result.jibunAddress);
      setHasSearched(false);
      Keyboard.dismiss();
      mapRef.current?.animateCameraTo({
        latitude: result.latitude,
        longitude: result.longitude,
        zoom: 15,
        duration: 400,
      });
    },
    [selectSearchResult],
  );

  return (
    <View style={{ flex: 1 }}>
      <NaverMapView
        ref={mapRef}
        style={{ flex: 1 }}
        camera={{ latitude, longitude, zoom: initialZoom }}
        onTapMap={selectable ? handleTapMap : undefined}
      >
        {hasMarker && (
          <NaverMapMarkerOverlay
            latitude={markerPosition.latitude}
            longitude={markerPosition.longitude}
          />
        )}
      </NaverMapView>

      {selectable && (
        <View className='absolute top-16 left-5 right-20'>
          <View className='flex-row items-center bg-white border border-gray-200 rounded-lg h-12 px-3'>
            <TextInput
              placeholder='게스트하우스 이름, 주소 검색'
              value={searchKeyword}
              onChangeText={setSearchKeyword}
              onSubmitEditing={() => handleSearch(searchKeyword)}
              className='flex-1 text-[15px]'
              returnKeyType='search'
            />
            {isSearching ? (
              <ActivityIndicator size='small' color='#6B7280' className='pl-2' />
            ) : null}
          </View>

          {searchResults.length > 0 && (
            <FlatList
              data={searchResults}
              keyExtractor={(item, index) => `${item.longitude}-${item.latitude}-${index}`}
              keyboardShouldPersistTaps='handled'
              style={{
                backgroundColor: "white",
                borderRadius: 8,
                marginTop: 4,
                maxHeight: 220,
                shadowColor: "#000",
                shadowOffset: { width: 0, height: 2 },
                shadowOpacity: 0.1,
                shadowRadius: 4,
                elevation: 4,
              }}
              renderItem={({ item, index }) => (
                <Pressable
                  onPress={() => handleSelectResult(item)}
                  style={{
                    padding: 12,
                    borderBottomWidth: index < searchResults.length - 1 ? 1 : 0,
                    borderBottomColor: "#F3F4F6",
                  }}
                >
                  <TextSize
                    content={item.roadAddress || item.jibunAddress}
                    size={14}
                    color='#101828'
                  />
                  {item.roadAddress && item.jibunAddress ? (
                    <View className='mt-1'>
                      <TextSize content={item.jibunAddress} size={12} color='#6B7280' />
                    </View>
                  ) : null}
                </Pressable>
              )}
            />
          )}

          {hasSearched && !isSearching && searchResults.length === 0 && (
            <View
              style={{
                backgroundColor: "white",
                borderRadius: 8,
                marginTop: 4,
                padding: 12,
              }}
            >
              <TextSize content='검색 결과가 없습니다' size={14} color='#6B7280' />
            </View>
          )}
        </View>
      )}

      <ModalBtn modalVisible={modalVisible} onPress={() => setModalVisible(false)} />

      {selectable && (
        <ModalBtn modalVisible={modalVisible} onPress={selectAddress} selectable={true} />
      )}
    </View>
  );
}
