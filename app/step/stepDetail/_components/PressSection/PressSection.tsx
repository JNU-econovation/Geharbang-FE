import Flex from "@/src/components/layout/Flex/Flex";
import PressSectionToScroll from "./PressSectionToScroll";

interface PressSectionProps {
  handleSectionToScroll: (key: string) => void;
  selectedSection: string;
}

export default function PressSection({
  handleSectionToScroll,
  selectedSection,
}: PressSectionProps) {
  return (
    <Flex items='center' justify='center' dir='row' gap={24}>
      <PressSectionToScroll
        section='address'
        content='위치'
        handleSectionToScroll={handleSectionToScroll}
        isActive={selectedSection === "address"}
      />
      <PressSectionToScroll
        section='workInfo'
        content='근무 정보'
        handleSectionToScroll={handleSectionToScroll}
        isActive={selectedSection === "workInfo"}
      />
      <PressSectionToScroll
        section='workDate'
        content='근무일'
        handleSectionToScroll={handleSectionToScroll}
        isActive={selectedSection === "workDate"}
      />
      <PressSectionToScroll
        section='intro'
        content='소개'
        handleSectionToScroll={handleSectionToScroll}
        isActive={selectedSection === "intro"}
      />
      <PressSectionToScroll
        section='feature'
        content='모집 정보'
        handleSectionToScroll={handleSectionToScroll}
        isActive={selectedSection === "feature"}
      />
      <PressSectionToScroll
        section='contact'
        content='연락처'
        handleSectionToScroll={handleSectionToScroll}
        isActive={selectedSection === "contact"}
      />
    </Flex>
  );
}
