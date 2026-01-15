import { useLocalSearchParams } from "expo-router";
import { useMemo, useState } from "react";
import { ScrollView, View } from "react-native";

import CustomSafeAreaView from "@/src/components/layout/CustomSafeAreaView";
import Flex from "@/src/components/layout/Flex";
import BackArrorHeader from "@/src/components/ui/BackArrowHeader";
import ConfirmModal from "@/src/components/ui/Modal/ConfirmModal";
import { COLORS } from "@/src/utils/constants/colors";
import { Ionicons } from "@expo/vector-icons";
import ApplicationCard, {
  ApplicationStatusType,
} from "./_components/ApplicationCard";
import ApplicationDashboard from "./_components/ApplicationDashboard";
import ApplicationFilter, { FilterType } from "./_components/ApplicationFilter";

export default function ApplicationList() {
  const { id } = useLocalSearchParams();
  const [filter, setFilter] = useState<FilterType>("전체");
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedApplicant, setSelectedApplicant] = useState<{
    id: number;
    name: string;
  } | null>(null);

  const submittedApplications = [
    {
      applicationRecordId: 1,
      name: "김지우",
      imageUrl: "/images/application/1768205585402_1_IMG_0002.jpeg",
      applicationStatus: "대기중",
      appliedAt: "2025-01-28",
    },
    {
      applicationRecordId: 2,
      name: "이민지",
      imageUrl: "/images/application/1768205585402_1_IMG_0002.jpeg",
      applicationStatus: "합격",
      appliedAt: "2025-01-27",
    },
    {
      applicationRecordId: 3,
      name: "김태희",
      imageUrl: "/images/application/1768205585402_1_IMG_0002.jpeg",
      applicationStatus: "대기중",
      appliedAt: "2025-01-26",
    },
  ];

  const counts = useMemo(() => {
    return {
      all: submittedApplications.length,
      pending: submittedApplications.filter(
        (app) => app.applicationStatus === "대기중"
      ).length,
      passed: submittedApplications.filter(
        (app) => app.applicationStatus === "합격"
      ).length,
    };
  }, [submittedApplications]);

  const filteredData = useMemo(() => {
    if (filter === "전체") return submittedApplications;

    return submittedApplications.filter(
      (item) => item.applicationStatus === filter
    );
  }, [filter, submittedApplications]);

  const handlePassPress = (id: number, name: string) => {
    setSelectedApplicant({ id, name });
    setIsModalVisible(true);
  };

  return (
    <CustomSafeAreaView pageColor='bg-white'>
      <View className='px-4 py-3'>
        <BackArrorHeader content='받은 지원서' />
      </View>

      <ApplicationDashboard
        all={counts.all}
        pending={counts.pending}
        passed={counts.passed}
      />
      <ApplicationFilter currentFilter={filter} onFilterChange={setFilter} />

      <ScrollView className='bg-[#F9FAFB] px-3'>
        <Flex justify='start' items='center' gap={20}>
          {filteredData.map((item) => (
            <ApplicationCard
              key={item.applicationRecordId}
              stepRecruitmentId={Number(id)}
              applicationId={item.applicationRecordId}
              name={item.name}
              imageUrl={item.imageUrl}
              appliedAt={item.appliedAt}
              applicationStatus={
                item.applicationStatus as ApplicationStatusType
              }
              onPass={() =>
                handlePassPress(item.applicationRecordId, item.name)
              }
            />
          ))}
        </Flex>
      </ScrollView>

      <ConfirmModal
        visible={isModalVisible}
        onClose={() => setIsModalVisible(false)}
        onConfirm={() => {
          console.log(`${selectedApplicant?.id}번 지원자 합격 로직 실행`);
          setIsModalVisible(false);
        }}
        title='합격 처리'
        confirmText='합격 처리'
        confirmBtnColor='green-text'
        iconBgColor='green-bg'
        icon={
          <Ionicons
            name='checkmark-circle-outline'
            size={28}
            color={COLORS.GREEN.TEXT}
          />
        }
        description={`"${selectedApplicant?.name}"님을\n합격자로 선택하시겠습니까?`}
      />
    </CustomSafeAreaView>
  );
}
