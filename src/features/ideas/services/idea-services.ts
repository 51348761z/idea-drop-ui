import type { Idea, IdeaInput } from "@/features/ideas";
import { api } from "@/utils/axios";

export const fetchIdeasApi = async (limit?: number): Promise<Idea[]> => {
  const res = await api.get("/ideas", {
    params: {
      limit,
    },
  });
  return res.data;
};

export const fetchIdeaByIdApi = async (ideaId: string): Promise<Idea> => {
  const res = await api.get(`/ideas/${ideaId}`);
  return res.data;
};

export const createIdeaApi = async (newIdea: IdeaInput): Promise<Idea> => {
  const res = await api.post("/ideas", {
    ...newIdea,
  });
  return res.data;
};

export const deleteIdeaApi = async (ideaId: string) => {
  await api.delete(`/ideas/${ideaId}`);
};

export const updateIdeaApi = async (
  ideaId: string,
  newIdea: IdeaInput,
): Promise<Idea> => {
  const res = await api.put(`/ideas/${ideaId}`, newIdea);
  return res.data;
};
