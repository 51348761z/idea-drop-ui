import { Button } from "@/components/ui/Button";
import { useAuth } from "@/features/auth";
import {
  singleIdeaQueryOptions,
  useDeleteIdea,
  useSingleIdea,
} from "@/features/ideas";

import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";

export const Route = createFileRoute("/ideas/$ideaId/")({
  component: IdeaDetailsPage,
  loader: ({ params, context: { queryClient } }) =>
    queryClient.ensureQueryData(singleIdeaQueryOptions(params.ideaId)),
});

function IdeaDetailsPage() {
  const navigate = useNavigate();
  const { user } = useAuth();
  const { ideaId } = Route.useParams();
  const { data: idea } = useSingleIdea(ideaId);
  const deleteIdeaMutation = useDeleteIdea();

  const handleDelete = async () => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this idea?",
    );
    if (confirmDelete) {
      deleteIdeaMutation.mutate(ideaId, {
        onSuccess: () => navigate({ to: "/ideas" }),
      });
    }
  };

  return (
    <div className="p-4">
      <Link
        to="/ideas"
        className="mb-4 block text-blue-500 capitalize underline"
      >
        Bact To Ideas
      </Link>
      <h2 className="text-2xl font-bold">{idea.title}</h2>
      <p className="mt-2">{idea.description}</p>

      {user && user.id === idea.user && (
        <>
          {/* Edit Link */}
          <Link
            to="/ideas/$ideaId/edit"
            params={{ ideaId }}
            className="mt-4 mr-2 inline-block rounded bg-yellow-500 px-4 py-2 text-sm text-white capitalize transition hover:bg-yellow-600"
          >
            edit
          </Link>

          {/* Delte Button */}
          <Button
            disabled={deleteIdeaMutation.isPending}
            onClick={handleDelete}
            variant="danger"
          >
            {deleteIdeaMutation.isPending ? "deleting" : "delete"}
          </Button>
        </>
      )}
    </div>
  );
}
