import { View } from "react-native";

import Google from "@/public/svgs/Login/google.svg";
import Kakao from "@/public/svgs/Login/kakao.svg";

import Flex from "@/src/components/layout/Flex";
import Button from "@/src/components/ui/Button/Button";
import TextSize from "@/src/components/ui/TextSize";

import { useHandleInfoAgreed } from "@/src/hooks/Login/useHandleInfoAgreed";
import { useOauthLogin } from "@/src/hooks/Login/useOauthLogin";

import PersonalInfo from "./PersonalInfo";

export default function LoginBody() {
  const { mutate: kakaoLogin, isPending: isKakaoPending } =
    useOauthLogin("kakao");

  const { mutate: googleLogin, isPending: isGooglePending } =
    useOauthLogin("google");

  const { isInfoAgreed, isLoginClicked, handleIsInfoAgreed, handleLogin } =
    useHandleInfoAgreed(googleLogin, kakaoLogin);

  return (
    <Flex items='center' justify='start'>
      <View className='pt-10'>
        <TextSize size={24} color='#1F2937' content='로그인' />
      </View>
      <View className='pt-2'>
        <TextSize
          size={16}
          color='#4B5563'
          content='제주도의 특별한 게스트하우스를 만나보세요'
        />
      </View>

      <View className='pt-7'>
        <Button
          variant='google'
          width={327}
          height={56}
          textColor='#1F1F1F'
          content='Google 로그인'
          icon={<Google width={18} height={18} />}
          onPress={() => handleLogin("google")}
          isPending={isGooglePending}
        />
      </View>

      <View className='pt-4'>
        <Button
          variant='kakao'
          width={327}
          height={56}
          textColor='#1F2937'
          content='카카오 로그인'
          icon={<Kakao width={18} height={18} />}
          onPress={() => handleLogin("kakao")}
          isPending={isKakaoPending}
        />
      </View>

      <PersonalInfo
        isInfoAgreed={isInfoAgreed}
        handleIsInfoAgreed={handleIsInfoAgreed}
        isLoginClicked={isLoginClicked}
      />
    </Flex>
  );
}
