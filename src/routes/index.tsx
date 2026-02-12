import { IdeaCard } from "@/components/IdeaCard";
import { ideasQueryOptions, useIdeas } from "@/hooks/ideas";
import { createFileRoute } from "@tanstack/react-router";
import { Lightbulb } from "lucide-react";

export const Route = createFileRoute("/")({
  component: HomePage,
  loader: ({ context }) =>
    context.queryClient.ensureQueryData(ideasQueryOptions(3)),
});

function HomePage() {
  const { data: ideas } = useIdeas(3);

  return (
    <div className="flex flex-col items-start justify-between gap-10 p-6 text-blue-600 md:flex-row">
      <div className="flex flex-col items-start gap-4">
        <Lightbulb className="h-16 w-16 text-yellow-400" />
        <h1 className="text-4xl font-bold text-gray-800">
          Welcome to IdeaDrop
        </h1>
        <p className="max-w-xs text-gray-600">
          Share, explore, and collaborate on ideas with our vibrant community.
          Drop your ideas, get feedback, and turn them into reality!
        </p>
      </div>

      <section className="flex-1">
        <h2 className="mb-4 text-2xl font-semibold text-gray-800">
          Latest Ideas
        </h2>
        <div className="space-y-6">
          {ideas.map((idea) => (
            <IdeaCard key={idea._id} idea={idea} button={false} />
          ))}
        </div>
      </section>
    </div>
  );
}
