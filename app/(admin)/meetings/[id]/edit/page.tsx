export const instant = false;

import Link from "next/link";
import { notFound } from "next/navigation";
import MeetingForm from "@/components/MeetingForm";
import { updateMeetingAction } from "@/lib/actions";
import { getMeetingById } from "@/lib/meetings-db";


type PageProps = {
  params: Promise<{ id: string }>;
};

export default async function EditMeetingPage({ params }: PageProps) {
  const { id } = await params;
  const meetingId = Number(id);

  if (!Number.isInteger(meetingId) || meetingId <= 0) {
    notFound();
  }

  const meeting = await getMeetingById(meetingId);

  if (!meeting) {
    notFound();
  }

  const action = updateMeetingAction.bind(null, meetingId);

  return (
    <section className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-blue-900">
          Edit Sacrament Meeting
        </h2>
        <p className="mt-2 text-gray-600">
          Update the meeting information below.
        </p>
      </div>

      <MeetingForm action={action} meeting={meeting} />

      <Link
        href={`/meetings/${meetingId}`}
        className="inline-block text-blue-900 underline"
      >
        Cancel and return to meeting
      </Link>
    </section>
  );
}
