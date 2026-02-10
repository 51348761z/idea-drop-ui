import { createIdea } from "@/api/ideas";
import { useMutation } from "@tanstack/react-query";
import { createFileRoute, useNavigate } from "@tanstack/react-router";
import React, { useState } from "react";

export const Route = createFileRoute("/ideas/new/")({
  component: NewIdeaPage,
});

function NewIdeaPage() {
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [summary, setSummary] = useState("");
  const [description, setDescription] = useState("");
  const [tags, setTags] = useState("");

  const { mutateAsync, isPending } = useMutation({
    mutationFn: createIdea,
    onSuccess: () => {
      navigate({ to: "/ideas" });
    },
  });

  const handleSubmit = async (e: React.SubmitEvent) => {
    e.preventDefault();

    if (!title.trim() || !summary.trim() || !description.trim()) {
      alert("Please fill in all fields");
      return;
    }

    try {
      await mutateAsync({
        title,
        summary,
        description,
        tags: tags
          .split(",")
          .map((tag) => tag.trim())
          .filter((tag) => tag !== ""),
      });
    } catch (error) {
      console.error(error);
      alert("Something went wrong");
    }
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
            className="w-full rounded-md border border-gray-300 p-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
            placeholder="Enter idea tags, comma separated"
            onChange={(e) => setTags(e.currentTarget.value)}
          />
        </div>

        <div className="mt-5">
          <button
            type="submit"
            disabled={isPending}
            className="block w-full rounded-md bg-blue-600 px-6 py-2 font-semibold text-white capitalize transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-50"
          >
            {isPending ? "creating..." : "create idea"}
          </button>
        </div>
      </form>
    </div>
  );
}
