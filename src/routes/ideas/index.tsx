import { Pagination } from "@/components/Pagination";
import { IdeasList, ideasQueryOptions, useIdeas } from "@/features/ideas";
import { usePagination } from "@/hooks/usePagination";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/ideas/")({
  head: () => ({
    meta: [
      {
        title: "IdeaHub - Browse Ideas",
      },
    ],
  }),
  component: IdeaPage,
  loader: ({ context: { queryClient } }) =>
    queryClient.ensureQueryData(ideasQueryOptions()),
});

function IdeaPage() {
  const { data: ideas } = useIdeas();
  const { currentPageData, currentPage, totalPages, jump } = usePagination({
    data: ideas,
    itemsPerPage: 6,
  });

  return (
    <div className="p-4">
      <h1 className="mb-4 text-2xl font-bold">Ideas</h1>
      <IdeasList ideas={currentPageData} />

      {totalPages > 1 && (
        <Pagination
          totalPages={totalPages}
          currentPage={currentPage}
          onPageChange={jump}
        />
      )}
    </div>
  );
}
