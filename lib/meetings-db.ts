import { neon } from "@neondatabase/serverless";
import type { SacramentMeeting } from "./types";

const sql = neon(process.env.DATABASE_URL!);
const PAGE_SIZE = 5;

function mapMeeting(row: any): SacramentMeeting {
  return {
    id: row.id,
    date: row.date_text,
    meetingType: row.meeting_type,
    presiding: row.presiding,
    conducting: row.conducting,
    announcements: row.announcements ?? [],
    openingHymn: row.opening_hymn,
    openingPrayer: row.opening_prayer,
    wardBusiness: row.ward_business ?? [],
    stakeBusiness: row.stake_business,
    sacramentHymn: row.sacrament_hymn,
    speakers: row.speakers ?? [],
    closingHymn: row.closing_hymn,
    closingPrayer: row.closing_prayer,
  };
}

export async function getMeetings(query = "", page = 1): Promise<SacramentMeeting[]> {
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

export async function getMeetingsTotalPages(query = ""): Promise<number> {
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

export async function getMeetingsByDate(date: string): Promise<SacramentMeeting[]> {
  const rows = await sql`SELECT *, date::text AS date_text FROM meetings WHERE date = ${date} ORDER BY date`;
  return rows.map(mapMeeting);
}

export async function getMeetingById(id: number): Promise<SacramentMeeting | null> {
  const rows = await sql`SELECT *, date::text AS date_text FROM meetings WHERE id = ${id}`;
  return rows.length ? mapMeeting(rows[0]) : null;
}

export async function createMeeting(_meeting: SacramentMeeting): Promise<void> {
  throw new Error("Creating meetings will be available in Week 04.");
}

export async function updateMeeting(_id: number, _meeting: SacramentMeeting): Promise<void> {
  throw new Error("Updating meetings will be available in Week 04.");
}

export async function deleteMeeting(_id: number): Promise<void> {
  throw new Error("Deleting meetings will be available in Week 04.");
}
