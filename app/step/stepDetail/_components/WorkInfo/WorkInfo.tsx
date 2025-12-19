import React from "react";
import { View } from "react-native";

import Calendar from "@/public/svgs/StepDetail/calendar.svg";
import Clock from "@/public/svgs/StepDetail/clock.svg";
import WorkBag from "@/public/svgs/StepDetail/workBag.svg";

import TextSize from "@/src/components/ui/TextSize";
import { SetSectionYPositionProps } from "@/src/types/models/stepDetail/SetSectionYPosition";

import SectionYPosition from "../SectionYPosition";
import WorkInfoDetail from "./WorkInfoDetail";

interface Job {
  name: string;
  startTIme: string;
  endTime: string;
  job: string;
  workDays: number;
  restDays: number;
  workType: string;
}

interface WorkInfoProps extends SetSectionYPositionProps {
  workingInfomation?: {
    isStartDateNegotiable: boolean;
    startDate: string;
    workingPeriod: string;
    jobs: Job[];
  };
}

export default function WorkInfo({
  setSectionYPositions,
  workingInfomation,
}: WorkInfoProps) {
  return (
    <SectionYPosition
      section='workInfo'
      content='근무 정보'
      setSectionYPositions={setSectionYPositions}
    >
      <View className='pt-6' />

      <WorkInfoDetail
        icon={<Calendar width={16} height={16} />}
        workInfoTitle='근무 시작일'
      >
        <TextSize
          size={14}
          color='#101828'
          content={workingInfomation?.startDate}
        />
        <View className='pr-2' />
        {workingInfomation?.isStartDateNegotiable && (
          <TextSize size={13} color='#4A5565' content='(협의 가능)' />
        )}
      </WorkInfoDetail>

      <View className='pt-3' />
      <WorkInfoDetail
        icon={<WorkBag width={16} height={16} />}
        workInfoTitle='근무 기간'
      >
        <TextSize
          size={14}
          color='#101828'
          content={workingInfomation?.workingPeriod}
        />
      </WorkInfoDetail>

      <View className='pt-3' />
      <WorkInfoDetail
        icon={<Clock width={16} height={16} />}
        workInfoTitle='근무 시간 및 업무'
        workInfoTime={true}
      >
        {workingInfomation?.jobs.map((job, index) => {
          const startTime = job.startTIme.slice(0, 5);
          const endTime = job.endTime.slice(0, 5);
          return (
            <React.Fragment key={index}>
              <View className='pt-1' />
              <TextSize
                size={15}
                color='#101828'
                content={`${job.name} : ${startTime} ~ ${endTime}`}
              />
              <View className='pt-1' />
              <TextSize
                size={13}
                color='#4A5565'
                content={`업무 : ${job.job}`}
              />
              <View className='pt-1' />
              <TextSize
                size={13}
                color='#4A5565'
                content={`근무일 : ${
                  job.workType === "_7일_기준"
                    ? `주 ${job.workDays}일 근무`
                    : `${job.workDays}일 근무`
                }, 휴무 ${job.restDays}일 `}
              />
              <View className='pt-4' />
            </React.Fragment>
          );
        })}
      </WorkInfoDetail>
    </SectionYPosition>
  );
}
