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

export interface User {
  id: string;
  name: string;
  email: string;
}

export interface RegisterInput {
  name: string;
  email: string;
  password: string;
}

export interface LoginInput {
  email: string;
  password: string;
}
