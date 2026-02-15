export const ideaKeys = {
  all: ["ideas"] as const,
  lists: (limit?: number) => [...ideaKeys.all, "list", { limit }] as const,
  detail: (id: string) => [...ideaKeys.all, "detail", id] as const,
};
