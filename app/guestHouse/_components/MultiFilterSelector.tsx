import Checkbox from "@/src/components/ui/Checkbox";
import TextSize from "@/src/components/ui/TextSize";
import { FilterState } from "@/src/types/models/guestHouse/types";
import { Option } from "@/src/types/Option";
import { COLORS } from "@/src/utils/constants/colors";
import { Pressable, View } from "react-native";

interface MultiFilterSelectorProps<K extends keyof FilterState> {
  filterKey: K;
  options: Option[];
  selectedItems: string[];
  onToggle: (key: K, value: string) => void;
}

export default function MultiFilterSelector<K extends keyof FilterState>({
  filterKey,
  options,
  selectedItems,
  onToggle,
}: MultiFilterSelectorProps<K>) {
  return (
    <View className='gap-2'>
      {options.map((item) => {
        const isSelected = selectedItems.includes(item.value);

        return (
          <Pressable
            key={item.value}
            onPress={() => onToggle(filterKey, item.value)}
            className={`flex-row items-center gap-3 px-3 py-3.5 rounded-lg border ${
              isSelected ? "border-primary-blue bg-blue-50" : "border-gray-200"
            }`}
          >
            <Checkbox checked={isSelected} size='md' />
            <View>
              <TextSize size={14} content={item.label} />
            </View>
          </Pressable>
        );
      })}
    </View>
  );
}
