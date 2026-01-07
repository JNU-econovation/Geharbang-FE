import { getGuestHousePostList } from "@/src/services/guestHouse/guestHouseList";
import {
  FilterOption,
  FilterState,
  GuestHousePost,
  GuestHousePostParams,
  PAGE_SIZE,
} from "@/src/types/models/guestHouse/types";
import { getApiErrorMessage } from "@/src/utils/api/errorHandler";
import { SORT_OPTIONS } from "@/src/utils/constants/filterOptions";
import { useCallback, useEffect, useRef, useState } from "react";
import { useDebounce } from "../useDebounce";

interface UseGuestHouseListParams {
  keyword: string;
  sort: FilterOption;
  filters: FilterState;
}

interface UseGuestHouseListReturn {
  data: GuestHousePost[];
  isLoading: boolean;
  isLoadingMore: boolean;
  error: string | null;
  hasMore: boolean;
  loadMore: () => void;
  refetch: () => void;
}

export function useGuestHouseList({
  keyword,
  sort,
  filters,
}: UseGuestHouseListParams): UseGuestHouseListReturn {
  const [data, setData] = useState<GuestHousePost[]>([]);
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
        const params: GuestHousePostParams = {
          keyword: debouncedKeyword || undefined,
          sort: SORT_OPTIONS[sort],
          region: filters.region.length > 0 ? filters.region : undefined,
          lowestRoomPrice: filters.lowestRoomPrice || undefined,
          highestRoomPrice: filters.highestRoomPrice || undefined,
          moods: filters.moods.length > 0 ? filters.moods : undefined,
          partyType:
            filters.partyType.length > 0 ? filters.partyType : undefined,
          roomType: filters.roomType.length > 0 ? filters.roomType : undefined,
          headCountType:
            filters.headCountType.length > 0
              ? filters.headCountType
              : undefined,
          amenities:
            filters.amenities.length > 0 ? filters.amenities : undefined,
          pageNumber,
        };

        const response = await getGuestHousePostList(params);

        if (isLoadMore) {
          setData((prev) => [...prev, ...response.guestHousePosts]);
        } else {
          setData(response.guestHousePosts);
        }

        if (response.hasNext !== undefined) {
          setHasMore(response.hasNext);
        } else {
          setHasMore(response.guestHousePosts.length === PAGE_SIZE);
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
    fetchData(page, false);
  }, [fetchData, page]);

  const loadMore = useCallback(() => {
    if (!hasMore || isLoading || isLoadingMore) {
      return;
    }
    const nextPage = page + 1;
    setPage(nextPage);
  }, [hasMore, isLoading, isLoadingMore, page]);

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
