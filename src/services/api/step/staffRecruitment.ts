import {
  StaffRecruitmentParams,
  StaffRecruitmentResponse,
} from '@/src/types/step/types';
import { axiosPrivate } from '../customAxios';

export const getStaffRecruitmentList = async (
  params: StaffRecruitmentParams,
): Promise<StaffRecruitmentResponse> => {
  const queryParams = new URLSearchParams();

  if (params.keyword) {
    queryParams.append('keyword', params.keyword);
  }

  if (params.sort) {
    queryParams.append('sort', params.sort);
  }

  if (params.region && params.region.length > 0) {
    params.region.forEach((r) => queryParams.append('region', r));
  }

  if (params.period && params.period.length > 0) {
    params.period.forEach((p) => queryParams.append('period', p));
  }

  if (params.workScheduleType && params.workScheduleType.length > 0) {
    params.workScheduleType.forEach((w) =>
      queryParams.append('workScheduleType', w),
    );
  }

  if (params.gender) {
    queryParams.append('gender', params.gender);
  }

  if (params.pageNumber !== undefined) {
    queryParams.append('pageNumber', params.pageNumber.toString());
  }

  const url = `/api/v1/staff-recruitment?${queryParams.toString()}`;
  console.log('API Request URL:', url);

  const response = await axiosPrivate.get<StaffRecruitmentResponse>(url);

  console.log('Raw API Response:', response);
  console.log('Response Data:', response.data);

  return response.data;
};
