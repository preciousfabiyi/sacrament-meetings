
import MeetingCard from "@/components/MeetingCard";
import type { SacramentMeeting } from "@/lib/types";

async function getMeetings(): Promise<SacramentMeeting[]> {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000"}/api/meetings`,
    { cache: "no-store" }
  );

  if (!response.ok) {
    throw new Error("Failed to fetch meetings");
  }

  return response.json();
}

export default async function MeetingsPage() {
  const meetings = await getMeetings();

  return (
    <section>
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-blue-900">
          All Sacrament Meetings
        </h1>
        <p className="mt-2 text-gray-600">
          Browse current and past meeting programs.
        </p>
      </div>

      {meetings.length === 0 ? (
        <p>No meetings are available yet.</p>
      ) : (
        <div className="grid gap-6 md:grid-cols-2">
          {meetings.map((meeting) => (
            <MeetingCard key={meeting.id} meeting={meeting} />
          ))}
        </div>
      )}
    </section>
  );
}
