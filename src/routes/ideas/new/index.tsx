import { IdeaForm } from "@/components/IdeaForm";
import { useCreateIdea } from "@/hooks/ideas";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/ideas/new/")({
  component: NewIdeaPage,
});

function NewIdeaPage() {
  const { mutateAsync, isPending } = useCreateIdea();

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
