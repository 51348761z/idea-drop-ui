import { api } from "@/lib/axios";
import type { Idea } from "@/types";

export const fetchIdeasApi = async (): Promise<Idea[]> => {
  const res = await api.get("/ideas");
  return res.data;
};

export const fetchIdeaByIdApi = async (ideaId: string): Promise<Idea> => {
  const res = await api.get(`ideas/${ideaId}`);
  return res.data;
};

export const createIdeaApi = async (newIdea: {
  title: string;
  summary: string;
  description: string;
  tags: string[];
}): Promise<Idea> => {
  const res = await api.post("/ideas", {
    ...newIdea,
    createdAt: new Date().toISOString(),
  });
  return res.data;
};

export const deleteIdeaApi = async (ideaId: string) => {
  await api.delete(`/ideas/${ideaId}`);
};

export const updateIdeaApi = async (
  ideaId: string,
  newIdea: {
    title: string;
    summary: string;
    description: string;
    tags: string[];
  },
) => {
  const res = await api.put(`/ideas/${ideaId}`, {
    ...newIdea,
    createdAt: new Date().toISOString(),
  });
  return res.data;
};
