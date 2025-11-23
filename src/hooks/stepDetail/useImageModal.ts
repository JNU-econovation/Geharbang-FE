import { useEffect, useState } from "react";

export const useImageModal = () => {
  const [imageIdx, setImageIdx] = useState(1);
  const [modalIdx, setModalIdx] = useState(1);
  const [modalVisible, setModalVisible] = useState(false);

  useEffect(() => {
    setModalIdx(1);
  }, [modalVisible]);

  return {
    imageIdx,
    setImageIdx,
    modalIdx,
    setModalIdx,
    modalVisible,
    setModalVisible,
  };
};
