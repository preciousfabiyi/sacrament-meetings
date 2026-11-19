
import Link from "next/link";
import type { SacramentMeeting } from "@/lib/types";

export default function MeetingCard({
  meeting,
}: {
  meeting: SacramentMeeting;
}) {
  return (
    <article className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm transition hover:shadow-md">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <h2 className="text-xl font-bold text-gray-900">
          {new Date(`${meeting.date}T12:00:00`).toLocaleDateString(
            "en",
            {
              weekday: "long",
              year: "numeric",
              month: "long",
              day: "numeric",
            }
          )}
        </h2>

        <span className="rounded-full bg-blue-100 px-3 py-1 text-sm capitalize text-blue-900">
          {meeting.meetingType} Meeting
        </span>
      </div>

      <div className="mt-4 space-y-2 text-gray-700">
        <p>
          <strong>Presiding:</strong> {meeting.presiding}
        </p>
        <p>
          <strong>Conducting:</strong> {meeting.conducting}
        </p>
        <p>
          <strong>Opening Hymn:</strong> {meeting.openingHymn.title}
        </p>
      </div>

      <Link
        href={`/meetings/${meeting.id}`}
        className="mt-5 inline-block rounded-lg bg-blue-900 px-5 py-2 text-sm font-semibold text-white hover:bg-blue-800"
      >
        View Meeting Details
      </Link>
    </article>
  );
}
