import { Pressable, ScrollView, Text } from 'react-native';
import { REGION_OPTIONS } from '@/src/utils/constants/filterOptions';
import { COLORS } from '@/src/utils/constants/colors';

interface RegionFilterProps {
  selectedRegion: string | null;
  onSelect: (region: string | null) => void;
}

const MAP_REGIONS = REGION_OPTIONS;

export default function RegionFilter({ selectedRegion, onSelect }: RegionFilterProps) {
  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={{ paddingHorizontal: 16, gap: 8 }}
      style={{ marginTop: 8 }}
    >
      {MAP_REGIONS.map((region) => {
        const isSelected = selectedRegion === region.value;
        return (
          <Pressable
            key={region.value}
            onPress={() => onSelect(isSelected ? null : region.value)}
            style={{
              paddingHorizontal: 14,
              paddingVertical: 7,
              borderRadius: 10,
              backgroundColor: isSelected ? COLORS.PRIMARY.BLUE : 'white',
              borderWidth: 1,
              borderColor: isSelected ? COLORS.PRIMARY.BLUE : COLORS.GRAY.BORDER,
            }}
          >
            <Text
              style={{
                fontSize: 13,
                fontWeight: '500',
                color: isSelected ? 'white' : COLORS.GRAY.TEXT,
              }}
            >
              {region.label}
            </Text>
          </Pressable>
        );
      })}
    </ScrollView>
  );
}
