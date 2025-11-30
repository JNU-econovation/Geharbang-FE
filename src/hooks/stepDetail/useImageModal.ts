import { useState } from "react";

export const useImageModal = () => {
  const [imageIdx, setImageIdx] = useState(0);
  const [modalIdx, setModalIdx] = useState(0);
  const [modalVisible, setModalVisible] = useState(false);

  return {
    imageIdx,
    setImageIdx,
    modalIdx,
    setModalIdx,
    modalVisible,
    setModalVisible,
  };
};
