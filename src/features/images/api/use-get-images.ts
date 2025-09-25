import { useQuery } from "@tanstack/react-query";



export const useGetImages = () => {
  const query = useQuery({
    queryKey: ["images"],
    queryFn: async () => {
  

      return [];
    },
  });

  return query;
};
