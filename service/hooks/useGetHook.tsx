import { useQuery, UseQueryOptions } from "@tanstack/react-query";
import axiosInstance from "..";

interface UseGETProps<T> {
  apiEndpoint: string;
  queryParams?: Record<string, any>;
  options?: Omit<UseQueryOptions<T>, "queryKey" | "queryFn">;
}

export function useGetData<T = unknown>({
  apiEndpoint,
  queryParams = {},
  options,
}: UseGETProps<T>) {
  const queryKey = [apiEndpoint, queryParams];

  const fetchApiData = async (): Promise<T> => {
    const response = await axiosInstance.get(apiEndpoint, {
      params: queryParams,
    });
    return response.data;
  };

  return useQuery<T>({
    queryKey,
    queryFn: fetchApiData,
    ...options, // allows caller to override (enabled, staleTime, retry, etc.)
  });
}
