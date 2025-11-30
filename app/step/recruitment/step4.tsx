import FormField from "@/app/application/_components/FormField";
import FormSection from "@/app/application/_components/FormSection";
import RecruitmentStepLayout from "@/app/step/recruitment/_components/RecruitmentStepLayout";
import Flex from "@/src/components/layout/Flex";
import Button from "@/src/components/ui/Button/Button";
import TextInput from "@/src/components/ui/TextInput";
import { router } from "expo-router";
import React, { useState } from "react";
import { View } from "react-native";

export default function RecruitmentStep4() {
  const [instagram, setInstagram] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [website, setWebsite] = useState("");
  const [message, setMessage] = useState("");

  const handleNext = () => {
    router.push("/step/recruitment/step5");
  };

  return (
    <RecruitmentStepLayout currentStep={4} stepTitle="연락처 및 사장님 한마디">
      <View className="pt-4 px-3">
        <Flex justify="start" items="center" gap={24}>
          <FormSection title="연락처 및 사장님 한마디">
            <FormField label="인스타그램" required={false}>
              <TextInput
                value={instagram}
                onChangeText={setInstagram}
                placeholder="예: @jeju_guesthouse"
              />
            </FormField>

            <FormField label="전화번호" required={false}>
              <TextInput
                value={phone}
                onChangeText={setPhone}
                placeholder="예: 064-123-4567"
                keyboardType="phone-pad"
              />
            </FormField>

            <FormField label="이메일" required={false}>
              <TextInput
                value={email}
                onChangeText={setEmail}
                placeholder="예: owner@naver.com"
                keyboardType="email-address"
              />
            </FormField>

            <FormField label="웹사이트" required={false}>
              <TextInput
                value={website}
                onChangeText={setWebsite}
                placeholder="예: https://www.jejuguesthouse.com"
                keyboardType="url"
              />
            </FormField>

            <FormField label="사장님 한마디" required={false}>
              <TextInput
                value={message}
                onChangeText={setMessage}
                placeholder="스텝들에게 전하고 싶은 메시지를 입력해주세요"
                multiline={true}
                height={120}
              />
            </FormField>
          </FormSection>

          <Button
            variant="primary"
            width={370}
            height={50}
            textColor="white"
            content="다음"
            onPress={handleNext}
          />
        </Flex>
      </View>
    </RecruitmentStepLayout>
  );
}
