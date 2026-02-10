import { fetchIdeaById, updateIdea } from "@/api/ideas";
import { IdeaForm, type IdeaFormValues } from "@/components/IdeaForm";
import {
  queryOptions,
  useMutation,
  useSuspenseQuery,
} from "@tanstack/react-query";
import { createFileRoute, useNavigate } from "@tanstack/react-router";

export const Route = createFileRoute("/ideas/$ideaId/edit")({
  component: IdeaEditPage,
  loader: async ({ params, context: { queryClient } }) =>
    queryClient.ensureQueryData(ideaQueryOptions(params.ideaId)),
});

const ideaQueryOptions = (id: string) =>
  queryOptions({
    queryKey: ["idea", id],
    queryFn: () => fetchIdeaById(id),
  });

function IdeaEditPage() {
  const { ideaId } = Route.useParams();
  const navigate = useNavigate();
  const { data: idea } = useSuspenseQuery(ideaQueryOptions(ideaId));

  const { mutateAsync, isPending } = useMutation({
    mutationFn: (newIdea: IdeaFormValues) => updateIdea(ideaId, newIdea),
    onSuccess: () => navigate({ to: "/ideas/$ideaId", params: { ideaId } }),
  });

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
