import { useState } from "react";

export const useImageModal = () => {
  const [currentIdx, setCurrentIdx] = useState(1);
  const [modalVisible, setModalVisible] = useState(false);

  return {
    currentIdx,
    setCurrentIdx,
    modalVisible,
    setModalVisible,
  };
};
