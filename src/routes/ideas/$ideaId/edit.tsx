import { fetchIdeaById, updateIdea } from "@/api/ideas";
import {
  queryOptions,
  useMutation,
  useSuspenseQuery,
} from "@tanstack/react-query";
import { createFileRoute, useNavigate } from "@tanstack/react-router";
import React, { useState } from "react";

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

  const [title, setTitle] = useState(idea.title);
  const [summary, setSummary] = useState(idea.summary);
  const [description, setDescription] = useState(idea.description);
  const [tags, setTags] = useState(idea.tags.join(", "));

  const { mutateAsync, isPending } = useMutation({
    mutationFn: () =>
      updateIdea(ideaId, {
        title,
        summary,
        description,
        tags: tags
          .split(",")
          .map((tag) => tag.trim())
          .filter(Boolean),
      }),
    onSuccess: () => navigate({ to: "/ideas/$ideaId", params: { ideaId } }),
  });

  const handleSubmit = async (e: React.SubmitEvent) => {
    e.preventDefault();
    await mutateAsync();
  };

  return (
    <div className="space-y-6">
      <h1 className="mb-6 text-3xl font-bold capitalize">create new idea</h1>
      <form onSubmit={handleSubmit} className="space-y-2">
        <div>
          <label
            htmlFor="title"
            className="mb-1 block font-medium text-gray-700"
          >
            Title
          </label>
          <input
            type="text"
            id="title"
            value={title}
            className="w-full rounded-md border border-gray-300 p-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
            placeholder="Enter idea title"
            onChange={(e) => setTitle(e.currentTarget.value)}
          />
        </div>

        <div>
          <label
            htmlFor="summary"
            className="mb-1 block font-medium text-gray-700"
          >
            Summary
          </label>
          <input
            type="text"
            id="summary"
            value={summary}
            className="w-full rounded-md border border-gray-300 p-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
            placeholder="Enter idea summary"
            onChange={(e) => setSummary(e.currentTarget.value)}
          />
        </div>

        <div>
          <label
            htmlFor="description"
            className="mb-1 block font-medium text-gray-700"
          >
            Description
          </label>
          <textarea
            id="description"
            value={description}
            className="h-40 w-full rounded-md border border-gray-300 p-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
            placeholder="Enter idea description"
            onChange={(e) => setDescription(e.currentTarget.value)}
          />
        </div>

        <div>
          <label
            htmlFor="tags"
            className="mb-1 block font-medium text-gray-700"
          >
            Tags
          </label>
          <input
            type="text"
            id="tags"
            value={tags}
            className="w-full rounded-md border border-gray-300 p-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
            placeholder="Enter idea tags, comma separated"
            onChange={(e) => setTags(e.currentTarget.value)}
          />
        </div>

        <div className="mt-5">
          <button
            type="submit"
            className="block w-full rounded-md bg-blue-600 px-6 py-2 font-semibold text-white capitalize transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-50"
          >
            Update
          </button>
        </div>
      </form>
    </div>
  );
}
