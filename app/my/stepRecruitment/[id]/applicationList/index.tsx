import { Ionicons } from "@expo/vector-icons";
import { useLocalSearchParams } from "expo-router";
import { useMemo, useState } from "react";
import { ScrollView, View } from "react-native";

import CustomSafeAreaView from "@/src/components/layout/CustomSafeAreaView";
import Flex from "@/src/components/layout/Flex";
import BackArrorHeader from "@/src/components/ui/BackArrowHeader";
import ErrorMessage from "@/src/components/ui/ErrorMessage";
import LoadingSkeleton from "@/src/components/ui/LoadingSkeleton";
import ConfirmModal from "@/src/components/ui/Modal/ConfirmModal";
import TextSize from "@/src/components/ui/TextSize";
import {
  useApplicationPass,
  useGetApplicationList,
} from "@/src/hooks/applicationList/useApplicationList";
import { COLORS } from "@/src/utils/constants/colors";
import ApplicationCard, {
  ApplicationStatusType,
} from "./_components/ApplicationCard";
import ApplicationDashboard from "./_components/ApplicationDashboard";
import ApplicationFilter, { FilterType } from "./_components/ApplicationFilter";

export default function ApplicationList() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const [filter, setFilter] = useState<FilterType>("전체");
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedApplicant, setSelectedApplicant] = useState<{
    id: number;
    name: string;
  } | null>(null);

  const { data, isLoading, isError, refetch } = useGetApplicationList(id);
  console.log(data);
  const { title = "", submittedApplications = [] } = data || {};

  const { mutate: passApplicaion } = useApplicationPass();

  const counts = useMemo(() => {
    return {
      all: submittedApplications.length,
      pending: submittedApplications.filter(
        (app) => app.applicationStatus === "대기중",
      ).length,
      passed: submittedApplications.filter(
        (app) => app.applicationStatus === "합격",
      ).length,
    };
  }, [submittedApplications]);

  const filteredData = useMemo(() => {
    if (filter === "전체") return submittedApplications;

    return submittedApplications.filter(
      (item) => item.applicationStatus === filter,
    );
  }, [filter, submittedApplications]);

  const handlePassPress = (id: number, name: string) => {
    setSelectedApplicant({ id, name });
    setIsModalVisible(true);
  };

  const handleConfirmPass = () => {
    if (selectedApplicant) {
      passApplicaion(selectedApplicant.id, {
        onSuccess: () => {
          setIsModalVisible(false);
        },
      });
    }
  };

  return (
    <CustomSafeAreaView pageColor='bg-white'>
      <View className='pl-3 py-3'>
        <BackArrorHeader content='받은 지원서' />
      </View>
      {isLoading ? (
        <LoadingSkeleton />
      ) : isError ? (
        <ErrorMessage onRetry={refetch} />
      ) : submittedApplications.length === 0 ? (
        <View className='py-2'>
          <TextSize
            size={14}
            color={COLORS.GRAY.TEXT}
            content='아직 해당 공고에 지원한 지원자가 없어요.'
            align='center'
          />
        </View>
      ) : (
        <>
          <View className='pt-1 pb-3'>
            <Flex dir='row' items='center' justify='center' gap={5}>
              <Ionicons
                name='reader-outline'
                color={COLORS.PRIMARY.BLUE}
                size={14}
              />
              <TextSize
                size={14}
                color={COLORS.GRAY.TEXT}
                content={title}
                align='center'
              />
            </Flex>
          </View>

          <ApplicationDashboard
            all={counts.all}
            pending={counts.pending}
            passed={counts.passed}
          />
          <ApplicationFilter
            currentFilter={filter}
            onFilterChange={setFilter}
          />

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
            onConfirm={handleConfirmPass}
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
        </>
      )}
    </CustomSafeAreaView>
  );
}
