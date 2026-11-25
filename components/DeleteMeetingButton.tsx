"use client";

import { deleteMeetingAction } from "@/lib/actions";

export default function DeleteMeetingButton({
  meetingId,
}: {
  meetingId: number;
}) {
  return (
    <form
      action={deleteMeetingAction}
      onSubmit={(event) => {
        if (!window.confirm("Are you sure you want to delete this meeting?")) {
          event.preventDefault();
        }
      }}
    >
      <input type="hidden" name="id" value={meetingId} />
      <button
        type="submit"
        className="rounded-lg bg-red-700 px-6 py-3 font-semibold text-white hover:bg-red-800"
      >
        Delete Meeting
      </button>
    </form>
  );
}
