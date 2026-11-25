"use client";

import Link from "next/link";

export default function MeetingError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <main className="mx-auto max-w-2xl space-y-5 rounded-xl border bg-white p-8 text-center">
      <h2 className="text-2xl font-bold text-red-800">
        Something went wrong
      </h2>

      <p className="text-gray-700">
        We could not load the meeting information. Please try again.
      </p>

      {error.digest && (
        <p className="text-sm text-gray-500">
          Error reference: {error.digest}
        </p>
      )}

      <div className="flex flex-wrap justify-center gap-3">
        <button
          type="button"
          onClick={() => reset()}
          className="rounded-lg bg-blue-900 px-6 py-3 font-semibold text-white hover:bg-blue-800"
        >
          Try Again
        </button>

        <Link
          href="/meetings"
          className="rounded-lg border border-blue-900 px-6 py-3 font-semibold text-blue-900 hover:bg-blue-50"
        >
          Back to Meetings
        </Link>
      </div>
    </main>
  );
}
