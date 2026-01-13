import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';

import { TabType } from '@/src/types/operator';
import { MANAGEMENT_TABS } from '@/src/utils/constants/operator';

interface ManagementTabsProps {
  activeTab: TabType;
  onTabChange: (tab: TabType) => void;
}

export default function ManagementTabs({
  activeTab,
  onTabChange,
}: ManagementTabsProps) {
  return (
    <View className="w-full flex-row bg-white border-b border-gray-200">
      {MANAGEMENT_TABS.map((tab) => (
        <TouchableOpacity
          key={tab.key}
          className="flex-1 relative justify-center items-center py-3"
          onPress={() => onTabChange(tab.key)}
        >
          <Text
            className={`text-center text-sm font-normal ${
              activeTab === tab.key ? 'text-sky-500' : 'text-[#99a1af]'
            }`}
          >
            {tab.label}
          </Text>
          {activeTab === tab.key && (
            <View className="absolute bottom-0 w-full h-[2px] bg-sky-500" />
          )}
        </TouchableOpacity>
      ))}
    </View>
  );
}
