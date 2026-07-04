import { useState } from "react";

interface useHandleSectionProps {
  sectionToScroll: (key: string) => void;
}

export const useHandleSection = ({
  sectionToScroll,
}: useHandleSectionProps) => {
  const [selectedSection, setSelectedSection] = useState("address");

  const handleSectionToScroll = (key: string) => {
    setSelectedSection(key);
    sectionToScroll(key);
  };

  return {
    selectedSection,
    setSelectedSection,
    handleSectionToScroll,
  };
};
