import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <div className="space-y-12">
      <section className="grid items-center gap-10 rounded-2xl bg-blue-50 p-8 md:grid-cols-2 md:p-12">
        <div>
          <p className="mb-3 font-semibold uppercase tracking-wide text-blue-700">
            Welcome
          </p>

          <h1 className="text-4xl font-bold leading-tight text-blue-950">
            Plan Your Sacrament Meetings with Ease
          </h1>

          <p className="mt-5 leading-7 text-gray-700">
            Organize meeting programs, manage speakers, select hymns, and
            keep your ward meeting information in one convenient place.
          </p>

          <div className="mt-8 flex flex-wrap gap-4">
            <Link
              href="/meetings"
              className="rounded-lg bg-blue-900 px-6 py-3 font-semibold text-white hover:bg-blue-800"
            >
              View All Meetings
            </Link>

            <Link
              href="/meetings/current"
              className="rounded-lg border border-blue-900 px-6 py-3 font-semibold text-blue-900 hover:bg-blue-100"
            >
              Current Meeting
            </Link>
          </div>
        </div>

        <div className="flex justify-center">
          <Image
            src="/meeting-banner.svg"
            alt="Illustration of a church building"
            width={500}
            height={350}
            priority
            className="h-auto w-full max-w-md"
          />
        </div>
      </section>

      <section>
        <h2 className="mb-6 text-2xl font-bold text-blue-950">
          What You Can Do
        </h2>

        <div className="grid gap-6 md:grid-cols-3">
          <article className="rounded-xl border bg-white p-6 shadow-sm">
            <h3 className="text-xl font-semibold text-blue-900">
              Plan Meetings
            </h3>
            <p className="mt-3 leading-7 text-gray-600">
              Organize meeting dates, presiding leaders, conducting leaders,
              and meeting assignments.
            </p>
          </article>

          <article className="rounded-xl border bg-white p-6 shadow-sm">
            <h3 className="text-xl font-semibold text-blue-900">
              Manage Speakers
            </h3>
            <p className="mt-3 leading-7 text-gray-600">
              Keep track of speakers, musical numbers, hymns, and meeting
              prayers.
            </p>
          </article>

          <article className="rounded-xl border bg-white p-6 shadow-sm">
            <h3 className="text-xl font-semibold text-blue-900">
              View Programs
            </h3>
            <p className="mt-3 leading-7 text-gray-600">
              Review meeting programs and print them for easy use during
              sacrament meetings.
            </p>
          </article>
        </div>
      </section>
    </div>
  );
}
