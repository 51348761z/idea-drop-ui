import { useMutation, useQueryClient } from "@tanstack/react-query";
import { ideaKeys } from "../constants/hook-constants";
import {
  createIdeaApi,
  deleteIdeaApi,
  updateIdeaApi,
} from "../services/idea-services";

export const useCreateIdea = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: createIdeaApi,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ideaKeys.all });
    },
  });
};

export const useUpdateIdea = (id: string) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: Parameters<typeof updateIdeaApi>[1]) =>
      updateIdeaApi(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ideaKeys.all });
      queryClient.invalidateQueries({ queryKey: ideaKeys.detail(id) });
    },
  });
};

export const useDeleteIdea = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteIdeaApi,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ideaKeys.all });
    },
  });
};
