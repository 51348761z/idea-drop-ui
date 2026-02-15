import { queryOptions, useSuspenseQuery } from "@tanstack/react-query";
import { ideaKeys } from "../constants/hook-constants";
import { fetchIdeaByIdApi, fetchIdeasApi } from "../services/idea-services";

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
