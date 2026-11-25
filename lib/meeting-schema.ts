import { z } from "zod";

export const meetingSchema = z.object({
  date: z.string().min(1, "Meeting date is required."),
  meetingType: z.enum([
    "testimony",
    "regular",
    "stake",
    "general",
    "special",
  ]),
  presiding: z.string().trim().min(1, "Presiding name is required."),
  conducting: z.string().trim().min(1, "Conducting name is required."),
  announcements: z.string().optional().default(""),
  openingHymnNumber: z.coerce.number().int().positive(
    "Enter a valid opening hymn number."
  ),
  openingHymnTitle: z.string().trim().min(1, "Opening hymn title is required."),
  openingPrayer: z.string().trim().min(1, "Opening prayer is required."),
  wardBusiness: z.string().optional().default(""),
  stakeBusiness: z.boolean(),
  sacramentHymnNumber: z.coerce.number().int().positive(
    "Enter a valid sacrament hymn number."
  ),
  sacramentHymnTitle: z.string().trim().min(1, "Sacrament hymn title is required."),
  speakers: z.string().optional().default(""),
  closingHymnNumber: z.coerce.number().int().positive(
    "Enter a valid closing hymn number."
  ),
  closingHymnTitle: z.string().trim().min(1, "Closing hymn title is required."),
  closingPrayer: z.string().trim().min(1, "Closing prayer is required."),
});

export type MeetingFormData = z.infer<typeof meetingSchema>;
