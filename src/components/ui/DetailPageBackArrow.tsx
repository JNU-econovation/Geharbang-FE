import { Pressable, Share } from "react-native";

import ShareArrow from "@/public/svgs/StepDetail/shareArrow.svg";
import Streamed from "@/public/svgs/StepDetail/steamed.svg";

import Flex from "../layout/Flex";
import BackArrorHeader from "./BackArrowHeader";

interface DetailPageBackArrowProps {
  content: string;
  shareTitle: string;
  shareMessage: string;
  onBack?: () => void;
}

export default function DetailPageBackArrow({
  content,
  shareTitle,
  shareMessage,
  onBack,
}: DetailPageBackArrowProps) {
  return (
    <BackArrorHeader
      content={content}
      onPress={onBack}
      icon={
        <Flex items='center' justify='center' dir='row' gap={20}>
          <Streamed width={20} height={20} />
          <Pressable
            onPress={async () =>
              await Share.share({
                title: shareTitle,
                message: shareMessage,
              })
            }
          >
            <ShareArrow width={20} height={20} />
          </Pressable>
        </Flex>
      }
    />
  );
}
