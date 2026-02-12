import { IdeaCard } from "@/components/IdeaCard";
import { ideasQueryOptions, useIdeas } from "@/hooks/ideas";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/ideas/")({
  head: () => ({
    meta: [
      {
        title: "IdeaHub - Browse Ideas",
      },
    ],
  }),
  component: IdeaPage,
  loader: ({ context: { queryClient } }) =>
    queryClient.ensureQueryData(ideasQueryOptions()),
});

function IdeaPage() {
  const { data } = useIdeas();
  const ideas = [...data].sort(
    (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
  );
  return (
    <div className="p-4">
      <h1 className="mb-4 text-2xl font-bold">Ideas</h1>
      <ul className="grid grid-cols-1 gap-6 sm:grid-cols-2">
        {ideas.map((idea) => (
          <IdeaCard key={idea._id} idea={idea} />
        ))}
      </ul>
    </div>
  );
}
