import React, { useState } from "react";
import { Button } from "./ui/Button";
import { Input } from "./ui/Input";
import { Label } from "./ui/Label";
import { Textarea } from "./ui/Textarea";

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
        <Label htmlFor="title">Title</Label>
        <Input
          type="text"
          id="title"
          value={title}
          onChange={(e) => setTitle(e.currentTarget.value)}
          placeholder="Enter idea title"
        />
      </div>

      <div>
        <Label htmlFor="summary">Summary</Label>
        <Input
          id="summary"
          value={summary}
          onChange={(e) => setSummary(e.target.value)}
          placeholder="Enter idea summary"
        />
      </div>

      <div>
        <Label htmlFor="description">Description</Label>
        <Textarea
          id="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Enter idea description"
        />
      </div>

      <div>
        <Label htmlFor="tags">Tags</Label>
        <Input
          id="tags"
          className="w-full rounded-md border border-gray-300 p-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
          value={tags}
          onChange={(e) => setTags(e.target.value)}
          placeholder="Enter tags, comma separated"
        />
      </div>

      <div className="mt-5">
        <Button
          type="submit"
          disabled={isPending}
          variant="primary"
          className="w-full cursor-pointer"
        >
          {isPending ? "Processing" : submitLabel}
        </Button>
      </div>
    </form>
  );
};
