import { ErrorMessage } from "@/components/ui/ErrorMessage";
import React, { useState } from "react";
import { Button } from "../../../components/ui/Button";
import { Input } from "../../../components/ui/Input";
import { Label } from "../../../components/ui/Label";
import { Textarea } from "../../../components/ui/Textarea";
import type { IdeaFormValues } from "../types";

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
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = (e: React.SubmitEvent) => {
    e.preventDefault();

    if (!title.trim() || !summary.trim() || !description.trim()) {
      setErrorMessage("Please fill in all required fields.");
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
      {errorMessage && <ErrorMessage message={errorMessage} />}

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
          type="text"
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
          type="text"
          id="tags"
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
