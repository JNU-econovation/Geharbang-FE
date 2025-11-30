import { Modal, Pressable, View } from "react-native";

import Border from "@/public/svgs/StepDetail/modal/border.svg";
import Note from "@/public/svgs/StepDetail/modal/note.svg";
import Plus from "@/public/svgs/StepDetail/modal/plus.svg";

import Button from "@/src/components/ui/Button/Button";

import ContactCompo from "../Contact/ContactCompo";

interface StepDetailModalProps {
  isVisible: boolean;
  onPress: () => void;
  isApplicationExist?: boolean;
}

export default function StepDetailModal({
  isVisible,
  onPress,
  isApplicationExist,
}: StepDetailModalProps) {
  return (
    <Modal transparent visible={isVisible}>
      <Pressable
        style={{
          flex: 1,
          backgroundColor: "rgba(0,0,0,0.3)",
          justifyContent: "flex-end",
        }}
        onPress={onPress}
      >
        <Pressable
          style={{
            height: 250,
            backgroundColor: "white",
            borderTopLeftRadius: 16,
            borderTopRightRadius: 16,
          }}
          onPress={(e) => e.stopPropagation()}
        >
          <View className='h-10 border-b border-[#E5E5E5] flex items-center justify-center'>
            <Border width={34} height={30} />
          </View>

          <View className='p-6'>
            {isApplicationExist ? (
              <ContactCompo
                variant='modalApply'
                icon={<Note width={20} height={20} />}
                title='기존 지원서로 지원하기'
                content='작성된 지원서를 바로 사용합니다'
                iconBg='#DFF2FE'
                isModal={true}
              />
            ) : (
              <ContactCompo
                variant='modalApply'
                icon={<Plus width={20} height={20} />}
                title='새 지원서 작성하기'
                content='새로운 지원서를 작성합니다'
                iconBg='#DCFCE7'
                isModal={true}
              />
            )}

            <View className='pt-5' />

            <Button
              variant='gray'
              height={50}
              textColor='#364153'
              content='취소'
              onPress={onPress}
            />
          </View>
        </Pressable>
      </Pressable>
    </Modal>
  );
}
