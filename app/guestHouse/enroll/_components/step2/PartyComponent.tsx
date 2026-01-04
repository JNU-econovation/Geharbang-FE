import { Feather } from '@expo/vector-icons';
import { router } from 'expo-router';
import React from 'react';
import { ScrollView, Text, TouchableOpacity, View } from 'react-native';

import { useGuestHouseStore } from '@/src/stores/guestHouse/useGuestHouseStore';
import PartyCard from './PartyCard';

const PartyComponent = () => {
  const { step2Data, removeParty } = useGuestHouseStore();
  const { parties } = step2Data;

  return (
    <View className="flex-1 ">
      <ScrollView
        contentContainerStyle={{
          flexGrow: 1,
          justifyContent: 'center',
          alignItems: 'center',
          paddingVertical: 40,
        }}
      >
        <View className="w-full max-w-sm">
          <View className="w-full bg-white rounded-[12px] shadow-sm p-6 mb-4">
            <View className="flex-row items-center mb-1">
              <Text className="text-[#101828] text-xl font-medium">파티 </Text>
              <Text className="text-[#fb2c36] text-xl font-bold">*</Text>
            </View>

            <Text className="text-[#697282] text-xs font-normal mb-3">
              최대 10개까지 등록할 수 있습니다
            </Text>

            {parties.length === 0 ? (
              <TouchableOpacity
                className="w-full h-48 bg-sky-50 rounded-xl border-2 border-dashed border-sky-200 flex justify-center items-center gap-3"
                activeOpacity={0.7}
                onPress={() => router.push('/guestHouse/enroll/makeParty')}
              >
                <Feather name="plus" size={32} color="#0ea5e9" />
                <Text className="text-sky-600 text-sm font-medium">
                  파티 추가
                </Text>
              </TouchableOpacity>
            ) : (
              <>
                {parties.map((party, index) => (
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
                ))}

                <TouchableOpacity
                  className="w-full h-12 mt-4 bg-sky-50 rounded-xl border border-sky-200 flex-row justify-center items-center gap-2"
                  activeOpacity={0.7}
                  onPress={() => router.push('/guestHouse/enroll/makeParty')}
                >
                  <Feather name="plus" size={18} color="#0ea5e9" />
                  <Text className="text-sky-600 text-sm font-medium">
                    파티 추가
                  </Text>
                </TouchableOpacity>
              </>
            )}
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

export default PartyComponent;
