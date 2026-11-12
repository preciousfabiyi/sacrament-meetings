
import type { SacramentMeeting } from "./types";

const meetings: SacramentMeeting[] = [
  {
    id: 1,
    date: "2026-05-03",
    meetingType: "regular",
    presiding: "Bishop Smith",
    conducting: "Brother Jones",
    announcements: ["Ward temple visit on May 10"],
    openingHymn: { number: 2, title: "The Spirit of God" },
    openingPrayer: "Sister Williams",
    wardBusiness: [
      { description: "Sustaining of new Primary president" },
    ],
    stakeBusiness: false,
    sacramentHymn: {
      number: 169,
      title: "As Now We Take the Sacrament",
    },
    speakers: [
      {
        name: "Sister Brown",
        topic: "Faith in Jesus Christ",
        type: "speaker",
      },
      {
        name: "Youth Choir",
        topic: "I Am a Child of God",
        type: "musical-number",
      },
    ],
    closingHymn: { number: 31, title: "O God, Our Help in Ages Past" },
    closingPrayer: "Brother Davis",
  },
  {
    id: 2,
    date: "2026-05-10",
    meetingType: "testimony",
    presiding: "Bishop Smith",
    conducting: "Brother Jones",
    announcements: ["Mother's Day celebration after church"],
    openingHymn: { number: 19, title: "We Thank Thee, O God, for a Prophet" },
    openingPrayer: "Sister Adams",
    wardBusiness: [],
    stakeBusiness: false,
    sacramentHymn: { number: 193, title: "I Stand All Amazed" },
    speakers: [
      {
        name: "Ward Members",
        topic: "Personal testimonies",
        type: "speaker",
      },
    ],
    closingHymn: { number: 85, title: "How Firm a Foundation" },
    closingPrayer: "Brother James",
  },
  {
    id: 3,
    date: "2026-05-17",
    meetingType: "regular",
    presiding: "Bishop Smith",
    conducting: "Brother White",
    announcements: ["Youth activity on Friday"],
    openingHymn: { number: 3, title: "Now Let Us Rejoice" },
    openingPrayer: "Brother Green",
    wardBusiness: [
      { description: "Ward conference announcement" },
    ],
    stakeBusiness: true,
    sacramentHymn: { number: 181, title: "Jesus of Nazareth, Savior and King" },
    speakers: [
      {
        name: "Elder Johnson",
        topic: "Serving Others",
        type: "speaker",
      },
      {
        name: "Sister Miller",
        topic: "Prayer",
        type: "speaker",
      },
    ],
    closingHymn: { number: 96, title: "Dearest Children, God Is Near You" },
    closingPrayer: "Sister Clark",
  },
  {
    id: 4,
    date: "2026-05-24",
    meetingType: "stake",
    presiding: "Stake President Brown",
    conducting: "Brother White",
    announcements: ["Stake leadership meeting at 2 PM"],
    openingHymn: { number: 27, title: "Praise to the Man" },
    openingPrayer: "Brother Thomas",
    wardBusiness: [],
    stakeBusiness: true,
    sacramentHymn: { number: 172, title: "In Humility, Our Savior" },
    speakers: [
      {
        name: "Stake President Brown",
        topic: "Strengthening Families",
        type: "speaker",
      },
    ],
    closingHymn: { number: 134, title: "I Believe in Christ" },
    closingPrayer: "Sister Thomas",
  },
   {
    id: 5,
    date: "2026-05-31",
    meetingType: "general",
    presiding: "Stake President Brown",
    conducting: "Brother White",
    announcements: ["General stake gathering"],
    openingHymn: { number: 1, title: "The Morning Breaks" },
    openingPrayer: "Sister Adams",
    wardBusiness: [],
    stakeBusiness: true,
    sacramentHymn: { number: 175, title: "O God, the Eternal Father" },
    speakers: [
      {
        name: "Elder Anderson",
        topic: "Following Jesus Christ",
        type: "speaker",
      },
    ],
    closingHymn: { number: 30, title: "Come, Come, Ye Saints" },
    closingPrayer: "Brother Williams",
  },
  {
    id: 6,
    date: "2026-11-08",
    meetingType: "regular",
    presiding: "Bishop Johnson",
    conducting: "Brother Williams",
    announcements: ["Ward activities and upcoming events"],
    openingHymn: { number: 2, title: "The Spirit of God" },
    openingPrayer: "Sister Adams",
    wardBusiness: [
      { description: "Ward announcements and activities" },
    ],
    stakeBusiness: false,
    sacramentHymn: { number: 175, title: "O God, the Eternal Father" },
    speakers: [
      {
        name: "Brother Anderson",
        topic: "Following Jesus Christ",
        type: "speaker",
      },
      {
        name: "Sister Williams",
        topic: "Serving One Another",
        type: "speaker",
      },
    ],
    closingHymn: { number: 30, title: "Come, Come, Ye Saints" },
    closingPrayer: "Brother Brown",
  },
];
export function getMeetings(date?: string | null): SacramentMeeting[] {
  if (date) {
    return meetings.filter((meeting) => meeting.date === date);
  }

  return meetings;
}

export function getMeetingById(id: number): SacramentMeeting | null {
  return meetings.find((meeting) => meeting.id === id) ?? null;
}
