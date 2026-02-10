import { createIdea } from "@/api/ideas";
import { IdeaForm } from "@/components/IdeaForm";
import { useMutation } from "@tanstack/react-query";
import { createFileRoute, useNavigate } from "@tanstack/react-router";

export const Route = createFileRoute("/ideas/new/")({
  component: NewIdeaPage,
});

function NewIdeaPage() {
  const navigate = useNavigate();

  const { mutateAsync, isPending } = useMutation({
    mutationFn: createIdea,
    onSuccess: () => {
      navigate({ to: "/ideas" });
    },
  });

  return (
    <div className="space-y-6">
      <h1 className="mb-6 text-3xl font-bold capitalize">create new idea</h1>
      <IdeaForm
        isPending={isPending}
        submitLabel="create idea"
        onSubmit={mutateAsync}
      />
    </div>
  );
}
