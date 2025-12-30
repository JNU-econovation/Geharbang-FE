import Flex from "@/src/components/layout/Flex/Flex";
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
    <Flex items='center' justify='center' dir='row' gap={32}>
      {items.map(({ section, content }) => (
        <PressSectionToScroll
          key={section}
          section={section}
          content={content}
          handleSectionToScroll={handleSectionToScroll}
          isActive={selectedSection === section}
        />
      ))}
    </Flex>
  );
}
