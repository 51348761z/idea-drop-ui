import { api } from "@/lib/axios";
import type { Idea, IdeaInput } from "@/types";

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
    createdAt: new Date().toISOString(),
  });
  return res.data;
};

export const deleteIdeaApi = async (ideaId: string) => {
  await api.delete(`/ideas/${ideaId}`);
};

export const updateIdeaApi = async (ideaId: string, newIdea: IdeaInput) => {
  const res = await api.put(`/ideas/${ideaId}`, newIdea);
  return res.data;
};
