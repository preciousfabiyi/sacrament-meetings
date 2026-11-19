import Link from "next/link";

export default function Pagination({
  totalPages,
  currentPage,
  query,
}: {
  totalPages: number;
  currentPage: number;
  query: string;
}) {
  const href = (page: number) => {
    const params = new URLSearchParams();
    if (query) params.set("query", query);
    params.set("page", String(page));
    return `/meetings?${params.toString()}`;
  };

  return (
    <nav aria-label="Meeting pages" className="flex items-center justify-between gap-4">
      {currentPage > 1 ? (
        <Link className="rounded border px-4 py-2" href={href(currentPage - 1)}>Previous</Link>
      ) : <span />}
      <span>Page {currentPage} of {totalPages}</span>
      {currentPage < totalPages ? (
        <Link className="rounded border px-4 py-2" href={href(currentPage + 1)}>Next</Link>
      ) : <span />}
    </nav>
  );
}
