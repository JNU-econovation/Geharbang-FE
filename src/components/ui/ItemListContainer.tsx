import { Feather } from "@expo/vector-icons";
import React, { ReactNode } from "react";
import { Text, TouchableOpacity, View } from "react-native";

interface ItemListContainerProps<T> {
  title?: string;
  description?: string;
  items: T[];
  emptyIcon?: keyof typeof Feather.glyphMap;
  addIcon?: keyof typeof Feather.glyphMap;
  addButtonLabel: string;
  onAddPress: () => void;
  renderItem: (item: T, index: number) => ReactNode;
  error?: string;
  maxItems?: number;
}

const ItemListContainer = <T,>({
  title,
  description,
  items,
  emptyIcon = "plus",
  addIcon = "plus",
  addButtonLabel,
  onAddPress,
  renderItem,
  error,
  maxItems,
}: ItemListContainerProps<T>) => {
  const canAddMore = !maxItems || items.length < maxItems;

  return (
    <View>
      {(title || description) && (
        <View className='mb-4'>
          {title && (
            <Text className='text-lg font-semibold text-gray-900'>
              {title}
            </Text>
          )}
          {description && (
            <Text className='text-sm text-gray-500 mt-1'>{description}</Text>
          )}
        </View>
      )}

      {error && (
        <View className='bg-red-50 border border-red-200 rounded-lg p-3 mb-3'>
          <Text className='text-red-600 text-sm'>{error}</Text>
        </View>
      )}

      {items.length === 0 ? (
        <TouchableOpacity
          className='w-full h-48 bg-sky-50 rounded-xl border-2 border-dashed border-sky-200 flex justify-center items-center gap-3'
          activeOpacity={0.7}
          onPress={onAddPress}
        >
          <Feather name={emptyIcon} size={32} color='#0ea5e9' />
          <Text className='text-sky-600 text-sm font-medium'>
            {addButtonLabel}
          </Text>
        </TouchableOpacity>
      ) : (
        <>
          {items.map((item, index) => renderItem(item, index))}

          {canAddMore && (
            <TouchableOpacity
              className='w-full h-12 mt-4 bg-sky-50 rounded-xl border border-sky-200 flex-row justify-center items-center gap-2'
              activeOpacity={0.7}
              onPress={onAddPress}
            >
              <Feather name={addIcon} size={18} color='#0ea5e9' />
              <Text className='text-sky-600 text-sm font-medium'>
                {addButtonLabel}
              </Text>
            </TouchableOpacity>
          )}
        </>
      )}
    </View>
  );
};

export default ItemListContainer;
