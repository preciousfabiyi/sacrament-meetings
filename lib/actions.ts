"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { meetingSchema } from "@/lib/meeting-schema";
import {
  createMeeting,
  updateMeeting,
  deleteMeeting,
} from "@/lib/meetings-db";
import type { SacramentMeeting } from "@/lib/types";

export type MeetingActionState = {
  errors?: Record<string, string[]>;
  message?: string;
};

function getFormValues(formData: FormData) {
  const parsed = meetingSchema.safeParse({
    date: formData.get("date"),
    meetingType: formData.get("meetingType"),
    presiding: formData.get("presiding"),
    conducting: formData.get("conducting"),
    announcements: formData.get("announcements") ?? "",
    openingHymnNumber: formData.get("openingHymnNumber"),
    openingHymnTitle: formData.get("openingHymnTitle"),
    openingPrayer: formData.get("openingPrayer"),
    wardBusiness: formData.get("wardBusiness") ?? "",
    stakeBusiness: formData.get("stakeBusiness") === "on",
    sacramentHymnNumber: formData.get("sacramentHymnNumber"),
    sacramentHymnTitle: formData.get("sacramentHymnTitle"),
    speakers: formData.get("speakers") ?? "",
    closingHymnNumber: formData.get("closingHymnNumber"),
    closingHymnTitle: formData.get("closingHymnTitle"),
    closingPrayer: formData.get("closingPrayer"),
  });

  if (!parsed.success) {
    return {
      success: false as const,
      errors: parsed.error.flatten().fieldErrors,
    };
  }

  const data = parsed.data;

  const meeting: Omit<SacramentMeeting, "id"> = {
    date: data.date,
    meetingType: data.meetingType,
    presiding: data.presiding,
    conducting: data.conducting,
    announcements: data.announcements
      .split("\n")
      .map((item) => item.trim())
      .filter(Boolean),
    openingHymn: {
      number: data.openingHymnNumber,
      title: data.openingHymnTitle,
    },
    openingPrayer: data.openingPrayer,
    wardBusiness: data.wardBusiness
      .split("\n")
      .map((description) => description.trim())
      .filter(Boolean)
      .map((description) => ({ description })),
    stakeBusiness: data.stakeBusiness,
    sacramentHymn: {
      number: data.sacramentHymnNumber,
      title: data.sacramentHymnTitle,
    },
    speakers: data.speakers
      .split("\n")
      .map((line) => line.trim())
      .filter(Boolean)
      .map((line) => {
        const [name, ...topicParts] = line.split("|");
        const topic = topicParts.join("|").trim();

        return {
          name: name.trim(),
          topic,
          type: "speaker" as const,
        };
      }),
    closingHymn: {
      number: data.closingHymnNumber,
      title: data.closingHymnTitle,
    },
    closingPrayer: data.closingPrayer,
  };

  return { success: true as const, meeting };
}

export async function createMeetingAction(
  _previousState: MeetingActionState,
  formData: FormData
): Promise<MeetingActionState> {
  const result = getFormValues(formData);

  if (!result.success) {
    return {
      errors: result.errors,
      message: "Please correct the errors below.",
    };
  }

  try {
    await createMeeting({
      ...result.meeting,
      id: 0,
    });
  } catch {
    return {
      message: "Unable to create the meeting. Check whether that date is already in use.",
    };
  }

  revalidatePath("/meetings");
  redirect("/meetings");
}

export async function updateMeetingAction(
  id: number,
  _previousState: MeetingActionState,
  formData: FormData
): Promise<MeetingActionState> {
  const result = getFormValues(formData);

  if (!result.success) {
    return {
      errors: result.errors,
      message: "Please correct the errors below.",
    };
  }

  try {
    const updated = await updateMeeting(id, {
      ...result.meeting,
      id,
    });

    if (!updated) {
      return { message: "Meeting not found." };
    }
  } catch {
    return {
      message: "Unable to update the meeting. Check whether that date is already in use.",
    };
  }

  revalidatePath("/meetings");
  revalidatePath(`/meetings/${id}`);
  redirect("/meetings");
}

export async function deleteMeetingAction(formData: FormData) {
  const id = Number(formData.get("id"));

  if (!Number.isInteger(id) || id <= 0) {
    throw new Error("Invalid meeting ID.");
  }

  const deleted = await deleteMeeting(id);

  if (!deleted) {
    throw new Error("Meeting not found.");
  }

  revalidatePath("/meetings");
  redirect("/meetings");
}
