import { Option } from "@/src/types/Option";
import { COLORS } from "@/src/utils/constants/colors";
import React from "react";
import { DimensionValue, Pressable, Text, View } from "react-native";
import FieldLabel from "./FieldLabel";
import { Gender } from "@/src/types/Gender";

interface GenderSelectorProps {
  selectedGender: Gender;
  setSelectedGender: (gender: Gender) => void;
  label: string;
  size: DimensionValue;
  option: Option<Gender>[];
  isRequired?: boolean;
  labelSize?: number;
  errorMessage?: string;
}

export default function GenderSelector({
  selectedGender,
  setSelectedGender,
  label,
  size,
  option,
  isRequired,
  labelSize,
  errorMessage
}: GenderSelectorProps) {
  return (
    <View>
      <FieldLabel
        label={label}
        isRequired={isRequired}
        fontSize={labelSize}
      ></FieldLabel>
      <View className="flex-row flex-wrap justify-center gap-1">
        {option.map((data) => {
          const isSelected = selectedGender === data.value;

          return (
            <Pressable
              key={data.value}
              className="w-[43%] flex-row justify-center gap-3 rounded-lg border border-border-gray items-center py-3.5"
              style={[
                { width: size },
                errorMessage
                  ? { borderColor: COLORS.PRIMARY.RED }
                  : isSelected
                  ? {
                      backgroundColor: "#EFF6FF",
                      borderColor: COLORS.PRIMARY.BLUE,
                    }
                  : { borderColor: COLORS.GRAY.BORDER },
              ]}
              onPress={() => {
                setSelectedGender(data.value);
              }}
            >
              <View
                className={`rounded-full w-3.5 h-3.5 ${
                  isSelected ? "bg-primary-blue" : " border border-gray-placeholder"
                }`}
              ></View>

              <Text>{data.label}</Text>
            </Pressable>
          );
        })}
      </View>
       <View className="mt-1 ml-1">
        <Text className="text-primary-red text-xs">
          {errorMessage ? errorMessage : " "}
        </Text>
      </View>
    </View>
  );
}
