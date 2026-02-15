import {
  IdeaForm,
  singleIdeaQueryOptions,
  useSingleIdea,
  useUpdateIdea,
  type IdeaInput,
} from "@/features/ideas";
import { createFileRoute, useNavigate } from "@tanstack/react-router";

export const Route = createFileRoute("/ideas/$ideaId/edit")({
  component: IdeaEditPage,
  loader: async ({ params, context: { queryClient } }) =>
    queryClient.ensureQueryData(singleIdeaQueryOptions(params.ideaId)),
});

function IdeaEditPage() {
  const navigate = useNavigate();
  const { ideaId } = Route.useParams();
  const { data: idea } = useSingleIdea(ideaId);
  const updateIdeaMutation = useUpdateIdea(ideaId);

  const handleUpdateIdea = (newIdea: IdeaInput) => {
    updateIdeaMutation.mutate(newIdea, {
      onSuccess: () => navigate({ to: "/ideas/$ideaId", params: { ideaId } }),
    });
  };

  return (
    <div className="space-y-6">
      <h1 className="mb-6 text-3xl font-bold capitalize">edit idea</h1>
      <IdeaForm
        defaultValues={idea}
        isPending={updateIdeaMutation.isPending}
        submitLabel="update data"
        onSubmit={handleUpdateIdea}
      />
    </div>
  );
}
