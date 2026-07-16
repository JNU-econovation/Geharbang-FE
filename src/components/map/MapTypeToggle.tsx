import { Image, Pressable, Text, View } from 'react-native';
import { COLORS } from '@/src/utils/constants/colors';

type MapType = 'step' | 'guesthouse';

interface MapTypeToggleProps {
  mapType: MapType;
  onChange: (type: MapType) => void;
  topOffset: number;
}

export default function MapTypeToggle({ mapType, onChange, topOffset }: MapTypeToggleProps) {
  return (
    <View
      style={{
        position: 'absolute',
        right: 16,
        top: topOffset,
        backgroundColor: 'white',
        borderRadius: 12,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.2,
        shadowRadius: 8,
        elevation: 8,
        overflow: 'hidden',
      }}
    >
      <Pressable
        onPress={() => onChange('guesthouse')}
        style={{
          paddingVertical: 8,
          paddingHorizontal: 10,
          alignItems: 'center',
        }}
      >
        <Image
          source={
            mapType === 'guesthouse'
              ? require('@/assets/images/icon_house_active.png')
              : require('@/assets/images/icon_house_inactive.png')
          }
          style={{ width: 24, height: 24 }}
          resizeMode='contain'
        />
        <Text
          style={{
            fontSize: 10,
            marginTop: 3,
            color: mapType === 'guesthouse' ? COLORS.PRIMARY.BLUE : '#9CA3AF',
            fontWeight: '500',
          }}
        >
          게하지도
        </Text>
      </Pressable>

      <View style={{ height: 1, backgroundColor: '#F3F4F6' }} />

      <Pressable
        onPress={() => onChange('step')}
        style={{
          paddingVertical: 8,
          paddingHorizontal: 10,
          alignItems: 'center',
        }}
      >
        <Image
          source={
            mapType === 'step'
              ? require('@/assets/images/icon_person_active.png')
              : require('@/assets/images/icon_person_inactive.png')
          }
          style={{ width: 24, height: 24 }}
          resizeMode='contain'
        />
        <Text
          style={{
            fontSize: 10,
            marginTop: 3,
            color: mapType === 'step' ? COLORS.PRIMARY.BLUE : '#9CA3AF',
            fontWeight: '500',
          }}
        >
          스텝지도
        </Text>
      </Pressable>
    </View>
  );
}
