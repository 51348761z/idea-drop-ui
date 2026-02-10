import React, { useState } from "react";

export interface IdeaFormValues {
  title: string;
  summary: string;
  description: string;
  tags: string[];
}

type IdeaFormProps = {
  defaultValues?: IdeaFormValues;
  onSubmit: (values: IdeaFormValues) => void;
  isPending: boolean;
  submitLabel: string;
};

export const IdeaForm = ({
  defaultValues,
  onSubmit,
  isPending,
  submitLabel,
}: IdeaFormProps) => {
  const [title, setTitle] = useState(defaultValues?.title || "");
  const [summary, setSummary] = useState(defaultValues?.summary || "");
  const [description, setDescription] = useState(
    defaultValues?.description || "",
  );
  const [tags, setTags] = useState(defaultValues?.tags.join(", ") || "");

  const handleSubmit = (e: React.SubmitEvent) => {
    e.preventDefault();

    if (!title.trim() || !summary.trim() || !description.trim()) {
      alert("Please fill in all fields");
      return;
    }

    const cleanDetails = {
      title,
      summary,
      description,
      tags: tags
        .split(",")
        .map((t) => t.trim())
        .filter(Boolean),
    };

    onSubmit(cleanDetails);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label htmlFor="title" className="mb-1 block font-medium text-gray-700">
          Title
        </label>
        <input
          type="text"
          id="title"
          className="w-full rounded-md border border-gray-300 p-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
          value={title}
          onChange={(e) => setTitle(e.currentTarget.value)}
          placeholder="Enter idea title"
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
          id="summary"
          className="w-full rounded-md border border-gray-300 p-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
          value={summary}
          onChange={(e) => setSummary(e.target.value)}
          placeholder="Enter idea summary"
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
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Enter idea description"
        />
      </div>

      <div>
        <label htmlFor="tags" className="mb-1 block font-medium text-gray-700">
          Tags
        </label>
        <input
          id="tags"
          className="w-full rounded-md border border-gray-300 p-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
          value={tags}
          onChange={(e) => setTags(e.target.value)}
          placeholder="Enter tags, comma separated"
        />
      </div>

      <div className="mt-5">
        <button
          type="submit"
          disabled={isPending}
          className="block w-full rounded-md bg-blue-600 px-6 py-2 font-semibold text-white capitalize transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-50"
        >
          {isPending ? "Processing" : submitLabel}
        </button>
      </div>
    </form>
  );
};
