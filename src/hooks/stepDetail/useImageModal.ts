import { useState } from "react";

export const useImageModal = () => {
  const [currentIdx, setCurrentIdx] = useState(1);
  const [modalVisible, setModalVisible] = useState(false);

  const closeModal = () => {
    setCurrentIdx(1);
    setModalVisible(false);
  };

  return {
    currentIdx,
    setCurrentIdx,
    modalVisible,
    setModalVisible,
    closeModal,
  };
};
