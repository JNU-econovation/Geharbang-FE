import {
  NaverMapMarkerOverlay,
  NaverMapView,
  NaverMapViewRef,
} from '@mj-studio/react-native-naver-map';
import { useCallback, useRef, useState } from 'react';
import { ActivityIndicator, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import GuestHouseBottomSheet from '@/src/components/map/GuestHouseBottomSheet';
import GuestHouseMarkerSvg from '@/src/components/map/GuestHouseMarkerSvg';
import MapSearchBar from '@/src/components/map/MapSearchBar';
import MapTypeToggle from '@/src/components/map/MapTypeToggle';
import RegionFilter from '@/src/components/map/RegionFilter';
import StepBottomSheet from '@/src/components/map/StepBottomSheet';
import StepMarkerSvg from '@/src/components/map/StepMarkerSvg';
import { useGuestHouseMap, useStepMap } from '@/src/hooks/map/useMapData';
import { GuestHouseMapItem, StepMapItem } from '@/src/types/models/map';

type MapType = 'step' | 'guesthouse';

const JEJU_CENTER = { latitude: 33.3617, longitude: 126.5292, zoom: 9 };

const REGION_CAMERAS: Record<string, { latitude: number; longitude: number; zoom: number }> = {
  제주시: { latitude: 33.4996, longitude: 126.5312, zoom: 12 },
  서귀포시: { latitude: 33.2541, longitude: 126.5600, zoom: 12 },
  서부권: { latitude: 33.4139, longitude: 126.2663, zoom: 11 },
  동부권: { latitude: 33.4440, longitude: 126.9229, zoom: 11 },
  중문_대정: { latitude: 33.2510, longitude: 126.4130, zoom: 11 },
};

const NORMAL_W = 36;
const NORMAL_H = 44;
const SELECTED_W = 46;
const SELECTED_H = 57;

export default function MapTabScreen() {
  const insets = useSafeAreaInsets();
  const mapRef = useRef<NaverMapViewRef>(null);

  const [mapType, setMapType] = useState<MapType>('guesthouse');
  const [selectedId, setSelectedId] = useState<number | null>(null);
  const [selectedRegion, setSelectedRegion] = useState<string | null>(null);

  const { data: stepData, isLoading: stepLoading } = useStepMap();
  const { data: guestHouseData, isLoading: guestHouseLoading } = useGuestHouseMap();

  const isLoading = mapType === 'step' ? stepLoading : guestHouseLoading;
  const activeData: (StepMapItem | GuestHouseMapItem)[] =
    mapType === 'step' ? (stepData ?? []) : (guestHouseData ?? []);

  const selectedStep =
    mapType === 'step' ? (stepData ?? []).find((s) => s.id === selectedId) ?? null : null;
  const selectedGuesthouse =
    mapType === 'guesthouse'
      ? (guestHouseData ?? []).find((g) => g.id === selectedId) ?? null
      : null;

  const visibleItems = selectedRegion
    ? activeData.filter((s) => s.region === selectedRegion)
    : activeData;

  const handleMarkerTap = useCallback((item: StepMapItem | GuestHouseMapItem) => {
    setSelectedId(item.id);
    mapRef.current?.animateCameraTo({
      latitude: item.coordinates[1],
      longitude: item.coordinates[0],
      zoom: 13,
      duration: 400,
    });
  }, []);

  const handleSearchSelect = useCallback((item: StepMapItem | GuestHouseMapItem) => {
    setSelectedId(item.id);
    setSelectedRegion(null);
    mapRef.current?.animateCameraTo({
      latitude: item.coordinates[1],
      longitude: item.coordinates[0],
      zoom: 13,
      duration: 400,
    });
  }, []);

  const handleRegionSelect = useCallback((region: string | null) => {
    setSelectedRegion(region);
    setSelectedId(null);
    if (region && REGION_CAMERAS[region]) {
      mapRef.current?.animateCameraTo({ ...REGION_CAMERAS[region], duration: 400 });
    } else {
      mapRef.current?.animateCameraTo({ ...JEJU_CENTER, duration: 400 });
    }
  }, []);

  const handleMapTap = useCallback(() => {
    setSelectedId(null);
  }, []);

  return (
    <View style={{ flex: 1 }}>
      <NaverMapView
        ref={mapRef}
        style={{ flex: 1 }}
        camera={JEJU_CENTER}
        onTapMap={handleMapTap}
      >
        {visibleItems.map((item) => {
          const isSelected = item.id === selectedId;
          const w = isSelected ? SELECTED_W : NORMAL_W;
          const h = isSelected ? SELECTED_H : NORMAL_H;
          return (
            <NaverMapMarkerOverlay
              key={`${mapType}-${item.id}`}
              latitude={item.coordinates[1]}
              longitude={item.coordinates[0]}
              width={w}
              height={h}
              anchor={{ x: 0.5, y: 1 }}
              onTap={() => handleMarkerTap(item)}
            >
              <View
                key={`${item.id}-${isSelected}`}
                collapsable={false}
                style={{ width: w, height: h }}
              >
                {mapType === 'step' ? (
                  <GuestHouseMarkerSvg isSelected={isSelected} width={w} height={h} />
                ) : (
                  <StepMarkerSvg isSelected={isSelected} width={w} height={h} />
                )}
              </View>
            </NaverMapMarkerOverlay>
          );
        })}
      </NaverMapView>

      {isLoading && (
        <View
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            justifyContent: 'center',
            alignItems: 'center',
          }}
          pointerEvents='none'
        >
          <ActivityIndicator size='large' />
        </View>
      )}

      {/* 상단 floating UI */}
      <View
        style={{
          position: 'absolute',
          top: insets.top + 8,
          left: 0,
          right: 0,
          zIndex: 10,
        }}
      >
        <MapSearchBar
          items={activeData}
          onSelect={handleSearchSelect}
          placeholder={mapType === 'step' ? '스텝 공고 검색' : '게스트하우스 검색'}
        />
        <View style={{ marginTop: 8 }}>
          <RegionFilter selectedRegion={selectedRegion} onSelect={handleRegionSelect} />
        </View>
      </View>

      {/* 우측 지도 타입 토글 */}
      <MapTypeToggle
        mapType={mapType}
        topOffset={insets.top + 120}
        onChange={(type) => {
          setMapType(type);
          setSelectedId(null);
          setSelectedRegion(null);
          mapRef.current?.animateCameraTo({ ...JEJU_CENTER, duration: 300 });
        }}
      />

      {/* 마커 선택 시 하단 시트 */}
      {selectedStep && <StepBottomSheet key={selectedStep.id} item={selectedStep} />}
      {selectedGuesthouse && <GuestHouseBottomSheet key={selectedGuesthouse.id} item={selectedGuesthouse} />}
    </View>
  );
}
