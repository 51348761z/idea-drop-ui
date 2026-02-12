import {
  createIdeaApi,
  deleteIdeaApi,
  fetchIdeaByIdApi,
  fetchIdeasApi,
  updateIdeaApi,
} from "@/api/ideas";
import {
  queryOptions,
  useMutation,
  useQueryClient,
  useSuspenseQuery,
} from "@tanstack/react-query";
import { useNavigate } from "@tanstack/react-router";

const ideaKeys = {
  all: ["ideas"] as const,
  lists: (limit?: number) => [...ideaKeys.all, "list", { limit }] as const,
  detail: (id: string) => [...ideaKeys.all, "detail", id] as const,
};

export const ideasQueryOptions = (limit?: number) =>
  queryOptions({
    queryKey: ideaKeys.lists(limit),
    queryFn: () => fetchIdeasApi(limit),
  });

export const singleIdeaQueryOptions = (id: string) =>
  queryOptions({
    queryKey: ideaKeys.detail(id),
    queryFn: () => fetchIdeaByIdApi(id),
  });

// Custom hooks
export const useIdeas = (limit?: number) => {
  return useSuspenseQuery(ideasQueryOptions(limit));
};

export const useSingleIdea = (id: string) => {
  return useSuspenseQuery(singleIdeaQueryOptions(id));
};

export const useCreateIdea = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: createIdeaApi,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ideaKeys.all });
      navigate({ to: "/ideas" });
    },
  });
};

export const useUpdateIdea = (id: string) => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: Parameters<typeof updateIdeaApi>[1]) =>
      updateIdeaApi(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ideaKeys.all });
      navigate({ to: "/ideas/$ideaId", params: { ideaId: id } });
    },
  });
};

export const useDeleteIdea = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteIdeaApi,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ideaKeys.all });
      navigate({ to: "/ideas" });
    },
  });
};
