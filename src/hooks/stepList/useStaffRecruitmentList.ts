import { getStaffRecruitmentList } from "@/src/services/step/staffRecruitment";
import {
  FilterState,
  PAGE_SIZE,
  SortOptionKey,
  StaffRecruitmentPost,
} from "@/src/types/models/step/types";
import { getApiErrorMessage } from "@/src/utils/api/errorHandler";
import { SORT_OPTIONS } from "@/src/utils/constants/filterOptions";
import { useCallback, useEffect, useRef, useState } from "react";
import { useDebounce } from "../useDebounce";

interface UseStaffRecruitmentListParams {
  keyword: string;
  sort: SortOptionKey;
  filters: FilterState;
}

interface UseStaffRecruitmentListReturn {
  data: StaffRecruitmentPost[];
  isLoading: boolean;
  isLoadingMore: boolean;
  error: string | null;
  hasMore: boolean;
  loadMore: () => void;
  refetch: () => void;
}

export function useStaffRecruitmentList({
  keyword,
  sort,
  filters,
}: UseStaffRecruitmentListParams): UseStaffRecruitmentListReturn {
  const [data, setData] = useState<StaffRecruitmentPost[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isLoadingMore, setIsLoadingMore] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [hasMore, setHasMore] = useState(true);
  const [page, setPage] = useState(0);
  const abortControllerRef = useRef<AbortController | null>(null);

  const debouncedKeyword = useDebounce(keyword, 300);

  useEffect(() => {
    setPage(0);
    setHasMore(true);
    setData([]);
  }, [debouncedKeyword, sort, filters]);

  const fetchData = useCallback(
    async (pageNumber: number, isLoadMore: boolean = false) => {
      if (abortControllerRef.current) {
        abortControllerRef.current.abort();
      }

      abortControllerRef.current = new AbortController();

      if (isLoadMore) {
        setIsLoadingMore(true);
      } else {
        setIsLoading(true);
      }
      setError(null);

      try {
        const params = {
          keyword: debouncedKeyword || undefined,
          sort: SORT_OPTIONS.find((option) => option.key === sort)?.value,
          region: filters.region.length > 0 ? filters.region : undefined,
          period: filters.period.length > 0 ? filters.period : undefined,
          workType: filters.workType || undefined,
          workDays: filters.workDays || undefined,
          restDays: filters.restDays || undefined,
          workScheduleType:
            filters.workScheduleType.length > 0
              ? filters.workScheduleType
              : undefined,
          gender: filters.gender || undefined,
          pageNumber,
        };

        const response = await getStaffRecruitmentList(params);

        if (isLoadMore) {
          setData((prev) => [...prev, ...response.staffRecruitmentPosts]);
        } else {
          setData(response.staffRecruitmentPosts);
        }

        // 배열 길이로 hasMore 판단
        if (response.hasNext !== undefined) {
          setHasMore(response.hasNext);
        } else {
          setHasMore(response.staffRecruitmentPosts.length === PAGE_SIZE);
        }
      } catch (err: any) {
        if (err.name === "AbortError" || err.name === "CanceledError") {
          return;
        }

        setError(getApiErrorMessage(err));
        if (!isLoadMore) {
          setData([]);
        }
      } finally {
        if (isLoadMore) {
          setIsLoadingMore(false);
        } else {
          setIsLoading(false);
        }
        abortControllerRef.current = null;
      }
    },
    [debouncedKeyword, sort, filters]
  );

  useEffect(() => {
    fetchData(page, page > 0);
  }, [fetchData, page]);

  const loadMore = useCallback(() => {
    if (!hasMore || isLoading || isLoadingMore) {
      return;
    }
    const nextPage = page + 1;
    setPage(nextPage);
    fetchData(nextPage, true);
  }, [hasMore, isLoading, isLoadingMore, page, fetchData]);

  const refetch = useCallback(() => {
    setPage(0);
    setHasMore(true);
    setData([]);
    fetchData(0, false);
  }, [fetchData]);

  return {
    data,
    isLoading,
    isLoadingMore,
    error,
    hasMore,
    loadMore,
    refetch,
  };
}
