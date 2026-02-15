import { IdeaForm, useCreateIdea, type IdeaFormValues } from "@/features/ideas";
import { createFileRoute, useNavigate } from "@tanstack/react-router";

export const Route = createFileRoute("/ideas/new/")({
  component: NewIdeaPage,
});

function NewIdeaPage() {
  const navigate = useNavigate();
  const createIdeaMutation = useCreateIdea();

  const handleCreate = (data: IdeaFormValues) => {
    createIdeaMutation.mutate(data, {
      onSuccess: () => navigate({ to: "/ideas" }),
    });
  };

  return (
    <div className="space-y-6">
      <h1 className="mb-6 text-3xl font-bold capitalize">create new idea</h1>
      <IdeaForm
        isPending={createIdeaMutation.isPending}
        submitLabel="create idea"
        onSubmit={handleCreate}
      />
    </div>
  );
}
