import Link from "next/link";

export default function EditMeetingNotFound() {
  return (
    <main className="mx-auto max-w-2xl space-y-4 rounded-xl border bg-white p-8 text-center">
      <h2 className="text-2xl font-bold text-blue-900">
        Meeting Not Found
      </h2>

      <p className="text-gray-700">
        The meeting you are trying to edit does not exist or may have been removed.
      </p>

      <Link
        href="/meetings"
        className="inline-block rounded-lg bg-blue-900 px-6 py-3 font-semibold text-white hover:bg-blue-800"
      >
        Return to Meetings
      </Link>
    </main>
  );
}
