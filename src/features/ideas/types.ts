export interface Idea {
  _id: string;
  title: string;
  summary: string;
  description: string;
  tags: string[];
  createdAt: string;
  user: string;
}

export interface IdeaInput {
  title: string;
  summary: string;
  description: string;
  tags: string[];
}

export interface IdeaFormValues {
  title: string;
  summary: string;
  description: string;
  tags: string[];
}
