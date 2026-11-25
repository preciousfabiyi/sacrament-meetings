import Link from "next/link";
import MeetingCard from "@/components/MeetingCard";
import MeetingSearch from "@/components/MeetingSearch";
import Pagination from "@/components/Pagination";
import { getMeetings, getMeetingsTotalPages } from "@/lib/meetings-db";

type PageProps = {
  searchParams: Promise<{ query?: string; page?: string }>;
};

export default async function MeetingsPage({ searchParams }: PageProps) {
  const params = await searchParams;
  const query = params.query ?? "";
  const currentPage = Math.max(1, Number(params.page) || 1);

  const [meetings, totalPages] = await Promise.all([
    getMeetings(query, currentPage),
    getMeetingsTotalPages(query),
  ]);

  return (
    <section className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <h1 className="text-3xl font-bold">Sacrament Meetings</h1>
        <Link
          href="/meetings/new"
          className="rounded-lg bg-blue-900 px-5 py-3 font-semibold text-white hover:bg-blue-800"
        >
          Create Meeting
        </Link>
      </div>
      <MeetingSearch />
      {meetings.length === 0 ? (
        <p>No meetings found. Try another search.</p>
      ) : (
        <div className="grid gap-4">
          {meetings.map((meeting) => <MeetingCard key={meeting.id} meeting={meeting} />)}
        </div>
      )}
      <Pagination totalPages={totalPages} currentPage={currentPage} query={query} />
    </section>
  );
}
