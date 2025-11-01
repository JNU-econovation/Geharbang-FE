import { useState } from "react";

interface useHandleInfoClickedReturn {
  clicked: boolean;
  handleInfoClicked: () => void;
}

export const useHandleInfoClicked = (): useHandleInfoClickedReturn => {
  const [clicked, setIsClicked] = useState(false);

  const handleInfoClicked = () => setIsClicked(!clicked);

  return {
    clicked,
    handleInfoClicked,
  };
};
