"use client";

import type { SacramentMeeting } from "@/lib/types";

export default function MeetingDetail({
  meeting,
}: {
  meeting: SacramentMeeting;
}) {
  const meetingDate = new Date(
    `${meeting.date}T12:00:00`
  ).toLocaleDateString("en", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <article
      id="meeting-program"
      className="mx-auto max-w-3xl rounded-xl border bg-white p-6 shadow-sm sm:p-10"
    >
      <header className="mb-8 border-b pb-6 text-center">
        <h1 className="text-3xl font-bold text-blue-900">
          Sacrament Meeting Program
        </h1>
        <p className="mt-2 text-lg font-semibold">{meetingDate}</p>
        <p className="mt-1 capitalize text-gray-600">
          {meeting.meetingType} Meeting
        </p>
        <p className="mt-3 text-sm text-gray-600">
          Presiding: {meeting.presiding}
        </p>
        <p className="text-sm text-gray-600">
          Conducting: {meeting.conducting}
        </p>
      </header>

      {meeting.announcements &&
        meeting.announcements.length > 0 && (
          <section className="mb-6">
            <h2 className="mb-2 text-lg font-bold text-blue-900">
              Announcements
            </h2>
            <ul className="list-disc space-y-1 pl-6">
              {meeting.announcements.map((item, index) => (
                <li key={index}>{item}</li>
              ))}
            </ul>
          </section>
        )}

      <section className="mb-6 space-y-3">
        <h2 className="font-bold text-blue-900">
          Opening Hymn
        </h2>
        <p>
          Hymn {meeting.openingHymn.number}:{" "}
          {meeting.openingHymn.title}
        </p>
        <h2 className="font-bold text-blue-900">
          Opening Prayer
        </h2>
        <p>{meeting.openingPrayer}</p>
      </section>

      <section className="mb-6">
        <h2 className="mb-2 font-bold text-blue-900">
          Ward Business
        </h2>
        {meeting.wardBusiness.length > 0 ? (
          <ul className="list-disc space-y-1 pl-6">
            {meeting.wardBusiness.map((item, index) => (
              <li key={index}>{item.description}</li>
            ))}
          </ul>
        ) : (
          <p>No ward business scheduled.</p>
        )}
        <p className="mt-3">
          <strong>Stake Business:</strong>{" "}
          {meeting.stakeBusiness ? "Yes" : "No"}
        </p>
      </section>

      <section className="mb-6 space-y-3">
        <h2 className="font-bold text-blue-900">
          Sacrament Hymn
        </h2>
        <p>
          Hymn {meeting.sacramentHymn.number}:{" "}
          {meeting.sacramentHymn.title}
        </p>
      </section>

      <section className="mb-6">
        <h2 className="mb-3 font-bold text-blue-900">
          Speakers and Musical Numbers
        </h2>
        <div className="space-y-4">
          {meeting.speakers.map((item, index) => (
            <div key={index}>
              <p className="font-semibold">{item.name}</p>
              <p className="text-sm text-gray-600">
                {item.type === "speaker"
                  ? `Topic: ${item.topic}`
                  : `Musical Number: ${item.topic || "Special musical number"}`}
              </p>
            </div>
          ))}
        </div>
      </section>

      <section className="mb-6 space-y-3">
        <h2 className="font-bold text-blue-900">
          Closing Hymn
        </h2>
        <p>
          Hymn {meeting.closingHymn.number}:{" "}
          {meeting.closingHymn.title}
        </p>
        <h2 className="font-bold text-blue-900">
          Closing Prayer
        </h2>
        <p>{meeting.closingPrayer}</p>
      </section>

      <div className="mt-8 border-t pt-5 print:hidden">
        <button
          type="button"
          onClick={() => window.print()}
          className="rounded-lg bg-blue-900 px-6 py-3 font-semibold text-white hover:bg-blue-800"
        >
          Print Meeting Program
        </button>
      </div>
    </article>
  );
}
