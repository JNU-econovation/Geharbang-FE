import { Pressable, ScrollView, Text } from 'react-native';
import { regions } from '@/src/utils/constants/regions';
import { COLORS } from '@/src/utils/constants/colors';

interface RegionFilterProps {
  selectedRegion: string | null;
  onSelect: (region: string | null) => void;
}

const REGION_LABELS: Record<string, string> = {
  제주시: '제주시',
  서귀포시: '서귀포시',
  서부권: '서부권',
  동부권: '동부권',
  중문_대정: '중문·대정',
};

const MAP_REGIONS = regions.filter((r) => r !== '도서지역');

export default function RegionFilter({ selectedRegion, onSelect }: RegionFilterProps) {
  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={{ paddingHorizontal: 16, gap: 8 }}
      style={{ marginTop: 8 }}
    >
      {MAP_REGIONS.map((region) => {
        const isSelected = selectedRegion === region;
        return (
          <Pressable
            key={region}
            onPress={() => onSelect(isSelected ? null : region)}
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
              {REGION_LABELS[region] ?? region}
            </Text>
          </Pressable>
        );
      })}
    </ScrollView>
  );
}
