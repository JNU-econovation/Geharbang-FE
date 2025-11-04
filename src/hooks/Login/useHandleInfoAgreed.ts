import { useState } from "react";

interface useHandleInfoAgreedReturn {
  isInfoAgreed: boolean;
  isLoginClicked: boolean;
  handleIsInfoAgreed: () => void;
  handleLogin: (provider: "google" | "kakao") => void;
}

export const useHandleInfoAgreed = (
  googleLogin: () => void,
  kakaoLogin: () => void
): useHandleInfoAgreedReturn => {
  const [isInfoAgreed, setIsAgreed] = useState(false);
  const [isLoginClicked, setIsLoginClicked] = useState(false);

  const handleIsInfoAgreed = () => setIsAgreed((prev) => !prev);

  const shakeInfoBtn = () => {
    setIsLoginClicked(true);
    setTimeout(() => setIsLoginClicked(false), 200);
  };

  const handleLogin = (provider: "google" | "kakao") => {
    if (!isInfoAgreed) {
      shakeInfoBtn();
      return;
    }

    if (provider === "google") googleLogin();
    else kakaoLogin();
  };

  return {
    isInfoAgreed,
    isLoginClicked,
    handleIsInfoAgreed,
    handleLogin,
  };
};
