import { toast } from "sonner";
import { useMutation, useQueryClient } from "@tanstack/react-query";

type ResponseType = any; // adjust based on your API
type RequestType = any; // adjust based on your API

export const useUpdateProject = (id: string) => {
  const queryClient = useQueryClient();

  const mutation = useMutation<ResponseType, Error, RequestType>({
    mutationKey: ["project", { id }],
    mutationFn: async (json) => {
      // Handle read-only templates as no-op
      if (id?.startsWith("template-")) {
        return {} as ResponseType;
      }

      // Replace with your API URL
      const response = await fetch(`/api/projects/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(json),
      });

      if (!response.ok) {
        throw new Error("Failed to update project");
      }

      return response.json();
    },
    onSuccess: () => {
      if (!id?.startsWith("template-")) {
        queryClient.invalidateQueries({ queryKey: ["projects"] });
        queryClient.invalidateQueries({ queryKey: ["project", { id }] });
      }
    },
    onError: () => {
      if (!id?.startsWith("template-")) {
        toast.error("Failed to update project");
      }
    },
  });

  return mutation;
};

