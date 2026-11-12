
import MeetingCard from "@/components/MeetingCard";
import { getMeetings } from "@/lib/meetings-db";

export default function MeetingsPage() {
  const meetings = getMeetings();

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