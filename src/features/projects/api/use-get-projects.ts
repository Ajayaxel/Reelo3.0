import { useInfiniteQuery } from "@tanstack/react-query";

export type ResponseType = any; // Adjust to your API response shape

export const useGetProjects = () => {
  const query = useInfiniteQuery<ResponseType, Error>({
    initialPageParam: 1,
    getNextPageParam: (lastPage) => lastPage.nextPage,
    queryKey: ["projects"],
    queryFn: async ({ pageParam }) => {
      const page = (pageParam as number).toString();
      const limit = "5";
      const response = await fetch(`/api/projects?page=${encodeURIComponent(page)}&limit=${encodeURIComponent(limit)}`);

      if (!response.ok) {
        throw new Error("Failed to fetch projects");
      }

      return response.json();
    },
  });

  return query;
};
