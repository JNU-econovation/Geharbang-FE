import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { useEffect, useState } from 'react';
import { Image, Linking, Pressable, ScrollView, Text, View } from 'react-native';
import { useToggleWish } from '@/src/hooks/wish/useToggleWish';
import { StepMapItem } from '@/src/types/models/map';
import { COLORS } from '@/src/utils/constants/colors';

interface StepBottomSheetProps {
  item: StepMapItem;
}

export default function StepBottomSheet({ item }: StepBottomSheetProps) {
  const router = useRouter();
  const [isWished, setIsWished] = useState(item.isWished);

  useEffect(() => {
    setIsWished(item.isWished);
  }, [item.isWished]);

  const { mutate: toggleWish } = useToggleWish({
    type: 'stepRecruitment',
    id: item.id,
    onOptimisticUpdate: (newIsWished) => setIsWished(newIsWished),
    onError: () => setIsWished(isWished),
  });

  return (
    <Pressable
      onPress={() => router.push(`/step/stepDetail/${item.id}`)}
      style={{
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        backgroundColor: 'white',
        borderTopLeftRadius: 16,
        borderTopRightRadius: 16,
        paddingBottom: 24,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: -3 },
        shadowOpacity: 0.1,
        shadowRadius: 6,
        elevation: 8,
      }}
    >
      {/* 헤더: 이름+주소 / 액션 버튼 */}
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          paddingHorizontal: 16,
          paddingTop: 16,
          paddingBottom: 12,
        }}
      >
        <View style={{ flex: 1, marginRight: 12 }}>
          <Text style={{ fontSize: 16, fontWeight: '700', color: '#101828' }} numberOfLines={2}>
            {item.guestHouseName}
          </Text>
          <Text style={{ fontSize: 12, color: COLORS.GRAY.TEXT, marginTop: 4 }} numberOfLines={1}>
            {item.address}
          </Text>
        </View>

        {/* 액션 버튼: 전화 / 인스타 / 사이트 / 하트 */}
        <View style={{ flexDirection: 'row', alignItems: 'center', gap: 16 }}>
          {item.phoneNumber && (
            <Pressable
              onPress={(e) => {
                e.stopPropagation();
                Linking.openURL(`tel:${item.phoneNumber}`);
              }}
              hitSlop={8}
            >
              <Ionicons name='call-outline' size={22} color='#22c55e' />
            </Pressable>
          )}

          {item.instagramId && (
            <Pressable
              onPress={(e) => {
                e.stopPropagation();
                Linking.openURL(`https://instagram.com/${item.instagramId}`);
              }}
              hitSlop={8}
            >
              <Ionicons name='logo-instagram' size={22} color='#E1306C' />
            </Pressable>
          )}

          {item.webSite && (
            <Pressable
              onPress={(e) => {
                e.stopPropagation();
                Linking.openURL(item.webSite!);
              }}
              hitSlop={8}
            >
              <Ionicons name='globe-outline' size={22} color={COLORS.PRIMARY.BLUE} />
            </Pressable>
          )}

          <Pressable
            onPress={(e) => {
              e.stopPropagation();
              toggleWish(isWished);
            }}
            hitSlop={8}
          >
            <Ionicons
              name={isWished ? 'heart' : 'heart-outline'}
              size={22}
              color={isWished ? '#ef4444' : '#4B5563'}
            />
          </Pressable>
        </View>
      </View>

      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{ paddingHorizontal: 16, gap: 8 }}
      >
        {item.images.map((imageUrl, index) => (
          <Image
            key={index}
            source={{ uri: imageUrl }}
            style={{ width: 200, height: 130, borderRadius: 8 }}
            resizeMode='cover'
          />
        ))}
      </ScrollView>
    </Pressable>
  );
}
