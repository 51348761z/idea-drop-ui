import { IdeaForm } from "@/components/IdeaForm";
import {
  singleIdeaQueryOptions,
  useSingleIdea,
  useUpdateIdea,
} from "@/hooks/ideas";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/ideas/$ideaId/edit")({
  component: IdeaEditPage,
  loader: async ({ params, context: { queryClient } }) =>
    queryClient.ensureQueryData(singleIdeaQueryOptions(params.ideaId)),
});

function IdeaEditPage() {
  const { ideaId } = Route.useParams();
  const { data: idea } = useSingleIdea(ideaId);
  const { mutateAsync, isPending } = useUpdateIdea(ideaId);

  return (
    <div className="space-y-6">
      <h1 className="mb-6 text-3xl font-bold capitalize">edit idea</h1>
      <IdeaForm
        defaultValues={idea}
        isPending={isPending}
        submitLabel="update data"
        onSubmit={mutateAsync}
      />
    </div>
  );
}
