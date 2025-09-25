import { useMutation, useQueryClient } from "@tanstack/react-query";

type RequestType = any; // Replace with your request type if needed
type ResponseType = any; // Replace with your response type if needed

export const useCreateProject = () => {
  const queryClient = useQueryClient();

  const mutation = useMutation<ResponseType, Error, RequestType>({
    mutationFn: async (json) => {
      const response = await fetch("/api/projects", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(json),
      });

      if (!response.ok) {
        throw new Error("Something went wrong");
      }

      return await response.json();
    },
    onSuccess: () => {
      // Remove toast, just refresh project queries
      queryClient.invalidateQueries({ queryKey: ["projects"] });
    },
    onError: (error) => {
      console.error("Failed to create project:", error.message);
    },
  });

  return mutation;
};

