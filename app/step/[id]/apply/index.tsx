import { useState } from "react";
import { KeyboardAvoidingView, Platform, ScrollView, View } from "react-native";

import FormField from "@/app/application/_components/FormField";
import CustomSafeAreaView from "@/src/components/layout/CustomSafeAreaView";
import DismissKeyboardView from "@/src/components/layout/DismissKeyboardView";
import BackArrorHeader from "@/src/components/ui/BackArrorHeader";
import Button from "@/src/components/ui/Button/Button";
import TextInput from "@/src/components/ui/TextInput";
import SelectedApplication from "./_components/SelectedApplication";
import TargetPostingInfo from "./_components/TargetPostingInfo";

export default function staffApplly() {
  const stapNotice = {
    id: 52,
    name: "비양도 스테이",
    region: "애월읍",
    imageUrl:
      "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=400&h=300&fit=crop",
    tags: ["섬", "조용한"],
  };
  const [answer, setAnswer] = useState(""); // 추후 개별 답변으로 수정 예정

  return (
    <>
      <DismissKeyboardView>
        <CustomSafeAreaView pageColor="bg-white">
          <View className="p-2">
            <BackArrorHeader content="지원하기" />
          </View>
          <KeyboardAvoidingView
            style={{ flex: 1 }}
            behavior={Platform.OS === "ios" ? "padding" : undefined}
            keyboardVerticalOffset={0}
          >
            <ScrollView>
              <View className="w-full">
                <TargetPostingInfo {...stapNotice} />
                <SelectedApplication
                  name="홍길동"
                  imageUrl="https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?w=400&h=300&fit=crop"
                />

                {/* api 로직 추가 후 수정 예정 */}
                <View className="gap-4 px-4 mt-6 mb-12">
                  <FormField
                    label="1. 게스트하우스 근무 경험이 있으신가요?"
                    required={true}
                  >
                    <TextInput
                      value={answer}
                      onChangeText={(text) => {
                        setAnswer(text);
                      }}
                      placeholder="답변을 입력하세요..."
                      multiline={true}
                      height={130}
                    />
                  </FormField>

                  <FormField
                    label="2. 본인의 강점과 이 일을 하고 싶은 이유를 작성해주세요"
                    required={true}
                  >
                    <TextInput
                      value={answer}
                      onChangeText={(text) => {
                        setAnswer(text);
                      }}
                      placeholder="답변을 입력하세요..."
                      multiline={true}
                      height={130}
                    />
                  </FormField>
                </View>

                <View className="items-center">
                  <Button
                    variant="primary"
                    width={380}
                    height={50}
                    textColor="white"
                    content="지원하기"
                  />
                </View>
              </View>
            </ScrollView>
          </KeyboardAvoidingView>
        </CustomSafeAreaView>
      </DismissKeyboardView>
    </>
  );
}
