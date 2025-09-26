import { toast } from "sonner";
import { useMutation, useQueryClient } from "@tanstack/react-query";

type ResponseType = any; // Adjust to your API response
type RequestType = { id: string };

export const useDeleteProject = () => {
  const queryClient = useQueryClient();

  const mutation = useMutation<ResponseType, Error, RequestType>({
    mutationFn: async ({ id }) => {
      const response = await fetch(`/api/projects/${id}`, { method: "DELETE" });
      if (!response.ok) {
        throw new Error("Failed to delete project");
      }
      return await response.json();
    },
    onSuccess: (data: any) => {
      queryClient.invalidateQueries({ queryKey: ["projects"] });
      if (data?.data?.id) {
        queryClient.invalidateQueries({ queryKey: ["project", { id: data.data.id }] });
      }
    },
    onError: () => {
      toast.error("Failed to delete project");
    },
  });

  return mutation;
};
