
import { neon } from "@neondatabase/serverless";
import type {
  SacramentMeeting,
  MeetingType,
  Hymn,
  SpeakerItem,
  WardBusinessItem,
} from "./types";

const sql = neon(process.env.DATABASE_URL!);
const PAGE_SIZE = 5;

function mapMeeting(row: Record<string, unknown>): SacramentMeeting {
  return {
    id: Number(row.id),
    date: String(row.date_text),
    meetingType: row.meeting_type as MeetingType,
    presiding: String(row.presiding),
    conducting: String(row.conducting),
    announcements: (row.announcements as string[] | null) ?? [],
    openingHymn: row.opening_hymn as Hymn,
    openingPrayer: String(row.opening_prayer),
    wardBusiness: (row.ward_business as WardBusinessItem[] | null) ?? [],
    stakeBusiness: Boolean(row.stake_business),
    sacramentHymn: row.sacrament_hymn as Hymn,
    speakers: (row.speakers as SpeakerItem[] | null) ?? [],
    closingHymn: row.closing_hymn as Hymn,
    closingPrayer: String(row.closing_prayer),
  };
}

export async function getMeetings(
  query = "",
  page = 1
): Promise<SacramentMeeting[]> {
  const offset = (Math.max(1, page) - 1) * PAGE_SIZE;

  const rows = query.trim()
    ? await sql`
        SELECT *, date::text AS date_text FROM meetings
        WHERE presiding ILIKE ${"%" + query + "%"}
        OR conducting ILIKE ${"%" + query + "%"}
        OR meeting_type ILIKE ${"%" + query + "%"}
        OR speakers::text ILIKE ${"%" + query + "%"}
        ORDER BY date DESC
        LIMIT ${PAGE_SIZE} OFFSET ${offset}
      `
    : await sql`
        SELECT *, date::text AS date_text FROM meetings
        ORDER BY date DESC
        LIMIT ${PAGE_SIZE} OFFSET ${offset}
      `;

  return rows.map(mapMeeting);
}

export async function getMeetingsTotalPages(
  query = ""
): Promise<number> {
  const rows = query.trim()
    ? await sql`
        SELECT COUNT(*) AS total FROM meetings
        WHERE presiding ILIKE ${"%" + query + "%"}
        OR conducting ILIKE ${"%" + query + "%"}
        OR meeting_type ILIKE ${"%" + query + "%"}
        OR speakers::text ILIKE ${"%" + query + "%"}
      `
    : await sql`SELECT COUNT(*) AS total FROM meetings`;

  return Math.max(1, Math.ceil(Number(rows[0].total) / PAGE_SIZE));
}

export async function getMeetingsByDate(
  date: string
): Promise<SacramentMeeting[]> {
  const rows = await sql`
    SELECT *, date::text AS date_text
    FROM meetings
    WHERE date = ${date}
    ORDER BY date
  `;

  return rows.map(mapMeeting);
}

export async function getMeetingById(
  id: number
): Promise<SacramentMeeting | null> {
  const rows = await sql`
    SELECT *, date::text AS date_text
    FROM meetings
    WHERE id = ${id}
  `;

  return rows.length ? mapMeeting(rows[0]) : null;
}

export async function createMeeting(
  meeting: SacramentMeeting
): Promise<number> {
  const rows = await sql`
    INSERT INTO meetings (
      date, meeting_type, presiding, conducting, announcements,
      opening_hymn, opening_prayer, ward_business, stake_business,
      sacrament_hymn, speakers, closing_hymn, closing_prayer
    )
    VALUES (
      ${meeting.date},
      ${meeting.meetingType},
      ${meeting.presiding},
      ${meeting.conducting},
      ARRAY(
        SELECT jsonb_array_elements_text(
          ${JSON.stringify(meeting.announcements ?? [])}::jsonb
        )
      ),
      ${JSON.stringify(meeting.openingHymn)}::jsonb,
      ${meeting.openingPrayer},
      ${JSON.stringify(meeting.wardBusiness)}::jsonb,
      ${meeting.stakeBusiness},
      ${JSON.stringify(meeting.sacramentHymn)}::jsonb,
      ${JSON.stringify(meeting.speakers)}::jsonb,
      ${JSON.stringify(meeting.closingHymn)}::jsonb,
      ${meeting.closingPrayer}
    )
    RETURNING id
  `;

  return Number(rows[0].id);
}

export async function updateMeeting(
  id: number,
  meeting: SacramentMeeting
): Promise<boolean> {
  const rows = await sql`
    UPDATE meetings SET
      date = ${meeting.date},
      meeting_type = ${meeting.meetingType},
      presiding = ${meeting.presiding},
      conducting = ${meeting.conducting},
      announcements = ARRAY(
        SELECT jsonb_array_elements_text(
          ${JSON.stringify(meeting.announcements ?? [])}::jsonb
        )
      ),
      opening_hymn = ${JSON.stringify(meeting.openingHymn)}::jsonb,
      opening_prayer = ${meeting.openingPrayer},
      ward_business = ${JSON.stringify(meeting.wardBusiness)}::jsonb,
      stake_business = ${meeting.stakeBusiness},
      sacrament_hymn = ${JSON.stringify(meeting.sacramentHymn)}::jsonb,
      speakers = ${JSON.stringify(meeting.speakers)}::jsonb,
      closing_hymn = ${JSON.stringify(meeting.closingHymn)}::jsonb,
      closing_prayer = ${meeting.closingPrayer}
    WHERE id = ${id}
    RETURNING id
  `;

  return rows.length > 0;
}

export async function deleteMeeting(id: number): Promise<boolean> {
  const rows = await sql`
    DELETE FROM meetings
    WHERE id = ${id}
    RETURNING id
  `;

  return rows.length > 0;
}
