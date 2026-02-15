import type { Idea } from "../types";
import { IdeaCard } from "./IdeaCard";

export const IdeasList = ({ ideas }: { ideas: Idea[] }) => {
  return (
    <ul className="grid grid-cols-1 gap-6 sm:grid-cols-2">
      {ideas.map((idea) => (
        <li key={idea._id}>
          <IdeaCard idea={idea} />
        </li>
      ))}
    </ul>
  );
};
