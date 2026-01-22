import { router } from 'expo-router';
import React from 'react';
import { View } from 'react-native';

import ItemListContainer from '@/src/components/ui/ItemListContainer';
import { useGuestHouseStore } from '@/src/stores/guestHouse/useGuestHouseStore';
import { MAX_ITEMS } from '@/src/utils/constants/guestHouseEnrollment';
import PartyCard from './PartyCard';

const PartyComponent = () => {
  const { step2Data, removeParty } = useGuestHouseStore();
  const { parties } = step2Data;

  return (
    <View className="flex-1">
      <View
        style={{
          width: '100%',
          alignItems: 'center',
          paddingVertical: 40,
        }}
      >
        <View className="w-full max-w-sm">
          <ItemListContainer
            title="파티"
            description="최대 10개까지 등록할 수 있습니다"
            items={parties}
            addButtonLabel="파티 추가"
            onAddPress={() => router.push('/guestHouse/enroll/makeParty')}
            maxItems={MAX_ITEMS.PARTIES}
            renderItem={(party, index) => (
              <PartyCard
                key={party.id}
                party={party}
                isRepresentative={index === 0}
                onEdit={() => {
                  router.push({
                    pathname: '/guestHouse/enroll/makeParty',
                    params: { editId: party.id },
                  });
                }}
                onDelete={() => removeParty(party.id)}
              />
            )}
          />
        </View>
      </View>
    </View>
  );
};

export default PartyComponent;
