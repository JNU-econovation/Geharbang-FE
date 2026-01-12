import Flex from "@/src/components/layout/Flex";
import CustomTextInput from "@/src/components/ui/TextInput";
import TextSize from "@/src/components/ui/TextSize";
import { COLORS } from "@/src/utils/constants/colors";
import { ROOM_PRICE_OPTIONS } from "@/src/utils/constants/filterOptions";
import React from "react";
import { Pressable, View } from "react-native";

interface RoomPriceFilterProps {
  lowestRoomPrice: number | null;
  highestRoomPrice: number | null;
  setRoomPrice: (type: "lowest" | "highest", value: number | null) => void;
  setRoomPriceRange: (min: number | null, max: number | null) => void;
}

export default function RoomPriceFilter({
  lowestRoomPrice,
  highestRoomPrice,
  setRoomPrice,
  setRoomPriceRange,
}: RoomPriceFilterProps) {
  const isSelected = (min: number | null, max: number | null) =>
    lowestRoomPrice === min && highestRoomPrice === max;

  const handleToggle = (min: number | null, max: number | null) => {
    if (isSelected(min, max)) {
      setRoomPriceRange(null, null);
    } else {
      setRoomPriceRange(min, max);
    }
  };

  return (
    <View className='gap-4'>
      <Flex dir='row' justify='center' gap={16}>
        <View className='gap-2'>
          <TextSize size={13} content='최저 금액' color={COLORS.GRAY.TEXT} />
          <CustomTextInput
            placeholder='50000'
            value={lowestRoomPrice || ""}
            width={140}
            keyboardType='numeric'
            onChangeText={(text) =>
              setRoomPrice("lowest", Number(text) || null)
            }
            suffix='원'
          />
        </View>

        <View className='pt-8'>
          <TextSize size={16} content='~' />
        </View>

        <View className='gap-2'>
          <TextSize size={13} content='최고 금액' color={COLORS.GRAY.TEXT} />
          <CustomTextInput
            placeholder='100000'
            value={highestRoomPrice || ""}
            width={140}
            keyboardType='numeric'
            onChangeText={(text) =>
              setRoomPrice("highest", Number(text) || null)
            }
            suffix='원'
          />
        </View>
      </Flex>

      <View className='flex-row gap-2 ml-1'>
        {ROOM_PRICE_OPTIONS.map((price) => {
          const active = isSelected(price.min, price.max);

          return (
            <Pressable
              key={price.label}
              onPress={() => handleToggle(price.min, price.max)}
              className={`p-3 rounded-lg border ${
                active ? "border-primary-blue bg-blue-50" : "border-gray-border"
              }`}
            >
              <TextSize
                size={14}
                content={price.label}
                color={active ? COLORS.PRIMARY.BLUE : COLORS.GRAY.TEXT}
              />
            </Pressable>
          );
        })}
      </View>
    </View>
  );
}
