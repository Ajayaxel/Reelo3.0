import { useQuery } from "@tanstack/react-query";

export type ResponseType = any; // Adjust to your API response shape
type RequestType = { page: string; limit: string };

export const useGetTemplates = (apiQuery: RequestType) => {
  const query = useQuery({
    queryKey: [
      "templates",
      {
        page: apiQuery.page,
        limit: apiQuery.limit,
      },
    ],
    queryFn: async () => {
      const params = new URLSearchParams({ page: apiQuery.page, limit: apiQuery.limit });
      const response = await fetch(`/api/projects/templates?${params.toString()}`);

      if (!response.ok) {
        throw new Error("Failed to fetch templates");
      }

      const { data } = await response.json();
      return data;
    },
  });

  return query;
};
