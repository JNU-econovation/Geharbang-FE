import { getStaffRecruitmentList } from '@/src/services/api/step/staffRecruitment';
import {
  FilterOption,
  FilterState,
  StaffRecruitmentPost,
} from '@/src/types/step/types';
import { SORT_OPTIONS } from '@/src/utils/constants/filterOptions';
import { useCallback, useEffect, useRef, useState } from 'react';
import { useDebounce } from './useDebounce';

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
  const abortControllerRef = useRef<AbortController | null>(null);

  // 검색어 디바운스 (500ms)
  const debouncedKeyword = useDebounce(keyword, 500);

  const fetchData = useCallback(async () => {
    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
    }

    abortControllerRef.current = new AbortController();

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

      const response = await getStaffRecruitmentList(params);

      setData(response.staffRecruitmentPosts);
    } catch (err: any) {
      if (err.name === 'AbortError' || err.name === 'CanceledError') {
        return;
      }

      let errorMessage = '데이터를 불러오는데 실패했습니다.';

      if (err.response) {
        const status = err.response.status;
        const data = err.response.data;

        if (data?.message) {
          errorMessage = `[${status}] ${data.message}`;
        } else if (data?.error) {
          errorMessage = `[${status}] ${data.error}`;
        } else {
          errorMessage = `[${status}] 서버 오류가 발생했습니다.`;
        }
      } else if (err.request) {
        errorMessage = '서버로부터 응답이 없습니다. 네트워크를 확인해주세요.';
      } else if (err instanceof Error) {
        errorMessage = err.message;
      }

      setError(errorMessage);
      setData([]);
    } finally {
      setIsLoading(false);
      abortControllerRef.current = null;
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
