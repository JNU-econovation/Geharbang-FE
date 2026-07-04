import { ScrollView } from "react-native";

import { PressSectionItems } from "@/src/utils/constants/pressSection";
import PressSectionToScroll from "./PressSectionToScroll";

interface PressSectionProps {
  items: PressSectionItems[];
  handleSectionToScroll: (key: string) => void;
  selectedSection: string;
}

export default function PressSection({
  items,
  handleSectionToScroll,
  selectedSection,
}: PressSectionProps) {
  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={{
        paddingHorizontal: 16,
        gap: 8,
      }}
    >
      {items.map(({ section, content }) => (
        <PressSectionToScroll
          key={section}
          section={section}
          content={content}
          handleSectionToScroll={handleSectionToScroll}
          isActive={selectedSection === section}
        />
      ))}
    </ScrollView>
  );
}
