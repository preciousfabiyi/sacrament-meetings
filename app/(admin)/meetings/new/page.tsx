import Link from "next/link";
import MeetingForm from "@/components/MeetingForm";
import { createMeetingAction } from "@/lib/actions";

export default function NewMeetingPage() {
  return (
    <section className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-blue-900">
          Create Sacrament Meeting
        </h2>
        <p className="mt-2 text-gray-600">
          Complete the details below to create a meeting program.
        </p>
      </div>

      <MeetingForm action={createMeetingAction} />

      <Link
        href="/meetings"
        className="inline-block text-blue-900 underline"
      >
        Cancel and return to meetings
      </Link>
    </section>
  );
}
