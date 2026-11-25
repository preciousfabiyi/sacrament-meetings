"use client";

import { useActionState } from "react";
import type { SacramentMeeting } from "@/lib/types";
import type { MeetingActionState } from "@/lib/actions";

type MeetingFormProps = {
  action: (
    state: MeetingActionState,
    formData: FormData
  ) => Promise<MeetingActionState>;
  meeting?: SacramentMeeting;
};

const initialState: MeetingActionState = {};

export default function MeetingForm({
  action,
  meeting,
}: MeetingFormProps) {
  const [state, formAction, pending] = useActionState(
    action,
    initialState
  );

  const errors = state.errors ?? {};

  function fieldError(name: string) {
    const message = errors[name]?.[0];

    if (!message) return null;

    return (
      <p
        id={`${name}-error`}
        className="mt-1 text-sm text-red-700"
        aria-live="polite"
      >
        {message}
      </p>
    );
  }

  function errorProps(name: string) {
    return errors[name]
      ? {
          "aria-invalid": true as const,
          "aria-describedby": `${name}-error`,
        }
      : {};
  }

  const inputClass =
    "mt-1 block w-full rounded-lg border border-gray-300 p-3 text-gray-900";

  return (
    <form action={formAction} className="space-y-6">
      {state.message && (
        <p
          role="alert"
          className="rounded-lg bg-red-50 p-3 text-red-800"
        >
          {state.message}
        </p>
      )}

      <section className="space-y-4 rounded-xl border bg-white p-6">
        <h2 className="text-xl font-bold text-blue-900">
          Meeting Information
        </h2>

        <div>
          <label htmlFor="date" className="font-semibold">
            Meeting Date
          </label>
          <input
            id="date"
            name="date"
            type="date"
            defaultValue={meeting?.date ?? ""}
            className={inputClass}
            required
            {...errorProps("date")}
          />
          {fieldError("date")}
        </div>

        <div>
          <label htmlFor="meetingType" className="font-semibold">
            Meeting Type
          </label>
          <select
            id="meetingType"
            name="meetingType"
            defaultValue={meeting?.meetingType ?? "regular"}
            className={inputClass}
          >
            <option value="regular">Regular</option>
            <option value="testimony">Testimony</option>
            <option value="stake">Stake</option>
            <option value="general">General</option>
            <option value="special">Special</option>
          </select>
          {fieldError("meetingType")}
        </div>

        <div>
          <label htmlFor="presiding" className="font-semibold">
            Presiding
          </label>
          <input
            id="presiding"
            name="presiding"
            defaultValue={meeting?.presiding ?? ""}
            className={inputClass}
            required
            {...errorProps("presiding")}
          />
          {fieldError("presiding")}
        </div>

        <div>
          <label htmlFor="conducting" className="font-semibold">
            Conducting
          </label>
          <input
            id="conducting"
            name="conducting"
            defaultValue={meeting?.conducting ?? ""}
            className={inputClass}
            required
            {...errorProps("conducting")}
          />
          {fieldError("conducting")}
        </div>

        <div>
          <label htmlFor="announcements" className="font-semibold">
            Announcements
          </label>
          <textarea
            id="announcements"
            name="announcements"
            rows={3}
            defaultValue={meeting?.announcements?.join("\n") ?? ""}
            placeholder="Enter one announcement per line"
            className={inputClass}
          />
        </div>
      </section>

      <section className="space-y-4 rounded-xl border bg-white p-6">
        <h2 className="text-xl font-bold text-blue-900">
          Opening
        </h2>

        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <label htmlFor="openingHymnNumber" className="font-semibold">
              Opening Hymn Number
            </label>
            <input
              id="openingHymnNumber"
              name="openingHymnNumber"
              type="number"
              min="1"
              defaultValue={meeting?.openingHymn.number ?? ""}
              className={inputClass}
              required
              {...errorProps("openingHymnNumber")}
            />
            {fieldError("openingHymnNumber")}
          </div>

          <div>
            <label htmlFor="openingHymnTitle" className="font-semibold">
              Opening Hymn Title
            </label>
            <input
              id="openingHymnTitle"
              name="openingHymnTitle"
              defaultValue={meeting?.openingHymn.title ?? ""}
              className={inputClass}
              required
              {...errorProps("openingHymnTitle")}
            />
            {fieldError("openingHymnTitle")}
          </div>
        </div>

        <div>
          <label htmlFor="openingPrayer" className="font-semibold">
            Opening Prayer
          </label>
          <input
            id="openingPrayer"
            name="openingPrayer"
            defaultValue={meeting?.openingPrayer ?? ""}
            className={inputClass}
            required
            {...errorProps("openingPrayer")}
          />
          {fieldError("openingPrayer")}
        </div>
      </section>

      <section className="space-y-4 rounded-xl border bg-white p-6">
        <h2 className="text-xl font-bold text-blue-900">
          Ward and Stake Business
        </h2>

        <div>
          <label htmlFor="wardBusiness" className="font-semibold">
            Ward Business
          </label>
          <textarea
            id="wardBusiness"
            name="wardBusiness"
            rows={3}
            defaultValue={
              meeting?.wardBusiness
                .map((item) => item.description)
                .join("\n") ?? ""
            }
            placeholder="Enter one item per line"
            className={inputClass}
          />
        </div>

        <label className="flex items-center gap-3">
          <input
            type="checkbox"
            name="stakeBusiness"
            defaultChecked={meeting?.stakeBusiness ?? false}
            className="h-5 w-5"
          />
          Stake business is scheduled
        </label>
      </section>

      <section className="space-y-4 rounded-xl border bg-white p-6">
        <h2 className="text-xl font-bold text-blue-900">
          Sacrament
        </h2>

        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <label htmlFor="sacramentHymnNumber" className="font-semibold">
              Sacrament Hymn Number
            </label>
            <input
              id="sacramentHymnNumber"
              name="sacramentHymnNumber"
              type="number"
              min="1"
              defaultValue={meeting?.sacramentHymn.number ?? ""}
              className={inputClass}
              required
              {...errorProps("sacramentHymnNumber")}
            />
            {fieldError("sacramentHymnNumber")}
          </div>

          <div>
            <label htmlFor="sacramentHymnTitle" className="font-semibold">
              Sacrament Hymn Title
            </label>
            <input
              id="sacramentHymnTitle"
              name="sacramentHymnTitle"
              defaultValue={meeting?.sacramentHymn.title ?? ""}
              className={inputClass}
              required
              {...errorProps("sacramentHymnTitle")}
            />
            {fieldError("sacramentHymnTitle")}
          </div>
        </div>
      </section>

      <section className="space-y-4 rounded-xl border bg-white p-6">
        <h2 className="text-xl font-bold text-blue-900">
          Speakers and Musical Numbers
        </h2>

        <div>
          <label htmlFor="speakers" className="font-semibold">
            Speakers
          </label>
          <textarea
            id="speakers"
            name="speakers"
            rows={5}
            defaultValue={
              meeting?.speakers
                .map((item) => `${item.name}|${item.topic}`)
                .join("\n") ?? ""
            }
            placeholder={"Enter one per line: Name|Topic"}
            className={inputClass}
          />
          <p className="mt-1 text-sm text-gray-600">
            Use a vertical bar between each speaker&apos;s name and topic.
          </p>
        </div>
      </section>

      <section className="space-y-4 rounded-xl border bg-white p-6">
        <h2 className="text-xl font-bold text-blue-900">
          Closing
        </h2>

        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <label htmlFor="closingHymnNumber" className="font-semibold">
              Closing Hymn Number
            </label>
            <input
              id="closingHymnNumber"
              name="closingHymnNumber"
              type="number"
              min="1"
              defaultValue={meeting?.closingHymn.number ?? ""}
              className={inputClass}
              required
              {...errorProps("closingHymnNumber")}
            />
            {fieldError("closingHymnNumber")}
          </div>

          <div>
            <label htmlFor="closingHymnTitle" className="font-semibold">
              Closing Hymn Title
            </label>
            <input
              id="closingHymnTitle"
              name="closingHymnTitle"
              defaultValue={meeting?.closingHymn.title ?? ""}
              className={inputClass}
              required
              {...errorProps("closingHymnTitle")}
            />
            {fieldError("closingHymnTitle")}
          </div>
        </div>

        <div>
          <label htmlFor="closingPrayer" className="font-semibold">
            Closing Prayer
          </label>
          <input
            id="closingPrayer"
            name="closingPrayer"
            defaultValue={meeting?.closingPrayer ?? ""}
            className={inputClass}
            required
            {...errorProps("closingPrayer")}
          />
          {fieldError("closingPrayer")}
        </div>
      </section>

      <button
        type="submit"
        disabled={pending}
        className="rounded-lg bg-blue-900 px-6 py-3 font-semibold text-white hover:bg-blue-800 disabled:cursor-not-allowed disabled:opacity-60"
      >
        {pending
          ? "Saving..."
          : meeting
            ? "Update Meeting"
            : "Create Meeting"}
      </button>
    </form>
  );
}
