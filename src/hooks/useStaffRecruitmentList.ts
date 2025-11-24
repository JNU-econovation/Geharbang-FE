import { getStaffRecruitmentList } from '@/src/services/api/step/staffRecruitment';
import {
  FilterOption,
  FilterState,
  StaffRecruitmentPost,
} from '@/src/types/step/types';
import { SORT_OPTIONS } from '@/src/utils/constants/filterOptions';
import { useCallback, useEffect, useRef, useState } from 'react';

interface UseStaffRecruitmentListParams {
  keyword: string;
  sort: FilterOption;
  filters: FilterState;
  pageNumber?: number;
}

interface UseStaffRecruitmentListReturn {
  data: StaffRecruitmentPost[];
  isLoading: boolean;
  error: string | null;
  refetch: () => void;
}

export function useStaffRecruitmentList({
  keyword,
  sort,
  filters,
  pageNumber = 0,
}: UseStaffRecruitmentListParams): UseStaffRecruitmentListReturn {
  const [data, setData] = useState<StaffRecruitmentPost[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [debouncedKeyword, setDebouncedKeyword] = useState(keyword);
  const debounceTimerRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (debounceTimerRef.current) {
      clearTimeout(debounceTimerRef.current);
    }

    debounceTimerRef.current = setTimeout(() => {
      setDebouncedKeyword(keyword);
    }, 500);

    return () => {
      if (debounceTimerRef.current) {
        clearTimeout(debounceTimerRef.current);
      }
    };
  }, [keyword]);

  const fetchData = useCallback(async () => {
    setIsLoading(true);
    setError(null);

    try {
      const params = {
        keyword: debouncedKeyword || undefined,
        sort: SORT_OPTIONS[sort],
        region: filters.region.length > 0 ? filters.region : undefined,
        period: filters.period.length > 0 ? filters.period : undefined,
        workScheduleType:
          filters.workScheduleType.length > 0
            ? filters.workScheduleType
            : undefined,
        gender: filters.gender || undefined,
        pageNumber,
      };

      console.log('API Request Params:', params);

      const response = await getStaffRecruitmentList(params);

      console.log('API Response:', response);
      console.log('Staff Recruitment Posts:', response.staffRecruitmentPosts);
      console.log('Posts Length:', response.staffRecruitmentPosts?.length);

      setData(response.staffRecruitmentPosts);
    } catch (err: any) {
      console.error('API Error:', err);

      let errorMessage = '데이터를 불러오는데 실패했습니다.';

      // Axios 에러인 경우
      if (err.response) {
        const status = err.response.status;
        const data = err.response.data;

        // 서버 응답 에러 메시지가 있으면 사용
        if (data?.message) {
          errorMessage = `[${status}] ${data.message}`;
        } else if (data?.error) {
          errorMessage = `[${status}] ${data.error}`;
        } else {
          errorMessage = `[${status}] 서버 오류가 발생했습니다.`;
        }
      } else if (err.request) {
        // 요청은 보냈지만 응답이 없는 경우
        errorMessage = '서버로부터 응답이 없습니다. 네트워크를 확인해주세요.';
      } else if (err instanceof Error) {
        // 기타 에러
        errorMessage = err.message;
      }

      setError(errorMessage);
      setData([]);
    } finally {
      setIsLoading(false);
    }
  }, [debouncedKeyword, sort, filters, pageNumber]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return {
    data,
    isLoading,
    error,
    refetch: fetchData,
  };
}
