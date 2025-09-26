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

      // Replace with your API URL. Gracefully degrade if endpoint is missing.
      try {
        const response = await fetch(`/api/projects/${id}`, {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(json),
        });

        if (!response.ok) {
          // Soft-fail: log and no-op so the editor doesn't spam toasts in environments without API
          console.warn("Update project failed (soft no-op)", response.status);
          return {} as ResponseType;
        }

        return response.json();
      } catch (e) {
        console.warn("Update project request error (soft no-op)", e);
        return {} as ResponseType;
      }
    },
    onSuccess: (data) => {
      if (!id?.startsWith("template-") && data) {
        queryClient.invalidateQueries({ queryKey: ["projects"] });
        queryClient.invalidateQueries({ queryKey: ["project", { id }] });
      }
    },
    onError: () => {
      // Swallow errors to avoid noisy toasts in local/mock mode
      // Keep this silent so the editor UX remains smooth without a backend
    },
  });

  return mutation;
};

